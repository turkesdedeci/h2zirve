import type { NextConfig } from "next";
import posterPdfLinks from "./src/data/poster-pdf-links.json";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/tasarim-deneme", destination: "/", permanent: true },
      { source: "/tasarim-deneme/konusmacilar", destination: "/konusmacilar", permanent: true },
      // Basılı posterlerdeki karekodlar: /p/P05 -> posterin A2 PDF'i (geçici yönlendirme, dosya değişince güncellenir)
      ...Object.entries(posterPdfLinks).map(([no, url]) => ({ source: `/p/${no}`, destination: url, permanent: false })),
    ];
  },
};

export default nextConfig;
