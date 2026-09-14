import Image from "next/image";
import styles from "./preview.module.css";

export default function TrialFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Image
          src="/logos/turkiye-hidrojen-zirvesi-logo-v4.png"
          alt="Türkiye Hidrojen Zirvesi 2026"
          width={170}
          height={89}
        />
        <div>
          <p>
            AYBÜ ev sahipliği ve liderliğinde,<br />
            H2TEAM koordinasyonunda, TESPAM iş birliğiyle.
          </p>
          <nav aria-label="Alt menü">
            <a href="/komite">Komite</a>
            <a href="/program">Program</a>
            <a href="/sponsorluk-basvurusu">Sponsorluk</a>
            <a href="/tasarim-deneme#contact">İletişim</a>
          </nav>
          <p className={styles.copyright}>© 2026 Türkiye Hidrojen Zirvesi</p>
        </div>
      </div>
    </footer>
  );
}
