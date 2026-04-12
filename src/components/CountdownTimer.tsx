"use client";

import { useState, useEffect } from "react";

const TARGET = new Date("2026-10-15T09:00:00");

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
    { v: t.minutes, l: "Dakika" },
    { v: t.seconds, l: "Saniye" },
  ];

  return (
    <div className="flex gap-3 sm:gap-5">
      {units.map(({ v, l }) => (
        <div key={l} className="flex flex-col items-center">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
              {pad(v)}
            </span>
          </div>
          <span className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
            {l}
          </span>
        </div>
      ))}
    </div>
  );
}
