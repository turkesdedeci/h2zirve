import Image from "next/image";
import { Manrope } from "next/font/google";
import { type Speaker, speakers } from "@/data/speakers";
import KeynoteSpotlight from "@/components/home/KeynoteSpotlight";
import PreviewHeader from "@/components/home/PreviewHeader";
import SpeakerMarquee from "@/components/home/SpeakerMarquee";
import TrialContact from "@/components/home/TrialContact";
import TrialFooter from "@/components/home/TrialFooter";
import TrialHero from "@/components/home/TrialHero";
import TrialProgram from "@/components/home/TrialProgram";
import TrialSpecialIssues from "@/components/home/TrialSpecialIssues";
import TrialSponsors from "@/components/home/TrialSponsors";
import TrialVenue from "@/components/home/TrialVenue";
import styles from "@/components/home/preview.module.css";

const display = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = "https://www.hidrojenzirvesi.com";

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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Türkiye Hidrojen Zirvesi",
      url: siteUrl,
      logo: `${siteUrl}/logos/turkiye-hidrojen-zirvesi-logo-v4.png`,
      email: "h2zirvesi@tespam.org",
      sameAs: [
        "https://www.linkedin.com/showcase/t%C3%BCrkiye-hidrojen-zirvesi",
        "https://www.instagram.com/h2zirvesi/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Türkiye Hidrojen Zirvesi 2026",
      url: siteUrl,
      inLanguage: "tr-TR",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Event",
      "@id": `${siteUrl}/#event`,
      name: "Türkiye Hidrojen Zirvesi 2026",
      description:
        "Türkiye Hidrojen Zirvesi 2026; akademi, kamu ve sektörü hidrojen ekosisteminin ortak gündeminde buluşturan kongre ve strateji forumudur.",
      startDate: "2026-10-22",
      endDate: "2026-10-23",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      image: [`${siteUrl}/hero-visual.png`],
      url: siteUrl,
      location: {
        "@type": "Place",
        name: "AYBÜ Etlik Kongre Salonu",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ankara",
          addressCountry: "TR",
        },
      },
      organizer: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function Home() {
  return (
    <div className={`${styles.page} ${display.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
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
                <h2 className={styles.sectionTitle}>Gündemi birlikte<br />konuştuğumuz isimler.</h2>
                <p className={styles.speakersCount}>
                  {speakers.length - pendingCount} konuşmacı
                </p>
              </div>
              <a href="/konusmacilar" className={styles.textLink}>
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

        <TrialSpecialIssues />

        <TrialSponsors />

        <TrialVenue />

        <TrialContact />
      </main>
      <TrialFooter />
    </div>
  );
}
