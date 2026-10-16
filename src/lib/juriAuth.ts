import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Jüri bağlantısı (token) tek başına yetmesin diye her jüriye 6 haneli PIN verilir.
 * PIN veritabanında saklanmaz: token'dan sunucu anahtarıyla türetilir (HMAC), böylece
 * şema değişikliği gerekmez. Doğru PIN girilince httpOnly bir çerez set edilir.
 */

const TOKEN_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const JURI_SON_TARIH = "23 Ekim 2026 Cuma, 13:00";

export function isValidToken(token: unknown): token is string {
  return typeof token === "string" && TOKEN_RE.test(token);
}

function secret() {
  return process.env.JURI_PIN_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

function mac(label: string, token: string) {
  return createHmac("sha256", secret()).update(`${label}:${token.toLowerCase()}`).digest();
}

export function pinFor(token: string) {
  return String(mac("pin", token).readUInt32BE(0) % 1_000_000).padStart(6, "0");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function pinMatches(token: string, pin: unknown) {
  return typeof pin === "string" && safeEqual(pinFor(token), pin.replace(/\s+/g, ""));
}

export function cookieName(token: string) {
  return `juri_${token.slice(0, 8).toLowerCase()}`;
}

export function sessionValue(token: string) {
  return mac("auth", token).toString("hex");
}

export function hasSession(cookieValue: string | undefined | null, token: string) {
  return Boolean(cookieValue) && safeEqual(String(cookieValue), sessionValue(token));
}

export function sessionFromCookieHeader(header: string | null, token: string) {
  if (!header) return false;
  const name = cookieName(token);
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return hasSession(rest.join("="), token);
  }
  return false;
}

/** Basit bellek içi hız sınırı (PIN deneme koruması); sunucusuz ortamda en iyi çaba. */
const attempts = new Map<string, number[]>();
export function tooManyAttempts(key: string, limit = 8, windowMs = 15 * 60 * 1000) {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    attempts.set(key, recent);
    return true;
  }
  recent.push(now);
  attempts.set(key, recent);
  return false;
}
