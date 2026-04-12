import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TESPAM-H2-2026 | 4. Uluslararası Hidrojen Kongresi",
  description:
    "TESPAM 4. Uluslararası Hidrojen Kongresi ve Strateji Forumu — 15–16 Ekim 2026, Ankara. Türkiye'de Hidrojen Ekosisteminin İnşası: Teknoloji, Strateji ve Uygulama.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
