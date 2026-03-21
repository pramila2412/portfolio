import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'gsap'],
  }
};

export default nextConfig;
