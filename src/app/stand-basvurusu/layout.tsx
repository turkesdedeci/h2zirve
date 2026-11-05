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
  title: "Stand Başvurusu",
  description:
    "Türkiye Hidrojen Zirvesi 2026 fuar alanında yer almak için stand başvurusu yapın. Startup başvuruları ücretsiz değerlendirilir.",
  alternates: { canonical: "/stand-basvurusu" },
  robots: { index: false, follow: true },
};

// Zirve bitti: form kodu page.tsx içinde duruyor, yeniden açmak için {children} döndürmek yeterli.
export default function StandBasvurusuLayout() {
  return <div className={display.variable}><BasvuruKapali title="Stand başvuruları kapandı" /></div>;
}
