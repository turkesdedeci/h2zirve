"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useAutoScroll } from "./useAutoScroll";
import styles from "./preview.module.css";

/**
 * `scale`, optik normalizasyon icindir. object-contain tek basina yeterli
 * degil: genis bir wordmark ile kare bir amblem ayni sinirlayici kutuyu
 * doldurur ve amblem iki kat agir gorunur. Carpanlar olculen en-boy
 * oranlarina gore verildi: orani ~3+ olan wordmark'lar genislikten sinirlanip
 * kutuyu doldurur; kare/dik markalar yukseklikten sinirlandigi icin zaten
 * kucuk kalir, bu yuzden carpanlari 1'in USTUNE cikar. Yeni logo eklenince
 * 120x48 slotta gozle ayarlanmali.
 */
type Logo = { src: string; name: string; scale: number };

const SPONSORS: Logo[] = [
  { src: "/logos/hydrogenix.png", name: "Hydrogenix", scale: 1 },
  { src: "/logos/lentatek.png", name: "Lentatek", scale: 1 },
  { src: "/logos/debak.jpg", name: "Debak", scale: 1 },
  { src: "/logos/hidronerji.png", name: "Hidronerji", scale: 1.2 },
  { src: "/logos/kuhytech.png", name: "KUHyTech", scale: 1 },
  { src: "/logos/hidromek.png", name: "Hidromek", scale: 1 },
  { src: "/logos/besyapi.jpg", name: "Baş Yapı", scale: 1.15 },
];

/**
 * Otomatik kayma esigi: 12'nin altinda sonsuz dongu birkac saniyede bir
 * gorunur sekilde tekrar eder ve dolgu gibi okunur. Bugun her iki satir da
 * statik; sponsor sayisi 12'yi gecince kendiliginden devreye girer.
 */
const AUTO_SCROLL_THRESHOLD = 12;

function LogoRow({ title, logos }: { title: string; logos: Logo[] }) {
  const autoScroll = logos.length >= AUTO_SCROLL_THRESHOLD;
  const {
    viewportRef,
    firstListRef,
    isPaused,
    togglePause,
    wrapperHandlers,
    viewportHandlers,
  } = useAutoScroll({ speed: -30, enabled: autoScroll, fallbackGap: 28 });

  const items = (keyPrefix: string) =>
    logos.map((logo) => (
      <li
        key={`${keyPrefix}-${logo.src}`}
        className={styles.logoItem}
        style={{ "--logo-scale": logo.scale } as CSSProperties}
      >
        <div className={styles.logoBox}>
          <Image
            src={logo.src}
            alt={logo.name}
            fill
            sizes="120px"
            className={styles.logoImg}
          />
        </div>
      </li>
    ));

  return (
    <div className={styles.logoRow} {...wrapperHandlers}>
      <div className={styles.logoRowHead}>
        <span className={styles.logoRowTitle}>{title}</span>
        <span className={styles.logoRowRule} aria-hidden="true" />
        {autoScroll && (
          <button
            type="button"
            className={styles.logoPause}
            onClick={togglePause}
            aria-pressed={isPaused}
          >
            {isPaused ? "Devam ettir" : "Duraklat"}
          </button>
        )}
      </div>
      <div
        ref={viewportRef}
        className={`${styles.logoViewport} ${autoScroll ? "" : styles.logoViewportStatic}`}
        role="group"
        aria-label={title}
        {...viewportHandlers}
      >
        <ul
          ref={firstListRef}
          className={`${styles.logoTrack} ${autoScroll ? styles.logoTrackScrolling : ""}`}
        >
          {items("a")}
        </ul>
        {autoScroll && (
          <ul
            className={`${styles.logoTrack} ${styles.logoTrackScrolling}`}
            aria-hidden="true"
            inert
          >
            {items("clone")}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function TrialLogoBand() {
  return (
    <section className={styles.logoBand} aria-label="Düzenleyen kurumlar ve sponsorlar">
      <div className={styles.container}>
        {/* Yalnizca sponsorlar. Duzenleyen kurumlar hero'nun hemen altindaki
            kendi bandinda, rolleriyle birlikte duruyor; burada tekrarlamak ayni
            uc logoyu iki kez gosterirdi ve ev sahibi kurum ile sponsor
            iliskisini duzlestirirdi. */}
        <LogoRow title="Sponsorlar" logos={SPONSORS} />
      </div>
    </section>
  );
}
