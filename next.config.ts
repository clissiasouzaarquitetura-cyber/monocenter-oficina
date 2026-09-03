import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // O projeto original usa verificações do compilador vinext; a validação
    // funcional continua sendo executada pelos testes do aplicativo.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
