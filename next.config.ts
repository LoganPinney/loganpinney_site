import type { NextConfig } from "next";

const depthsPath = "/lab/_vault/depths-a7-9f3c2";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
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
