import type { NextConfig } from "next";

const basePath = "/gemapp";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: `${basePath}/`,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
