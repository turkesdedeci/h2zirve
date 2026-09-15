"use client";

import type { Speaker } from "@/data/speakers";
import SpeakerCard from "./SpeakerCard";
import { useAutoScroll } from "./useAutoScroll";
import styles from "./preview.module.css";

const speakerGroupRank = (speaker: Speaker) => {
  if (speaker.role.includes("Keynote")) return 0;
  if (speaker.role.includes("Açılış")) return 1;

  const panelMatch = speaker.role.match(/Panel\s+([1-5])/);
  if (panelMatch) return Number(panelMatch[1]) + 1;

  return 99;
};

const orderMarqueeSpeakers = (speakers: Speaker[]) =>
  speakers
    .map((speaker, originalIndex) => ({ speaker, originalIndex }))
    .sort((a, b) => {
      const groupDifference = speakerGroupRank(a.speaker) - speakerGroupRank(b.speaker);
      if (groupDifference !== 0) return groupDifference;

      const moderatorDifference =
        Number(!a.speaker.role.includes("Moderatörü")) -
        Number(!b.speaker.role.includes("Moderatörü"));
      if (moderatorDifference !== 0) return moderatorDifference;

      return a.originalIndex - b.originalIndex;
    })
    .map(({ speaker }) => speaker);

export default function SpeakerMarquee({
  speakers,
  label,
}: {
  speakers: Speaker[];
  label: string;
}) {
  const orderedSpeakers = orderMarqueeSpeakers(speakers);

  const {
    viewportRef,
    firstListRef,
    wrapperHandlers,
    viewportHandlers,
  } = useAutoScroll({ speed: 42, hoverSpeed: 2.5 });

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
          {orderedSpeakers.map((speaker, index) => (
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
          {orderedSpeakers.map((speaker, index) => (
            <li key={`clone-${speaker.name}-${index}`} className={styles.marqueeItem}>
              <SpeakerCard speaker={speaker} />
            </li>
          ))}
        </ul>
      </div>


    </div>
  );
}
