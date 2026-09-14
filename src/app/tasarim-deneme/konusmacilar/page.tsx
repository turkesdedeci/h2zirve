import type { Metadata } from "next";
import PreviewHeader from "../PreviewHeader";
import TrialFooter from "../TrialFooter";
import TrialSpeakerDirectory from "../TrialSpeakerDirectory";
import styles from "../preview.module.css";

// robots: { index: false, follow: false } ust layout'tan miras gelir.
export const metadata: Metadata = {
  title: "Konuşmacılar — Tasarım Denemesi",
};

export default function TrialSpeakersPage() {
  return (
    <div className={styles.page}>
      <PreviewHeader />
      <main id="main-content">
        <TrialSpeakerDirectory />
      </main>
      <TrialFooter />
    </div>
  );
}
