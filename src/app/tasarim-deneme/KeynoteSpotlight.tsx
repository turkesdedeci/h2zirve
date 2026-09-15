import Image from "next/image";
import { speakers } from "@/data/speakers";
import { day1 } from "@/data/program";
import s from "./experience.module.css";
export default function KeynoteSpotlight() {
  const keynotes = speakers.filter(speaker => speaker.role.includes("Keynote"));
  const sessions = day1.filter(session => session.type === "keynote");
  return <div className={s.keynotes}>{keynotes.map((speaker, index) => <article key={speaker.name} className={s.keynote}>
    <div className={s.keynoteImage}>{speaker.photo && <Image src={speaker.photo} alt={speaker.name} fill sizes="(max-width: 600px) 85vw, 40vw" />}<span aria-hidden="true">0{index + 1}</span></div>
    <div className={s.keynoteInfo}><p className={s.kicker}>Keynote / 22 Ekim · {sessions[index]?.time}</p><h3>{speaker.name}</h3><p>{speaker.affiliation}</p><span className={s.keynoteRole}>{speaker.role}</span></div>
  </article>)}</div>;
}
