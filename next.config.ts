import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/gemapp",
  assetPrefix: "/gemapp/",
};

export default nextConfig;
