"use client";

import type { Speaker } from "@/data/speakers";
import SpeakerCard, { speakerRoleSlots } from "./SpeakerCard";
import { useAutoScroll } from "./useAutoScroll";
import styles from "./preview.module.css";

/** İki görevi olan isim seride iki kez geçer: her kart durduğu yerin
 *  görevini taşır. Şerit zaten kendini tekrarladığı için aynı yüzün ikinci
 *  kez görünmesi sırayı bozmuyor, görevi gizlemek bozuyordu. */
const orderMarqueeCards = (speakers: Speaker[]) =>
  speakers
    .flatMap((speaker, originalIndex) =>
      speakerRoleSlots(speaker.role).map((slot) => ({ speaker, slot, originalIndex }))
    )
    .sort((a, b) => {
      const groupDifference = a.slot.rank - b.slot.rank;
      if (groupDifference !== 0) return groupDifference;

      const moderatorDifference = Number(!a.slot.moderator) - Number(!b.slot.moderator);
      if (moderatorDifference !== 0) return moderatorDifference;

      return a.originalIndex - b.originalIndex;
    });

export default function SpeakerMarquee({
  speakers,
  label,
}: {
  speakers: Speaker[];
  label: string;
}) {
  const cards = orderMarqueeCards(speakers);

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
          {cards.map(({ speaker, slot }, index) => (
            <li
              key={`${speaker.name}-${slot.tag}`}
              className={styles.marqueeItem}
              data-marquee-item
            >
              <SpeakerCard speaker={speaker} tagOverride={slot.tag} priority={index < 6} />
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
          {cards.map(({ speaker, slot }) => (
            <li key={`clone-${speaker.name}-${slot.tag}`} className={styles.marqueeItem}>
              <SpeakerCard speaker={speaker} tagOverride={slot.tag} />
            </li>
          ))}
        </ul>
      </div>


    </div>
  );
}
