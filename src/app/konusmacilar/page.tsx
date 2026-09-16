import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import PreviewHeader from "@/components/home/PreviewHeader";
import TrialFooter from "@/components/home/TrialFooter";
import TrialSpeakerDirectory from "@/components/home/TrialSpeakerDirectory";
import styles from "@/components/home/preview.module.css";

const display = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Konuşmacılar",
  description:
    "Türkiye Hidrojen Zirvesi 2026 konuşmacıları: keynote konuşmacılar, panel moderatörleri ve oturum konuşmacıları.",
  alternates: { canonical: "/konusmacilar" },
};

export default function SpeakersPage() {
  return (
    <div className={`${styles.page} ${display.variable}`}>
      <PreviewHeader />
      <main id="main-content">
        <TrialSpeakerDirectory />
      </main>
      <TrialFooter />
    </div>
  );
}
