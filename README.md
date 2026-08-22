# 考公平台 (Kaogong Platform)

考公平台是一个致力于为公考候选人提供多模态题库解析、名师指导体系与打卡契约群体系的全栈应用。
本项目架构支持**独立运行**，也原生支持**作为 NixOS 模块导入并在集群中一键拉起**。

## 🛠️ 技术栈
- **前端 (Frontend)**: Taro + React + TypeScript（一套代码支持微信小程序与 H5）
- **后端 (Backend)**: NestJS + TypeORM + TypeScript
- **数据库 (Database)**: PostgreSQL (重度依赖 `JSONB` 字段实现多模态与不规则图文存储)
- **文件存储 (Storage)**: Local File System + Nginx (方案A：自建物理静态挂载)
- **部署环境 (Deployment)**: NixOS Flake & Module

---

## 🚀 方式一：独立开发者运行 (Standalone)

如果你是开发者，需要在本地运行此项目：

### 1. 进入开发环境
本项目提供了 `flake.nix`。只要你安装了 Nix，即可在根目录运行：
```bash
nix develop
```
这会为你自动拉取带有正确版本 `Node.js`、`pnpm` 和 `PostgreSQL` 的纯净开发环境。

### 2. 启动数据库
确保你本地运行了一个 PostgreSQL 实例，并创建名为 `kaogong` 的数据库。

### 3. 运行后端 (NestJS)
```bash
cd backend
pnpm install
pnpm run start:dev
```

### 4. 运行前端 (Taro)
```bash
cd frontend
pnpm install
pnpm run dev:h5
```

---

## 🌍 方式二：作为 NixOS 模块导入 (NixOS Module)

如果你是运维人员，需要将这个系统部署到生产服务器。本仓库导出了标准的 `nixosModules.default`。

### 1. 在服务器的 `flake.nix` 中引入 inputs
```nix
{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    kaogong.url = "github:YourOrg/kaogong"; # 替换为本仓库真实地址
  };

  outputs = { self, nixpkgs, kaogong, ... }: {
    nixosConfigurations.myServer = nixpkgs.lib.nixosSystem {
      system = "x86_64-linux";
      modules = [
        ./configuration.nix
        kaogong.nixosModules.default  # 引入考公模块
      ];
    };
  };
}
```

### 2. 在你的 `configuration.nix` 中一键激活
```nix
{ config, pkgs, ... }:
{
  services.kaogong = {
    enable = true;
    port = 3000;
    frontendDomain = "kaogong.yourdomain.com";
    uploadDir = "/var/lib/kaogong/uploads"; # 方案A对应的本地图库目录
  };
}
```
**一旦启用，系统将自动为你：**
1. 启动并配置 PostgreSQL。
2. 配置 Systemd 后台保活 NestJS API。
3. 配置 Nginx 自动挂载静态图片目录 `/uploads/` 和前端 H5 产物，并完成反向代理。
