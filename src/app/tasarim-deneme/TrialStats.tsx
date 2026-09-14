import { day1, day2 } from "@/data/program";
import { speakers } from "@/data/speakers";
import styles from "./preview.module.css";

// Rakamlar veriden turetilir; program veya konusmaci listesi degisince
// kendiliginden guncellenir. Katilimci/ulke/kurum sayisi UYDURULMAZ.
const allSessions = [...day1, ...day2];

const panelCount = new Set(
  allSessions
    .filter((session) => session.type === "panel")
    .map((session) => session.title.match(/Panel \d/)?.[0])
    .filter(Boolean)
).size;

const keynoteCount = allSessions.filter((session) => session.type === "keynote").length;
const pendingCount = speakers.filter((speaker) => speaker.name === "TBA").length;

const stats = [
  { value: "2", label: "Gün", note: "22–23 Ekim 2026" },
  { value: String(panelCount), label: "Panel", note: "Strateji, savunma, üretim, sanayi, ekonomi" },
  {
    value: String(keynoteCount),
    label: "Keynote",
    note: "Prof. Dr. İbrahim Dinçer · Dr. Ayfer Veziroğlu",
  },
  {
    value: String(speakers.length),
    label: "Konuşmacı",
    note: `${pendingCount} isim teyit sürecinde`,
  },
];

export default function TrialStats() {
  return (
    <section className={styles.stats} aria-label="Zirve rakamlarla">
      <div className={`${styles.container} ${styles.statsGrid}`}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <p className={styles.statValue}>{stat.value}</p>
            <p className={styles.statLabel}>{stat.label}</p>
            <p className={styles.statNote}>{stat.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
