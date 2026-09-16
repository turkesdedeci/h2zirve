"use client";

import { useState } from "react";
import { programDays } from "@/data/program";
import SessionList from "./SessionList";
import s from "./program.module.css";

export default function TrialProgram() {
  const [selected, setSelected] = useState(0);
  const day = programDays[selected];

  return (
    <section id="program" className={s.program}>
      <div className={s.heading}>
        <div>
          <p className={s.eyebrow}>22–23 Ekim 2026 / Ankara</p>
          <h2>Zirve programı<span>.</span></h2>
        </div>
        <a href="/program">Tam program <span aria-hidden="true">↗</span></a>
      </div>

      <div className={s.layout}>
        <aside className={s.dayRail}>
          <div className={s.days} aria-label="Program günü">
            {programDays.map((item, index) => (
              <button
                key={item.date}
                type="button"
                aria-pressed={selected === index}
                aria-controls="trial-day-sessions"
                onClick={() => setSelected(index)}
              >
                <span>0{index + 1}</span>
                {item.date} Ekim <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div className={s.datePoster} aria-hidden="true">
            <span className={s.bigDate}>{day.date}</span>
            <span className={s.month}>EKİM ’26</span>
            <div className={s.posterLines}>
              {Array.from({ length: 8 }, (_, index) => (
                <i key={index} style={{ transform: `rotate(${index * 12 - 36}deg)` }} />
              ))}
            </div>
          </div>
          <p className={s.dayTheme}>{day.theme}</p>
          <p className={s.location}>
            {day.weekday}
            <br />
            AYBÜ Etlik Kongre Salonu
          </p>
        </aside>

        <div
          id="trial-day-sessions"
          className={s.schedule}
          aria-label={`${day.date} Ekim programı`}
        >
          <div className={s.dayHeading}>
            <h3>
              {day.date} Ekim <span>{day.weekday}</span>
            </h3>
            <span>{selected + 1}. Gün</span>
          </div>
          <SessionList key={selected} sessions={day.sessions} />
        </div>
      </div>
    </section>
  );
}
