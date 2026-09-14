"use client";

import type { Speaker } from "@/data/speakers";
import SpeakerCard from "./SpeakerCard";
import { useAutoScroll } from "./useAutoScroll";
import styles from "./preview.module.css";

export default function SpeakerMarquee({
  speakers,
  label,
}: {
  speakers: Speaker[];
  label: string;
}) {
  const {
    viewportRef,
    firstListRef,
    isPaused,
    togglePause,
    nudge,
    wrapperHandlers,
    viewportHandlers,
  } = useAutoScroll({ speed: 42 });

  return (
    <div className={styles.marquee} {...wrapperHandlers}>
      <div
        ref={viewportRef}
        className={styles.marqueeViewport}
        role="group"
        tabIndex={0}
        aria-label={label}
        {...viewportHandlers}
      >
        <ul ref={firstListRef} className={styles.marqueeTrack}>
          {speakers.map((speaker, index) => (
            <li
              key={`${speaker.name}-${index}`}
              className={styles.marqueeItem}
              data-marquee-item
            >
              <SpeakerCard speaker={speaker} priority={index < 6} />
            </li>
          ))}
        </ul>

        {/* Sarmayı görünür kılan kopya. `inert` onu erişilebilirlik ağacından,
            tab sırasından ve sayfa içi aramadan çıkarır; reduced-motion'da
            CSS ile tamamen kaldırılır. */}
        <ul
          className={`${styles.marqueeTrack} ${styles.marqueeClone}`}
          aria-hidden="true"
          inert
        >
          {speakers.map((speaker, index) => (
            <li key={`clone-${speaker.name}-${index}`} className={styles.marqueeItem}>
              <SpeakerCard speaker={speaker} />
            </li>
          ))}
        </ul>
      </div>

      {/* WCAG 2.2.2: 5 sn'den uzun otomatik hareket için açık bir durdurma
          mekanizması zorunlu — hover/odak duraklatması yeterli sayılmıyor. */}
      <div className={styles.marqueeControls}>
        <button
          type="button"
          className={styles.marqueeButton}
          onClick={() => nudge(-1)}
          aria-label="Önceki konuşmacılar"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className={styles.marqueePause}
          onClick={togglePause}
          aria-pressed={isPaused}
        >
          {isPaused ? "Devam ettir" : "Duraklat"}
        </button>
        <button
          type="button"
          className={styles.marqueeButton}
          onClick={() => nudge(1)}
          aria-label="Sonraki konuşmacılar"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
