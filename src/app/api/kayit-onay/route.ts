import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import {
  kayitOnayHtml,
  kayitOnaySubject,
  kayitOnayText,
} from "@/lib/kayitOnayMaili";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Uç nokta, verilen adrese mail gönderdiği için kötüye kullanıma açık.
// İçerik sabit (gönderenin metin ekleyebileceği bir alan yok), kalan risk
// aynı adrese tekrar tekrar mail attırmak; alttaki sınırlar bunu kesiyor.
const EMAIL_LIMIT = 3; // aynı adrese
const IP_LIMIT = 12; // aynı IP'den
const WINDOW_MS = 60 * 60 * 1000; // saatlik pencere

const hits = new Map<string, number[]>();

function rateLimited(key: string, limit: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Bellekte sınırsız büyümesin diye ara sıra süresi geçmiş anahtarları at.
  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) {
        hits.delete(k);
      }
    }
  }

  return false;
}

/**
 * SUPABASE_SERVICE_ROLE_KEY tanımlıysa, mail göndermeden önce bu adrese ait
 * yeni bir kaydın gerçekten var olduğunu doğrular. Tanımlı değilse doğrulama
 * atlanır ve yalnızca hız sınırı korur.
 */
async function kayitDogrula(email: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return true;
  }

  const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  const query =
    `${url}/rest/v1/katilimci_kayitlari` +
    `?select=id&email=eq.${encodeURIComponent(email)}` +
    `&created_at=gte.${encodeURIComponent(since)}&limit=1`;

  try {
    const response = await fetch(query, {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn("Kayıt doğrulaması başarısız", response.status);
      return false;
    }

    const rows = (await response.json()) as unknown[];
    return Array.isArray(rows) && rows.length > 0;
  } catch (error) {
    console.warn("Kayıt doğrulaması yapılamadı", error);
    return false;
  }
}

export async function POST(request: Request) {
  let payload: { email?: unknown };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const email =
    typeof payload.email === "string" ? payload.email.trim().slice(0, 160) : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Geçerli bir e-posta adresi gerekli." },
      { status: 400 }
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "bilinmiyor";

  if (rateLimited(`ip:${ip}`, IP_LIMIT) || rateLimited(`mail:${email.toLowerCase()}`, EMAIL_LIMIT)) {
    return NextResponse.json(
      { error: "Çok fazla istek gönderildi." },
      { status: 429 }
    );
  }

  if (!(await kayitDogrula(email))) {
    return NextResponse.json({ error: "Kayıt bulunamadı." }, { status: 403 });
  }

  const host = process.env.SMTP_HOST ?? "mt-spring.panel-giris.com";
  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = (process.env.SMTP_SECURE ?? "true") === "true";
  const user = process.env.SMTP_USER ?? "h2zirvesi@tespam.org";
  const pass = process.env.SMTP_PASS;

  if (!pass) {
    // Kaydın kendisi başarılı; onay maili gönderilemese de akış bozulmasın.
    console.warn("SMTP şifresi tanımlı değil, onay maili gönderilmedi.");
    return NextResponse.json({ ok: false, sent: false }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Türkiye Hidrojen Zirvesi 2026" <${user}>`,
      to: email,
      replyTo: user,
      subject: kayitOnaySubject,
      text: kayitOnayText,
      html: kayitOnayHtml,
    });

    return NextResponse.json({ ok: true, sent: true });
  } catch (error) {
    console.error("Kayıt onay maili gönderilemedi", error);
    return NextResponse.json({ ok: false, sent: false }, { status: 500 });
  }
}
