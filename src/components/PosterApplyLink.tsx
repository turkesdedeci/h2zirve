"use client";

import { useEffect, useState } from "react";
import { POSTER_SUBMISSION_DEADLINE, isPosterDeadlinePassed } from "@/lib/posterDeadline";

export default function PosterApplyLink({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [closed, setClosed] = useState(isPosterDeadlinePassed);

  useEffect(() => {
    if (closed) return;
    const remaining = POSTER_SUBMISSION_DEADLINE.getTime() - Date.now();
    const timer = setTimeout(() => setClosed(true), Math.max(remaining, 0));
    return () => clearTimeout(timer);
  }, [closed]);

  if (closed) {
    return (
      <span
        className={className}
        aria-disabled="true"
        style={{ opacity: 0.5, pointerEvents: "none", cursor: "not-allowed" }}
      >
        Başvuru Süresi Doldu
      </span>
    );
  }

  return (
    <a className={className} href="/poster-basvurusu">
      {children}
    </a>
  );
}
