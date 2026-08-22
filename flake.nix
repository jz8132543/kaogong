{
  description = "考公平台 (Kaogong Platform) - Nix Flake & Module";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }: 
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22
            pnpm
            typescript
            typescript-language-server
            postgresql
          ];
          shellHook = ''
            echo "🔥 欢迎来到考公平台开发环境！"
            echo "Node.js 版本: $(node -v)"
            echo "pnpm 版本: $(pnpm -v)"
          '';
        };
      }
    ) // {
      nixosModules.default = import ./nix/module.nix self;
    };
}
