import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/tasarim-deneme", destination: "/", permanent: true },
      { source: "/tasarim-deneme/konusmacilar", destination: "/konusmacilar", permanent: true },
    ];
  },
};

export default nextConfig;
