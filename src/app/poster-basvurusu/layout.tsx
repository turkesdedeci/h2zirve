import type { Metadata } from "next";
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
};

export default function PosterBasvurusuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={display.variable}>{children}</div>;
}
