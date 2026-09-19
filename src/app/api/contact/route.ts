import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { mailFrom } from "@/lib/mailer";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const subjectLabels: Record<string, string> = {
  kayit: "Kayıt Bilgisi",
  bildiri: "Bildiri Gönderimi",
  sponsor: "Sponsorluk",
  konusma: "Konuşmacı Daveti",
  diger: "Diğer",
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Mesajı Supabase'e yazar. İletişim formunun tek çıktısı e-posta olduğu için,
 * mail gönderilemediğinde mesaj tamamen kayboluyordu; bu kayıt onu önler.
 * Yazma başarısız olursa akışı durdurmaz, false döner.
 */
async function mesajiKaydet(
  mesaj: {
    ad_soyad: string;
    email: string;
    konu: string;
    mesaj: string;
  },
  mailGonderildi: boolean
) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.warn("Supabase ayarları eksik, iletişim mesajı kaydedilemedi.");
    return false;
  }

  try {
    const response = await fetch(`${url}/rest/v1/iletisim_mesajlari`, {
      method: "POST",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ ...mesaj, mail_gonderildi: mailGonderildi }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "İletişim mesajı kaydedilemedi",
        response.status,
        await response.text()
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("İletişim mesajı kaydedilemedi", error);
    return false;
  }
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Geçersiz form verisi." },
      { status: 400 }
    );
  }

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 160);
  const subjectKey = clean(payload.subject, 40);
  const message = clean(payload.message, 4000);
  const subject = subjectLabels[subjectKey] ?? "İletişim Formu";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Lütfen zorunlu alanları doldurun." },
      { status: 400 }
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Geçerli bir e-posta adresi girin." },
      { status: 400 }
    );
  }

  const host = process.env.SMTP_HOST ?? "mt-spring.panel-giris.com";
  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = (process.env.SMTP_SECURE ?? "true") === "true";
  const user = process.env.SMTP_USER ?? "h2zirvesi@tespam.org";
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO ?? "h2zirvesi@tespam.org";

  const mesaj = { ad_soyad: name, email, konu: subject, mesaj: message };

  if (!pass) {
    const kaydedildi = await mesajiKaydet(mesaj, false);

    return kaydedildi
      ? NextResponse.json({ ok: true, mailSent: false })
      : NextResponse.json(
          {
            error:
              "Mesaj gönderilemedi. Lütfen tekrar deneyin veya h2zirvesi@tespam.org adresine e-posta gönderin.",
          },
          { status: 503 }
        );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    // Mail sunucusu yanıt vermezse istek asılı kalmasın; mesajı veritabanına
    // yazabilmek için zamanında hataya düşmesi gerekiyor.
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  try {
    await transporter.sendMail({
      from: mailFrom("Türkiye Hidrojen Zirvesi"),
      to,
      replyTo: email,
      subject: `İletişim Formu: ${subject}`,
      text: [
        "Türkiye Hidrojen Zirvesi web sitesinden yeni mesaj geldi.",
        "",
        `Ad Soyad: ${name}`,
        `E-posta: ${email}`,
        `Konu: ${subject}`,
        "",
        "Mesaj:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111827">
          <h2>Türkiye Hidrojen Zirvesi iletişim formu</h2>
          <p><strong>Ad Soyad:</strong> ${escapeHtml(name)}</p>
          <p><strong>E-posta:</strong> ${escapeHtml(email)}</p>
          <p><strong>Konu:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Mesaj:</strong></p>
          <p style="white-space:pre-line">${escapeHtml(message)}</p>
        </div>
      `,
    });

    await mesajiKaydet(mesaj, true);

    return NextResponse.json({ ok: true, mailSent: true });
  } catch (error) {
    console.error("Contact mail send failed", error);

    // Güvenlik sibobu: mail gidemedi, mesaj kaybolmasın.
    const kaydedildi = await mesajiKaydet(mesaj, false);

    if (kaydedildi) {
      return NextResponse.json({ ok: true, mailSent: false });
    }

    return NextResponse.json(
      {
        error:
          "Mesaj gönderilemedi. Lütfen tekrar deneyin veya h2zirvesi@tespam.org adresine e-posta gönderin.",
      },
      { status: 500 }
    );
  }
}
