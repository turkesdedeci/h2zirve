import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import PreviewHeader from "@/components/home/PreviewHeader";
import ProgramFull from "@/components/home/ProgramFull";
import TrialFooter from "@/components/home/TrialFooter";
import styles from "@/components/home/preview.module.css";

const display = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zirve Programı",
  description:
    "Türkiye Hidrojen Zirvesi 2026 iki günlük programı, keynote konuşmaları, paneller ve teknik oturumlar.",
  alternates: { canonical: "/program" },
};

export default function ProgramPage() {
  return (
    <div className={`${styles.page} ${display.variable}`}>
      <PreviewHeader />
      <main id="main-content">
        <ProgramFull />
      </main>
      <TrialFooter />
    </div>
  );
}
