import {
  speakers,
  speakerGroupDefinitions,
  sortSpeakers,
} from "@/data/speakers";
import SpeakerCard from "./SpeakerCard";
import styles from "./preview.module.css";

// Gruplama ve siralama Speakers.tsx ile birebir ayni: mantik kopyalanmadi,
// ayni yardimcilar src/data/speakers.ts uzerinden paylasiliyor.
//
// Keynote grubu burada eklenir: speakerGroupDefinitions yalnizca acilis ve
// panelleri kapsiyor, dolayisiyla "Keynote Konusmaci - 1. Gun" rolu hicbir
// gruba dusmuyordu. Speakers.tsx bu ikisini ayri bir one cikan blokta
// gosteriyor; dizinde karsiligi bu grup.
const keynoteGroup = {
  id: "keynote",
  title: "Keynote konuşmacıları",
  role: "Keynote",
  preferredOrder: undefined as string[] | undefined,
};

const groups = [keynoteGroup, ...speakerGroupDefinitions].map((group) => ({
  ...group,
  speakers: speakers
    .filter((speaker) => speaker.role.includes(group.role))
    .sort(sortSpeakers(group.role, group.preferredOrder)),
}));

const pendingCount = speakers.filter((speaker) => speaker.name === "TBA").length;

export default function TrialSpeakerDirectory() {
  return (
    <>
      <section className={styles.directoryIntro}>
        <div className={styles.container}>
          <a href="/#speakers" className={styles.textLink}>
            <span aria-hidden="true">←</span> Deneme ana sayfasına dön
          </a>
          <p className={`${styles.eyebrow} ${styles.directoryEyebrow}`}>Tüm konuşmacılar</p>
          <h1 className={styles.sectionTitle}>
            Zirvede söz alan<br />isimler.
          </h1>
          <p className={styles.directoryLead}>
            {speakers.length} konuşmacı, açılış oturumu ve beş panel başlığı altında.
            {pendingCount > 0 && ` ${pendingCount} isim teyit sürecinde.`}
          </p>
        </div>
      </section>

      {groups.map((group, groupIndex) => (
        <section
          key={group.id}
          aria-labelledby={`${group.id}-title`}
          className={styles.directoryGroup}
        >
          <div className={styles.container}>
            <div className={styles.directoryGroupHead}>
              <span className={styles.directoryIndex}>
                {String(groupIndex + 1).padStart(2, "0")}
              </span>
              <h2 id={`${group.id}-title`} className={styles.directoryGroupTitle}>
                {group.title}
              </h2>
              <span className={styles.directoryCount}>
                {group.speakers.length} konuşmacı
              </span>
            </div>

            <div className={styles.speakerGrid}>
              {group.speakers.map((speaker, index) =>
                speaker.name === "TBA" ? (
                  // Insan olmadigi gozle belli olsun diye kesikli cerceve.
                  <div key={`${group.id}-tba-${index}`} className={styles.pendingCard}>
                    <div className={styles.pendingBox}>
                      <span>Açıklanacak</span>
                    </div>
                    <p className={styles.pendingLabel}>
                      {speaker.affiliation ?? group.title.split(":")[0]}
                    </p>
                  </div>
                ) : (
                  <SpeakerCard
                    key={`${speaker.name}-${speaker.affiliation ?? index}`}
                    speaker={speaker}
                    tagOverride={group.id === "opening" ? "Açılış" : undefined}
                  />
                )
              )}
            </div>
          </div>
        </section>
      ))}

      <p className={styles.directoryNote}>
        Konuşmacı listesi program teyitleriyle birlikte güncellenmektedir.
      </p>
    </>
  );
}
