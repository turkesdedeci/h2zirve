"use client";

import { useState, useEffect } from "react";

const TARGET = new Date("2026-10-22T09:00:00");

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer() {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = TARGET.getTime() - Date.now();
      if (diff <= 0) return setT({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { v: t.days, l: "Gün" },
    { v: t.hours, l: "Saat" },
    { v: t.minutes, l: "Dk" },
    { v: t.seconds, l: "Sn" },
  ];

  return (
    <div className="flex items-baseline gap-2.5 font-display tabular-nums">
      {units.map(({ v, l }, i) => (
        <span key={l} className="flex items-baseline gap-1">
          <span className="text-h2-h3 font-semibold text-h2-ink-1">{pad(v)}</span>
          <span className="text-h2-micro font-sans font-medium uppercase tracking-wide text-h2-ink-3">
            {l}
          </span>
          {i < units.length - 1 && (
            <span className="ml-1.5 text-h2-ink-disabled" aria-hidden="true">
              ·
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
