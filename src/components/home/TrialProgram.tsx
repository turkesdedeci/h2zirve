"use client";

import { useState } from "react";
import { day1, day2, sessionLabels } from "@/data/program";
import s from "./program.module.css";

const days = [
  { date: "22", weekday: "Perşembe", theme: "Strateji ve endüstri", sessions: day1 },
  { date: "23", weekday: "Cuma", theme: "Teknoloji ve uygulama", sessions: day2 },
];

export default function TrialProgram() {
  const [selected, setSelected] = useState(0);
  const day = days[selected];
  return <section id="program" className={s.program}>
    <div className={s.heading}><div><p className={s.eyebrow}>22–23 Ekim 2026 / Ankara</p><h2>Zirve programı<span>.</span></h2></div><a href="/program">Tam program <span aria-hidden="true">↗</span></a></div>
    <div className={s.layout}>
      <aside className={s.dayRail}>
        <div className={s.days} aria-label="Program günü">{days.map((item, index) => <button key={item.date} type="button" aria-pressed={selected === index} aria-controls="trial-day-sessions" onClick={() => setSelected(index)}><span>0{index + 1}</span>{item.date} Ekim <span aria-hidden="true">↗</span></button>)}</div>
        <div className={s.datePoster} aria-hidden="true"><span className={s.bigDate}>{day.date}</span><span className={s.month}>EKİM ’26</span><div className={s.posterLines}>{Array.from({length: 8}, (_, index) => <i key={index} style={{transform: `rotate(${index * 12 - 36}deg)`}} />)}</div></div>
        <p className={s.dayTheme}>{day.theme}</p><p className={s.location}>{day.weekday}<br />AYBÜ Etlik Kongre Salonu</p>
      </aside>
      <div id="trial-day-sessions" className={s.schedule} aria-label={`${day.date} Ekim programı`}>
        <div className={s.dayHeading}><h3>{day.date} Ekim <span>{day.weekday}</span></h3><span>{selected + 1}. Gün</span></div>
        <ol key={selected}>{day.sessions.map((session, index) => {
          const quiet = ["registration", "break", "lunch"].includes(session.type);
          const hasDetails = Boolean(session.moderator || session.speakers?.length);
          const title = session.title.replace(/^Panel \d: /, "").replace("Keynote Konuşmacı: ", "");
          const content = <><span className={s.sessionLabel}>{sessionLabels[session.type]}{session.type === "panel" ? ` / ${session.title.match(/Panel (\d)/)?.[1]}` : ""}</span><h4>{title}</h4>{session.moderator && <p className={s.moderator}>Moderatör · {session.moderator.split("|")[0].trim()}</p>}</>;
          return <li key={`${session.time}-${index}`} className={quiet ? s.quiet : s.session} data-kind={session.type}>
            <div className={s.time}><span>{session.time.split(" - ")[0]}</span>{!quiet && session.time.includes(" - ") && <small>{session.time.split(" - ")[1]}</small>}</div>
            {quiet ? <p className={s.breakTitle}>{session.title}</p> : hasDetails ? <details className={s.card}><summary><div>{content}</div><span className={s.expand} aria-hidden="true">+</span></summary><div className={s.details}>{session.moderator && <p><strong>Moderatör</strong>{session.moderator}</p>}{session.speakers && <ul>{session.speakers.map((speaker, i) => <li key={i}>{speaker === "TBA" ? "İsim açıklanacak" : speaker.replace(/^TBA \| /, "İsim açıklanacak · ")}</li>)}</ul>}</div></details> : <div className={s.card}>{content}</div>}
          </li>;
        })}</ol>
      </div>
    </div>
  </section>;
}
