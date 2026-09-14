import { day1, day2, sessionLabels, type SessionType } from "@/data/program";
import styles from "./preview.module.css";

// Ara ve yemek tek satirlik soluk satira iner; icerik oturumlari tam satir alir.
const MUTED: SessionType[] = ["registration", "break", "lunch"];

const days = [
  {
    name: "1. Gün",
    date: "22 Ekim 2026 · Perşembe",
    theme: "Strateji & Endüstri",
    sessions: day1,
  },
  {
    name: "2. Gün",
    date: "23 Ekim 2026 · Cuma",
    theme: "Teknoloji, Ekonomi & Uygulama",
    sessions: day2,
  },
];

/** "Ad | Kurum" biçimindeki dizeden yalnızca adı alır. */
const justName = (value: string) => value.split("|")[0].trim();

export default function TrialProgram() {
  return (
    <section id="program" className={styles.program}>
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Etkinlik takvimi</p>
            <h2 className={styles.sectionTitle}>
              İki günün<br />tam akışı.
            </h2>
          </div>
          <a href="/program" className={styles.textLink}>
            Tam programı incele <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className={styles.programGrid}>
          {days.map((day) => (
            <div key={day.name} className={styles.programDay}>
              <div className={styles.programDayHead}>
                <p className={styles.programDayName}>{day.name}</p>
                <p className={styles.programDayTheme}>{day.theme}</p>
                <p className={styles.programDayDate}>{day.date}</p>
              </div>

              <ol className={styles.programList}>
                {day.sessions.map((session, index) => {
                  const muted = MUTED.includes(session.type);
                  const speakerCount = session.speakers?.length ?? 0;

                  return (
                    <li
                      key={`${session.time}-${index}`}
                      className={muted ? styles.programRowMuted : styles.programRow}
                    >
                      <p className={styles.programTime}>{session.time}</p>
                      <div className={styles.programBody}>
                        <p className={styles.programTitle}>{session.title}</p>
                        {!muted && (
                          <p className={styles.programMeta}>
                            <span className={styles.programType}>
                              {sessionLabels[session.type]}
                            </span>
                            {session.moderator && (
                              <span>Moderatör: {justName(session.moderator)}</span>
                            )}
                            {speakerCount > 0 && <span>{speakerCount} konuşmacı</span>}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
