import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint errors during production build
  },
};

export default nextConfig;
