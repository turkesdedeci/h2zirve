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
  title: "Bireysel Kayıt",
  description:
    "Türkiye Hidrojen Zirvesi 2026 için ücretsiz katılımcı kaydı — 22–23 Ekim 2026, AYBÜ Etlik Kongre Salonu, Ankara.",
  alternates: { canonical: "/kayit" },
  robots: { index: false, follow: true },
};

// Zirve bitti: form kodu page.tsx içinde duruyor, yeniden açmak için {children} döndürmek yeterli.
export default function KayitLayout() {
  return <div className={display.variable}><BasvuruKapali title="Kayıtlar kapandı" /></div>;
}
