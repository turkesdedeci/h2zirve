export const POSTER_SUBMISSION_DEADLINE = new Date("2026-09-22T23:59:00+03:00");

export function isPosterDeadlinePassed() {
  return Date.now() > POSTER_SUBMISSION_DEADLINE.getTime();
}
