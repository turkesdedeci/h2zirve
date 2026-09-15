import Image from "next/image";
import TrialSponsors from "./TrialSponsors";
import TrialContact from "./TrialContact";
import { type Speaker, speakers } from "@/data/speakers";
import SpeakerMarquee from "./SpeakerMarquee";
import TrialHero from "./TrialHero";
import KeynoteSpotlight from "./KeynoteSpotlight";
import TrialProgram from "./TrialProgram";
import TrialParticipation from "./TrialParticipation";
import TrialFooter from "./TrialFooter";
import TrialVenue from "./TrialVenue";
import PreviewHeader from "./PreviewHeader";
import styles from "./preview.module.css";

/** Once keynote'lar, sonra moderatorler, sonra kaynak sirasi. sort kararli. */
const speakerRank = (speaker: Speaker) => {
  if (speaker.role.includes("Keynote")) return 0;
  if (speaker.role.includes("Moderatörü")) return 1;
  return 2;
};

// Seride yalnizca fotografli isimler girer: gradyan uzerine "TBA" bas harfleri
// parlak bir seritte yuklenmemis gorsel gibi okunur. TBA'lar dizin sayfasinda.
const marqueeSpeakers = speakers
  .filter((speaker) => speaker.photo)
  .sort((a, b) => speakerRank(a) - speakerRank(b));

const pendingCount = speakers.filter((speaker) => speaker.name === "TBA").length;

const organizers = [
  { name: "AYBÜ", role: "Ev sahipliği ve liderliği", logo: "/logos/aybu.png" },
  { name: "H2TEAM", role: "Koordinasyon", logo: "/logos/h2team.png" },
  { name: "TESPAM", role: "İş birliği", logo: "/logos/tespam.png" },
];

const questions = [
  { question: "Zirveye katılım ücretli mi?", answer: "Katılımcı kaydı ücretsizdir. Katılım için kayıt formunu doldurarak ön kayıt oluşturmanız gerekir." },
  { question: "Tek gün katılabilir miyim?", answer: "Kayıt formunda 22 Ekim, 23 Ekim veya her iki gün seçeneğini işaretleyebilirsiniz." },
  { question: "Poster sunumu için ayrıca başvuru gerekiyor mu?", answer: "Evet. Poster özeti başvurusu katılımcı kaydından ayrıdır. Başvuru takvimi, şablon ve değerlendirme bilgileri Poster Çağrısı sayfasında yer alır." },
  { question: "Firmamla nasıl yer alabilirim?", answer: "Ürün ve prototiplerinizi sergilemek için stand başvurusu yapabilirsiniz. Startup başvuruları ücretsiz olarak değerlendirilir; diğer firmalar için kapsam ve ücretlendirme ekip tarafından belirlenir." },
];

export default function TrialHome() {
  return (
    <div className={styles.page}>
      <div className={styles.previewStrip}>
        <div className={`${styles.container} ${styles.previewBar}`}>
          <span>Tasarım denemesi</span>
          <a href="/">
            <span className={styles.previewBarLong}>Mevcut ana sayfayla karşılaştır</span>
            <span className={styles.previewBarShort}>Ana sayfa</span>
            <span aria-hidden="true"> ↗</span>
          </a>
        </div>
      </div>
      <PreviewHeader />
      <main id="main-content">
        <TrialHero />

        <section id="about" className={styles.organizers} aria-label="Düzenleyen kurumlar">
          <div className={`${styles.container} ${styles.organizerGrid}`}>
            {organizers.map((org) => <div key={org.name} className={styles.organizer}>
              <div className={styles.orgLogo}><Image src={org.logo} alt={org.name} width={76} height={76} className={styles.contain} /></div>
              <div><p>{org.role}</p><strong>{org.name}</strong></div>
            </div>)}
          </div>
        </section>



        <section id="speakers" className={styles.speakers}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Konuşmacılar</p>
                <h2 className={styles.sectionTitle}>Gündemi birlikte<br />konuşacağımız isimler.</h2>
                <p className={styles.speakersCount}>
                  {speakers.length} konuşmacı · {pendingCount} isim açıklanacak
                </p>
              </div>
              <a href="/tasarim-deneme/konusmacilar" className={styles.textLink}>
                Tüm konuşmacılar <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className={styles.container}><KeynoteSpotlight /></div>
          <div className={styles.marqueeBleed}>
            <SpeakerMarquee
              speakers={marqueeSpeakers}
              label="Konuşmacılar — yatay kaydırılabilir liste"
            />
          </div>

        </section>

        <TrialProgram />

        <TrialParticipation />

        <TrialSponsors />

        <TrialVenue questions={questions} />

        <TrialContact />
      </main>
      <TrialFooter />
    </div>
  );
}
