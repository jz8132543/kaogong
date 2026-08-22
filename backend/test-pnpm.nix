let
  pkgs = import <nixpkgs> {};
in pkgs.stdenv.mkDerivation {
  name = "test";
  src = ./.;
  buildInputs = [ pkgs.pnpm_9 ];
}
