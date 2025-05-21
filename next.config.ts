import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Exclude scripts directory from Next.js build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Remove deprecated config
  // devIndicators: {
  //   appIsrStatus: false,
  // },
};

export default nextConfig;
