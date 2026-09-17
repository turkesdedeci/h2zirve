import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import CallForPapersFull from "@/components/home/CallForPapersFull";
import PreviewHeader from "@/components/home/PreviewHeader";
import TrialFooter from "@/components/home/TrialFooter";
import styles from "@/components/home/preview.module.css";

const display = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Poster Çağrısı",
  description:
    "Türkiye Hidrojen Zirvesi 2026 poster çağrısı; kapsam, önemli tarihler, ödüller, yayın imkânı ve başvuru bilgileri.",
  alternates: { canonical: "/poster-cagrisi" },
};

export default function PosterCagrisiPage() {
  return (
    <div className={`${styles.page} ${display.variable}`}>
      <PreviewHeader />
      <main id="main-content">
        <CallForPapersFull />
      </main>
      <TrialFooter />
    </div>
  );
}
