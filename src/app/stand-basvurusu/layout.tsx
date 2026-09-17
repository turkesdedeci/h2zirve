import type { Metadata } from "next";
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
};

export default function StandBasvurusuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={display.variable}>{children}</div>;
}
