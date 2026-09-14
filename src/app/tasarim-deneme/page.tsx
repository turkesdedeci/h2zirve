import Image from "next/image";
import Sponsors from "@/components/Sponsors";
import Contact from "@/components/Contact";
import { type Speaker, speakers } from "@/data/speakers";
import SpeakerMarquee from "./SpeakerMarquee";
import TrialHero from "./TrialHero";
import TrialStats from "./TrialStats";
import TrialProgram from "./TrialProgram";
import TrialLogoBand from "./TrialLogoBand";
import TrialFooter from "./TrialFooter";
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
        <TrialStats />

        <section className={styles.organizers} aria-label="Düzenleyen kurumlar">
          <div className={`${styles.container} ${styles.organizerGrid}`}>
            {organizers.map((org) => <div key={org.name} className={styles.organizer}>
              <div className={styles.orgLogo}><Image src={org.logo} alt={org.name} width={76} height={76} className={styles.contain} /></div>
              <div><p>{org.role}</p><strong>{org.name}</strong></div>
            </div>)}
          </div>
        </section>

        <section id="about" className={styles.about}>
          <div className={`${styles.container} ${styles.aboutGrid}`}>
            <div><p className={styles.eyebrow}>Zirvede sizi neler bekliyor?</p><h2 className={styles.sectionTitle}>Araştırmadan<br />uygulamaya.</h2></div>
            <div>
              <p className={styles.aboutLead}>Türkiye&apos;nin hidrojen gündemini, üzerinde çalışan isimlerle birlikte ele alın.</p>
              <div className={styles.valueRows}>
                <div><span>01</span><p><strong>Strateji ve teknoloji</strong>Beş panel ve iki keynote ile hidrojen yol haritası, savunma, üretim, sanayi ve ekonomi.</p></div>
                <div><span>02</span><p><strong>Araştırma ve paylaşım</strong>Poster sunumları, çalışmalar üzerine görüş alışverişi ve programdaki H2TEAM laboratuvar ziyareti.</p></div>
                <div><span>03</span><p><strong>Akademi ve sektör</strong>Firma standlarında teknolojileri tanıyın; araştırmacılar, kamu ve sanayi temsilcileriyle bir araya gelin.</p></div>
              </div>
            </div>
          </div>
        </section>

        <TrialLogoBand />

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
          <div className={styles.marqueeBleed}>
            <SpeakerMarquee
              speakers={marqueeSpeakers}
              label="Konuşmacılar — yatay kaydırılabilir liste"
            />
          </div>
          <div className={styles.container}>
            <p className={styles.marqueeHint}>
              Şerit kendiliğinden ilerler; üzerine geldiğinizde, odaklandığınızda
              veya dokunduğunuzda durur.
            </p>
          </div>
        </section>

        <TrialProgram />

        <section id="participate" className={styles.participate}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div><p className={styles.eyebrow}>Zirvede yerinizi alın</p><h2 className={styles.sectionTitle}>Çalışmanızla.<br />Teknolojinizle.</h2></div>
              <p className={styles.participateIntro}>Bilimsel çalışmanızı paylaşın veya ürün ve prototiplerinizi sektörle buluşturun.</p>
            </div>
            <div className={styles.participationGrid}>
              <article id="cfp">
                <p className={styles.smallLabel}>Araştırmacılar için</p><h3>Poster sunun.</h3>
                <p>Akademik ve endüstriyel çalışmalarınızı poster programına taşıyın. Seçilen çalışmalar için özel sayı daveti imkânı.</p>
                <dl><div><dt>Özet son başvuru</dt><dd>15 Eylül 2026</dd></div><div><dt>En yüksek ödül</dt><dd>1500 $</dd></div></dl>
                <div className={styles.actions}><a href="/poster-basvurusu" className={styles.darkButton}>Poster başvurusu <span aria-hidden="true">↗</span></a><a href="/poster-cagrisi" className={styles.textLink}>Takvim ve koşullar</a></div>
              </article>
              <article id="exhibitors">
                <p className={styles.smallLabel}>Firmalar ve girişimler için</p><h3>Teknolojinizi sergileyin.</h3>
                <p>Hidrojen alanındaki ürün, teknoloji ve prototiplerinizle sergi alanında yer alın.</p>
                <dl><div><dt>Startup</dt><dd>Ücretsiz başvuru değerlendirmesi</dd></div><div><dt>KOBİ ve büyük firma</dt><dd>Kapsama göre teklif</dd></div></dl>
                <div className={styles.actions}><a href="/stand-basvurusu" className={styles.darkButton}>Stand başvurusu <span aria-hidden="true">↗</span></a><a href="/sponsorluk-basvurusu" className={styles.textLink}>Sponsorluk seçenekleri</a></div>
              </article>
            </div>
          </div>
        </section>

        <Sponsors compact />

        <section id="venue" className={styles.venue}>
          <div className={`${styles.container} ${styles.venueGrid}`}>
            <div>
              <p className={styles.eyebrow}>Buluşma noktası</p><h2 className={styles.sectionTitle}>Ankara&apos;da<br />görüşmek üzere.</h2>
              <p className={styles.venueName}>AYBÜ Etlik Kongre Salonu</p><p className={styles.venueDate}>22–23 Ekim 2026 · Ankara, Türkiye</p>
              <a className={styles.textLink} href="https://www.google.com/maps/search/?api=1&query=AYB%C3%9C%20Etlik%20Kongre%20Salonu%20Ankara" target="_blank" rel="noreferrer">Haritada ara <span aria-hidden="true">↗</span><span className="sr-only"> (yeni sekmede açılır)</span></a>
              <p className={styles.travelNote}>Ulaşım ve katılımla ilgili sorularınız için <a href="mailto:h2zirvesi@tespam.org">h2zirvesi@tespam.org</a></p>
            </div>
            <div className={styles.faq}><h3>Gelmeden önce</h3>{questions.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
          </div>
          <div className={`${styles.container} ${styles.registration}`}>
            <div><p>22–23 Ekim · Ankara</p><h3>Program belli.<br />Sırada sizin katılımınız var.</h3></div>
            <div><a className={styles.primary} href="/kayit">Ücretsiz kayıt oluştur <span aria-hidden="true">↗</span></a><p className={styles.registrationNote}>Bir gün veya her iki gün için ön kayıt yapabilirsiniz.</p></div>
          </div>
        </section>

        <Contact />
      </main>
      <TrialFooter />
    </div>
  );
}
