/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    imageSizes: [96, 192, 384], // For avatars/cards/thumbnails
    deviceSizes: [640, 1080, 1920], // For hero/full-width images
  },
  experimental: {
    optimizePackageImports: ["@tabler/icons-react", "date-fns", "lucide-react"],
  },
  compiler: {
    removeConsole: true,
  },
};

export default nextConfig;
