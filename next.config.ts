import type { NextConfig } from "next";
import withPWA from 'next-pwa';

const nextConfig: NextConfig = {
  output: 'standalone',
  // Enable type checking during build
  typescript: {
    ignoreBuildErrors: false,
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
  disable: process.env.NODE_ENV === 'development'
})(nextConfig);
