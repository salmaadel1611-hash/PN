import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' }
    ]
  },
  experimental: {
    staleTimes: {
      dynamic: 30
    }
  }
};

export default nextConfig;
