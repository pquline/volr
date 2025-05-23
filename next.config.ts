import type { NextConfig } from "next";
import withPWA from 'next-pwa';

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

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  maximumFileSizeToCacheInBytes: 4 * 1024 * 1024 // 4MB
})(nextConfig);
