import Image from "next/image";
import type { Speaker } from "@/data/speakers";
import { LOW_RES_PORTRAITS, PORTRAIT_FOCUS } from "./lowResPortraits";
import styles from "./preview.module.css";

/** Etiketi `role` metninden türetir — sıra numarasına bakmaz. */
export function speakerTag(role: string): string {
  if (role.includes("Keynote")) return "Keynote";
  const moderator = role.match(/(Panel \d)\s*Moderatörü/);
  if (moderator) return `${moderator[1]} · Moderatör`;
  if (role.includes("Moderatörü")) return "Moderatör";
  const panel = role.match(/Panel \d/);
  if (panel) return panel[0];
  if (role.includes("Açılış")) return "Açılış";
  return "Konuşmacı";
}

const SIZES = "(max-width: 600px) 160px, 192px";

export default function SpeakerCard({
  speaker,
  priority = false,
  tagOverride,
}: {
  speaker: Speaker;
  priority?: boolean;
  tagOverride?: string;
}) {
  const { photo, name, affiliation, initials, role } = speaker;
  const nativeWidth = photo ? LOW_RES_PORTRAITS[photo] : undefined;
  const focus = (photo && PORTRAIT_FOCUS[photo]) ?? speaker.photoPosition ?? "50% 50%";

  return (
    <article className={styles.speakerCard}>
      <div className={styles.portrait}>
        {photo ? (
          nativeWidth ? (
            <>
              {/* Kendi bulanık kopyası zemin olur; portre native genişliğinin
                  üzerine hiç büyütülmez. İkisi de aynı optimize URL'i ister. */}
              <Image
                src={photo}
                alt=""
                aria-hidden="true"
                fill
                sizes={SIZES}
                className={styles.portraitBackdrop}
              />
              <div className={styles.portraitInner} style={{ maxWidth: `${nativeWidth}px` }}>
                <Image
                  src={photo}
                  alt={name}
                  fill
                  sizes={SIZES}
                  className={styles.portraitContain}
                  priority={priority}
                />
              </div>
            </>
          ) : (
            <Image
              src={photo}
              alt={name}
              fill
              sizes={SIZES}
              className={styles.portraitImg}
              style={{ objectPosition: focus }}
              priority={priority}
            />
          )
        ) : (
          <span className={styles.portraitInitials} aria-hidden="true">
            {initials}
          </span>
        )}
        <span className={styles.portraitGrid} aria-hidden="true" />
        <span className={styles.speakerTag}>{tagOverride ?? speakerTag(role)}</span>
      </div>
      <h3 className={styles.speakerName}>{name}</h3>
      {affiliation && <p className={styles.speakerAffiliation}>{affiliation}</p>}
    </article>
  );
}
