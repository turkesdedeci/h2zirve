import type { Metadata } from "next";
import { Manrope } from "next/font/google";
const display = Manrope({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600", "700"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: "Ana Sayfa Tasarım Denemesi",
  robots: { index: false, follow: false },
};

export default function TrialLayout({ children }: { children: React.ReactNode }) {
  return <div className={display.variable}>{children}</div>;
}
