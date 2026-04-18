import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Türkiye Hidrojen Zirvesi 2026 | 15–16 Ekim · Ankara",
  description:
    "Türkiye Hidrojen Zirvesi 2026 — 15–16 Ekim 2026, Ankara. Türkiye'de Hidrojen Ekosisteminin İnşası: Teknoloji, Strateji ve Uygulama. TESPAM & AYBÜ Hidrojen Araştırma Merkezi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.className}>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
