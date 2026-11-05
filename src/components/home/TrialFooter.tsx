import Image from "next/image";
import styles from "./preview.module.css";

const navLinks = [
  { label: "Hakkında", href: "/#about" },
  { label: "Program", href: "/#program" },
  { label: "Konuşmacılar", href: "/konusmacilar" },
  { label: "Sponsorlar ve Firmalar", href: "/#sponsors" },
  { label: "Mekân", href: "/#venue" },
  { label: "İletişim", href: "/#contact" },
];

const organizers = [
  { name: "AYBÜ", logo: "/logos/aybu.png", alt: "Ankara Yıldırım Beyazıt Üniversitesi" },
  { name: "H2TEAM", logo: "/logos/h2team.png", alt: "H2TEAM" },
  { name: "TESPAM", logo: "/logos/tespam.png", alt: "TESPAM" },
];

export default function TrialFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <Image
              src="/logos/turkiye-hidrojen-zirvesi-logo-v4.png"
              alt="Türkiye Hidrojen Zirvesi 2026"
              width={200}
              height={104}
            />
            <p>
              Türkiye Hidrojen Zirvesi 2026
              <br />
              22–23 Ekim 2026 · Ankara, Türkiye
            </p>
          </div>

          <div className={styles.footerCol}>
            <h3>Zirve</h3>
            <nav aria-label="Zirve bağlantıları">
              {navLinks.map(({ label, href }) => (
                <a key={label} href={href}>
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div className={styles.footerCol}>
            <h3>Organizasyon</h3>
            <div className={styles.footerOrgs}>
              {organizers.map(({ name, logo, alt }) => (
                <div key={name} className={styles.footerOrg}>
                  <Image src={logo} alt={alt} width={34} height={34} />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>
            © 2026 Türkiye Hidrojen Zirvesi. Tüm hakları saklıdır. ·{" "}
            <a href="/poster-cagrisi">Poster Çağrısı</a> ·{" "}
            <a href="/komiteler">Komiteler</a>
          </p>
          <p>
            AYBÜ ev sahipliği ve liderliğinde, H2TEAM koordinasyonunda, TESPAM iş
            birliğiyle.
          </p>
        </div>
      </div>
    </footer>
  );
}
