import Image from "next/image";
import type { Speaker } from "@/data/speakers";
import { LOW_RES_PORTRAITS, PORTRAIT_FOCUS } from "./lowResPortraits";
import styles from "./preview.module.css";

export interface SpeakerRoleSlot {
  /** Sıralama anahtarı: keynote 0, açılış 1, Panel n → n + 1. */
  rank: number;
  /** Kartın rozetine basılan etiket. */
  tag: string;
  /** speakerGroupDefinitions[].role ile eşleşen grup anahtarı. */
  groupRole: string;
  moderator: boolean;
}

/** Rol metnindeki görevlerin tamamını ayrıştırır.
 *
 * Bazı isimler programda iki yerde birden: Selahattin Çelik hem açılış
 * konuşmacısı hem Panel 2 moderatörü, İbrahim Dinçer hem keynote hem Panel 1
 * konuşmacısı. Tek etiket bunlardan birini gizliyordu; kart nerede duruyorsa
 * o görevi göstersin diye görevler ayrı ayrı döner. */
export function speakerRoleSlots(role: string): SpeakerRoleSlot[] {
  const slots: SpeakerRoleSlot[] = [];

  if (role.includes("Keynote")) {
    slots.push({ rank: 0, tag: "Keynote", groupRole: "Keynote", moderator: false });
  }
  if (role.includes("Açılış")) {
    slots.push({ rank: 1, tag: "Açılış", groupRole: "Açılış Konuşması", moderator: false });
  }
  for (const match of role.matchAll(/Panel\s+(\d)(\s*Moderatörü)?/g)) {
    const panel = Number(match[1]);
    const moderator = Boolean(match[2]);
    slots.push({
      rank: panel + 1,
      tag: moderator ? `Panel ${panel} · Moderatör` : `Panel ${panel}`,
      groupRole: `Panel ${panel}`,
      moderator,
    });
  }

  if (slots.length === 0) {
    const moderator = role.includes("Moderatörü");
    slots.push({
      rank: 99,
      tag: moderator ? "Moderatör" : "Konuşmacı",
      groupRole: role,
      moderator,
    });
  }
  return slots;
}

/** Tek kart gösterilen yerlerde kullanılan birincil etiket. */
export function speakerTag(role: string): string {
  return speakerRoleSlots(role)[0].tag;
}

/** Kart bir grubun içindeyse etiketi o grubun görevinden alır. */
export function speakerTagInGroup(role: string, groupRole: string): string {
  const slots = speakerRoleSlots(role);
  return (slots.find((slot) => slot.groupRole === groupRole) ?? slots[0]).tag;
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
