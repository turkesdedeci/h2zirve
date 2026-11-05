import type { Metadata } from "next";
import BasvuruKapali from "@/components/home/BasvuruKapali";
import { Manrope } from "next/font/google";

const display = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Poster Özeti Başvurusu",
  description:
    "Türkiye Hidrojen Zirvesi 2026 poster çağrısı — genişletilmiş özetinizi 22 Eylül 2026 tarihine kadar yükleyin.",
  alternates: { canonical: "/poster-basvurusu" },
  robots: { index: false, follow: true },
};

// Zirve bitti: form kodu page.tsx içinde duruyor, yeniden açmak için {children} döndürmek yeterli.
export default function PosterBasvurusuLayout() {
  return <div className={display.variable}><BasvuruKapali title="Poster başvuruları kapandı" /></div>;
}
