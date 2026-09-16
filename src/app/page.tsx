import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Program from "@/components/Program";
import Speakers from "@/components/Speakers";
import Exhibitors from "@/components/Exhibitors";
import CallForPapers from "@/components/CallForPapers";
import Sponsors from "@/components/Sponsors";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const siteUrl = "https://www.hidrojenzirvesi.com";

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
      offers: {
        "@type": "Offer",
        url: `${siteUrl}/kayit`,
        price: "0",
        priceCurrency: "TRY",
        availability: "https://schema.org/InStock",
        validFrom: "2026-09-16",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <About />
        <Program preview />
        <Speakers />
        <Exhibitors />
        <CallForPapers compact />
        <Sponsors />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
