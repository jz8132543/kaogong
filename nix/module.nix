flake:
{ config, lib, pkgs, ... }:

with lib;

let
  cfg = config.services.kaogong;
in
{
  options.services.kaogong = {
    enable = mkEnableOption "Kaogong Platform Service";

    port = mkOption {
      type = types.port;
      default = 3000;
      description = "Port for the NestJS backend API.";
    };

    frontendDomain = mkOption {
      type = types.str;
      default = "localhost";
      description = "Domain name for the Taro frontend.";
    };
    
    uploadDir = mkOption {
      type = types.path;
      default = "/var/lib/kaogong/uploads";
      description = "Local path to store user uploads and images (Option A Storage).";
    };

    adminPasswordFile = mkOption {
      type = types.nullOr types.path;
      default = null;
      description = "Path to a file containing the admin password.";
    };
  };

  config = mkIf cfg.enable {
    # 1. 确保上传目录存在
    systemd.tmpfiles.rules = [
      "d ${cfg.uploadDir} 0755 root root -"
      "d /opt/kaogong 0755 root root -"
    ];

    # 2. 启动 PostgreSQL 数据库
    services.postgresql = {
      enable = true;
      ensureDatabases = [ "kaogong" ];
      ensureUsers = [{
        name = "kaogong";
        ensureDBOwnership = true;
      }];
    };

    # 3. 本地编译与资源同步
    systemd.services.kaogong-build = {
      description = "Kaogong Local Build Service";
      wantedBy = [ "multi-user.target" ];
      before = [ "kaogong-backend.service" "nginx.service" ];
      path = with pkgs; [ nodejs_22 pnpm git bash coreutils ];
      script = ''
        set -e
        # Copy source to /opt/kaogong
        if [ ! -d /opt/kaogong/backend ]; then
          cp -rT ${flake.outPath} /opt/kaogong
          chmod -R +w /opt/kaogong
        else
          # RSYNC to keep it updated if the flake changes
          ${pkgs.rsync}/bin/rsync -a --delete --exclude 'node_modules' --exclude 'dist' --exclude '.pnpm-store' ${flake.outPath}/ /opt/kaogong/
          chmod -R +w /opt/kaogong
        fi

        cd /opt/kaogong

        # Build backend
        cd backend
        rm -rf node_modules
        pnpm install --frozen-lockfile
        npm run build

        # Build admin
        cd ../admin
        rm -rf node_modules
        pnpm install --frozen-lockfile
        npm run build

        # Build frontend
        cd ../frontend
        rm -rf node_modules
        pnpm install --frozen-lockfile
        npm run build:h5
      '';
      serviceConfig = {
        Type = "oneshot";
        RemainAfterExit = true;
      };
    };

    # 4. 运行后台 API 服务 (NestJS)
    systemd.services.kaogong-backend = {
      description = "Kaogong NestJS Backend Service";
      after = [ "network.target" "postgresql.service" "kaogong-build.service" ];
      requires = [ "kaogong-build.service" ];
      wantedBy = [ "multi-user.target" ];
      
      serviceConfig = {
        ExecStart = "${pkgs.nodejs_22}/bin/node /opt/kaogong/backend/dist/main.js";
        Environment = [
          "PORT=${toString cfg.port}"
          "DB_HOST=127.0.0.1"
          "DB_PORT=5432"
          "DB_USER=kaogong"
          "DB_NAME=kaogong"
          "UPLOAD_DIR=${cfg.uploadDir}"
          "ADMIN_USERNAME=i"
        ];
        EnvironmentFile = lib.optional (cfg.adminPasswordFile != null) cfg.adminPasswordFile;
        Restart = "always";
        User = "root"; # 建议在生产环境更改为非特权用户
      };
    };

    # 5. 配置 Nginx 服务静态资源及代理
    services.nginx = {
      enable = true;
      virtualHosts."${cfg.frontendDomain}" = {
        # 挂载 Taro 编译出的静态文件 (位于 frontend/dist)
        root = "/opt/kaogong/frontend/dist";
        
        locations."/" = {
          tryFiles = "$uri $uri/ /index.html";
        };

        # 后台管理界面的挂载
        locations."/admin/" = {
          alias = "/opt/kaogong/admin/dist/";
          tryFiles = "$uri $uri/ /index.html";
        };

        # 挂载本地文件存储
        locations."/uploads/" = {
          alias = "${cfg.uploadDir}/";
          extraConfig = ''
            expires 30d;
            add_header Cache-Control "public";
          '';
        };

        # 反向代理到 NestJS 后端 API
        locations."/api/" = {
          proxyPass = "http://127.0.0.1:${toString cfg.port}/";
          proxyWebsockets = true;
        };
      };
    };
  };
}
