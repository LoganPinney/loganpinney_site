import type { NextConfig } from "next";

const depthsPath = "/lab/_vault/depths-a7-9f3c2";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        // Next redirects tolerate trailing slashes by default; keep this exact.
        source: `${depthsPath}((?!/))`,
        destination: `${depthsPath}/`,
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: `${depthsPath}/`,
        destination: `${depthsPath}/index.html`,
      },
    ];
  },
};

export default nextConfig;
