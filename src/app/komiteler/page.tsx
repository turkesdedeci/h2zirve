import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import PreviewHeader from "@/components/home/PreviewHeader";
import TrialFooter from "@/components/home/TrialFooter";
import styles from "@/components/home/preview.module.css";
import { komiteler } from "@/data/komiteler";
import k from "./komiteler.module.css";

const display = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Komiteler",
  description:
    "Türkiye Hidrojen Zirvesi 2026 organizasyon komitesi ile bilimsel ve endüstriyel poster değerlendirme komitesi üyeleri.",
  alternates: { canonical: "/komiteler" },
};

export default function KomitelerPage() {
  return (
    <div className={`${styles.page} ${display.variable}`}>
      <PreviewHeader />
      <main id="main-content" className={k.wrap}>
        <p className={k.eyebrow}>Türkiye Hidrojen Zirvesi 2026</p>
        <h1 className={k.title}>Komiteler</h1>
        <p className={k.lead}>
          Zirvenin düzenlenmesinde ve poster çalışmalarının değerlendirilmesinde görev alan komite üyeleri.
        </p>
        {komiteler.map((komite) => (
          <section key={komite.title} className={k.group} aria-labelledby={`k-${komite.title}`}>
            <h2 id={`k-${komite.title}`}>{komite.title}</h2>
            <table className={k.table}>
              <thead>
                <tr>
                  <th scope="col" className={k.num}>No</th>
                  <th scope="col">Ad Soyad</th>
                  <th scope="col">Kurum</th>
                </tr>
              </thead>
              <tbody>
                {komite.members.map((m, i) => (
                  <tr key={`${m.name}-${i}`}>
                    <td className={k.num}>{i + 1}</td>
                    <td>{m.name}</td>
                    <td>{m.org}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
      </main>
      <TrialFooter />
    </div>
  );
}
