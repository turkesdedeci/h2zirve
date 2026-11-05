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
  title: "Sponsorluk Başvurusu",
  description:
    "Türkiye Hidrojen Zirvesi 2026 sponsorluk başvurusu — sponsor tipi, bütçe aralığı ve görünürlük beklentinizi paylaşın.",
  alternates: { canonical: "/sponsorluk-basvurusu" },
  robots: { index: false, follow: true },
};

// Zirve bitti: form kodu page.tsx içinde duruyor, yeniden açmak için {children} döndürmek yeterli.
export default function SponsorlukBasvurusuLayout() {
  return <div className={display.variable}><BasvuruKapali title="Sponsorluk başvuruları kapandı" /></div>;
}
