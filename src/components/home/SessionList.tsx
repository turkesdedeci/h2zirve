import { type Session, sessionLabels } from "@/data/program";
import s from "./program.module.css";

const QUIET: Session["type"][] = ["registration", "break", "lunch"];

export default function SessionList({ sessions }: { sessions: Session[] }) {
  return (
    <ol>
      {sessions.map((session, index) => {
        const quiet = QUIET.includes(session.type);
        const hasDetails = Boolean(session.moderator || session.speakers?.length);
        const title = session.title
          .replace(/^Panel \d: /, "")
          .replace("Keynote Konuşmacı: ", "");
        const [start, end] = session.time.split(" - ");

        const content = (
          <>
            <span className={s.sessionLabel}>
              {sessionLabels[session.type]}
              {session.type === "panel" ? ` / ${session.title.match(/Panel (\d)/)?.[1]}` : ""}
            </span>
            <h4>{title}</h4>
            {session.moderator && (
              <p className={s.moderator}>
                Moderatör · {session.moderator.split("|")[0].trim()}
              </p>
            )}
          </>
        );

        return (
          <li
            key={`${session.time}-${index}`}
            className={quiet ? s.quiet : s.session}
            data-kind={session.type}
          >
            <div className={s.time}>
              <span>{start}</span>
              {!quiet && end && <small>{end}</small>}
            </div>
            {quiet ? (
              <p className={s.breakTitle}>{session.title}</p>
            ) : hasDetails ? (
              <details className={s.card}>
                <summary>
                  <div>{content}</div>
                  <span className={s.expand} aria-hidden="true">+</span>
                </summary>
                <div className={s.details}>
                  {session.moderator && (
                    <p>
                      <strong>Moderatör</strong>
                      {session.moderator}
                    </p>
                  )}
                  {session.speakers && (
                    <ul>
                      {session.speakers.map((speaker, i) => (
                        <li key={i}>
                          {speaker === "TBA"
                            ? "İsim açıklanacak"
                            : speaker.replace(/^TBA \| /, "İsim açıklanacak · ")}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            ) : (
              <div className={s.card}>{content}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
