import { programDays, sessionLabels, type SessionType } from "@/data/program";
import SessionList from "./SessionList";
import s from "./program.module.css";

const highlights: SessionType[] = ["keynote", "panel", "poster"];

function dayStats(sessions: { type: SessionType }[]) {
  return highlights
    .map((type) => ({ type, count: sessions.filter((x) => x.type === type).length }))
    .filter((x) => x.count > 0);
}

export default function ProgramFull() {
  return (
    <section className={`${s.program} ${s.programPage}`}>
      <header className={s.pageHead}>
        <p className={s.eyebrow}>22–23 Ekim 2026 · AYBÜ Etlik Kongre Salonu</p>
        <h1>
          Zirve programı<span>.</span>
        </h1>
        <p className={s.pageLead}>
          İki gün boyunca keynote konuşmaları, strateji panelleri, teknik oturumlar
          ve poster sunumları. Oturum başlıklarına dokunarak moderatör ve konuşmacı
          bilgilerini görebilirsiniz.
        </p>
      </header>

      {programDays.map((day, index) => (
        <div key={day.date} className={s.daySection}>
          <div className={s.dayBanner}>
            <div>
              <span className={s.dayIndex}>0{index + 1}. Gün</span>
              <h2>
                {day.date} Ekim <span>{day.weekday}</span>
              </h2>
              <p>{day.theme}</p>
            </div>
            <dl className={s.dayStats}>
              {dayStats(day.sessions).map(({ type, count }) => (
                <div key={type}>
                  <dt>{sessionLabels[type]}</dt>
                  <dd>{count}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={s.schedule}>
            <SessionList sessions={day.sessions} />
          </div>
        </div>
      ))}

      <div className={s.pageFoot}>
        <p>Program güncellenebilir; kesinleşen değişiklikler bu sayfada yayımlanır.</p>
        <a href="/kayit">
          Ücretsiz kayıt ol <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
