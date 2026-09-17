import type { Metadata } from "next";
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
};

export default function SponsorlukBasvurusuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={display.variable}>{children}</div>;
}
