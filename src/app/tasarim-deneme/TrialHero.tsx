import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";
import styles from "./preview.module.css";

/**
 * Tam genislik hero.
 *
 * Gorsel `/hero-visual.png`. `aybu-etlik-preview.jpg` bilerek kullanilmadi:
 * kullanim izni teyit edilmemis durumda (bkz. docs/homepage-design-trial.md).
 *
 * Ana sayfadaki Hero.tsx ile ayni gorseli kullandigimiz icin her tercihi
 * tersine ceviriyoruz: kirpim 22% (orada 68%), icerik alta yasli (orada
 * dikey ortali), dikey scrim (orada yatay).
 */
export default function TrialHero() {
  return (
    <section id="home" className={styles.hero}>
      <Image
        src="/hero-visual.png"
        alt=""
        fill
        sizes="100vw"
        priority
        className={styles.heroImage}
      />
      <span className={styles.heroScrimV} aria-hidden="true" />
      <span className={styles.heroScrimH} aria-hidden="true" />
      <span className={styles.heroGridOverlay} aria-hidden="true" />

      <div className={`${styles.container} ${styles.heroContent}`}>
        <p className={styles.eyebrow}>22–23 Ekim 2026 · Ankara</p>
        <h1 className={styles.heroTitle}>
          Türkiye<br />Hidrojen Zirvesi<span className={styles.heroYear}>2026</span>
        </h1>
        <p className={styles.heroTheme}>
          Türkiye&apos;de Hidrojen Ekosisteminin İnşası:<br />
          Teknoloji, Strateji ve Uygulama
        </p>
        <p className={styles.heroDescription}>
          Akademi, kamu ve sanayi; hidrojenin üretiminden kullanımına, teknolojiden
          politikaya uzanan iki günlük programda buluşuyor.
        </p>
        <div className={styles.actions}>
          <a className={styles.primary} href="/kayit">
            Ücretsiz kayıt ol <span aria-hidden="true">↗</span>
          </a>
          <a className={styles.textLink} href="#program">
            Programı incele <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      {/* Hero'nun alt kenarina kaynamis etkinlik bandi: tam genislik gorsele
          ihtiyaci olan sert bitis kenarini verir ve geri sayimi h1 ile
          yarismayacagi bir yere koyar. */}
      <div className={styles.eventBar}>
        <div className={`${styles.container} ${styles.eventBarInner}`}>
          {/* Tarih ve sehir hero eyebrow'unda zaten var; dar ekranda tekrar
              etmesin diye ayri span'lerde. */}
          <p className={styles.eventBarWhere}>
            <span className={styles.eventBarDate}>22–23 Ekim 2026 · </span>
            AYBÜ Etlik Kongre Salonu<span className={styles.eventBarDate}>, Ankara</span>
          </p>
          <div className={styles.eventBarCountdown}>
            <span className={styles.eventBarLabel}>Zirveye kalan</span>
            <CountdownTimer />
          </div>
          {/* Dar ekranda gizli: sticky header'da zaten kalici bir kayit
              dugmesi var ve hero'da bir tane daha. */}
          <a className={styles.eventBarCta} href="/kayit">
            Ücretsiz kayıt <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
