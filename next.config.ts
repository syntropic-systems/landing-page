import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  distDir: 'dist',
  // Allow any device on the local WiFi subnet to hit the dev server (e.g. testing
  // on your phone). Wildcard covers whatever last-octet IP DHCP assigns your laptop,
  // so this never needs updating. Adjust the subnet if your router uses 192.168.0.x / 10.0.0.x.
  allowedDevOrigins: ['192.168.1.*'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
};

export default nextConfig;
