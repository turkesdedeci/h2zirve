import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const allowedTypes = new Set(["poster", "stand", "sponsorluk", "kayit"]);

const typeLabels: Record<string, string> = {
  poster: "Poster Özeti Başvurusu",
  stand: "Stand Başvurusu",
  sponsorluk: "Sponsorluk Başvurusu",
  kayit: "Katılımcı Kaydı",
};

type BackupPayload = {
  type?: unknown;
  payload?: unknown;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (value == null || value === "") {
    return "-";
  }

  return String(value);
}

function formatLabel(key: string) {
  const labels: Record<string, string> = {
    ad_soyad: "Ad Soyad",
    butce_araligi: "Bütçe Aralığı",
    email: "E-posta",
    firma_adi: "Firma Adı",
    gorunurluk_beklentisi: "Görünürlük Beklentisi",
    katkisi: "Öne Çıkan Katkı",
    katilim_gunu: "Katılım Günü",
    katilimci_tipi: "Katılımcı Tipi",
    konu_basligi: "Çalışma Alanı",
    kurum: "Kurum / Şirket",
    kvkk_onayi: "KVKK / İletişim Onayı",
    notlar: "Notlar",
    ozet: "Özet",
    ozel_ihtiyaclar: "Özel İhtiyaçlar",
    pdf_url: "PDF URL",
    poster_basligi: "Poster Başlığı",
    prototip: "Prototip / Ürün Sergileme",
    prototip_aciklama: "Prototip Açıklama",
    segment: "Segment",
    sergi_ihtiyaclari: "Sergi İhtiyaçları",
    sektor: "Sektör",
    sponsor_tipi: "Sponsorluk Tipi",
    stand_ihtiyaci: "Stand İhtiyacı",
    telefon: "Telefon",
    trl: "TRL",
    urun_aciklamasi: "Ürün Açıklaması",
    web_sitesi: "Web Sitesi",
    yazarlar: "Yazarlar",
    yetkili_kisi: "Yetkili Kişi",
  };

  return labels[key] ?? key;
}

function renderRows(payload: Record<string, unknown>) {
  return Object.entries(payload)
    .map(([key, value]) => {
      const formattedValue = formatValue(value);

      if (key.endsWith("_url") && formattedValue !== "-") {
        return `<tr><td>${escapeHtml(formatLabel(key))}</td><td><a href="${escapeHtml(formattedValue)}">${escapeHtml(formattedValue)}</a></td></tr>`;
      }

      return `<tr><td>${escapeHtml(formatLabel(key))}</td><td>${escapeHtml(formattedValue)}</td></tr>`;
    })
    .join("");
}

function renderText(payload: Record<string, unknown>) {
  return Object.entries(payload)
    .map(([key, value]) => `${formatLabel(key)}: ${formatValue(value)}`)
    .join("\n");
}

async function backupToGoogleSheets(type: string, payload: Record<string, unknown>) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const webhookSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

  if (!webhookUrl) {
    console.warn("Google Sheets backup skipped: GOOGLE_SHEETS_WEBHOOK_URL is not set.");
    return { ok: false, skipped: true };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "h2zirve",
        type,
        secret: webhookSecret,
        submittedAt: new Date().toISOString(),
        payload,
      }),
      signal: controller.signal,
    });

    const text = await response.text().catch(() => "");

    if (!response.ok) {
      console.error("Google Sheets backup failed", {
        status: response.status,
        statusText: response.statusText,
        body: text.slice(0, 500),
      });

      return { ok: false };
    }

    try {
      const result = JSON.parse(text) as { ok?: unknown; error?: unknown };

      if (result.ok !== true) {
        console.error("Google Sheets backup returned an error", {
          error: result.error,
          body: text.slice(0, 500),
        });

        return { ok: false };
      }
    } catch {
      console.error("Google Sheets backup returned invalid JSON", {
        body: text.slice(0, 500),
      });

      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    console.error("Google Sheets backup request failed", error);
    return { ok: false };
  } finally {
    clearTimeout(timeout);
  }
}

async function sendNotificationEmail(type: string, payload: Record<string, unknown>) {
  const host = process.env.SMTP_HOST ?? "mt-spring.panel-giris.com";
  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure = (process.env.SMTP_SECURE ?? "true") === "true";
  const user = process.env.SMTP_USER ?? "h2zirvesi@tespam.org";
  const pass = process.env.SMTP_PASS;
  const to =
    process.env.APPLICATION_NOTIFY_TO ??
    process.env.CONTACT_TO ??
    "h2zirvesi@tespam.org";

  if (!pass) {
    console.warn("Application notification skipped: SMTP_PASS is not set.");
    return { ok: false, skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const label = typeLabels[type] ?? "Başvuru";
  const applicantEmail =
    typeof payload.email === "string" && payload.email.includes("@")
      ? payload.email
      : undefined;

  try {
    await transporter.sendMail({
      from: `"Türkiye Hidrojen Zirvesi" <${user}>`,
      to,
      replyTo: applicantEmail,
      subject: `Yeni ${label}`,
      text: [
        `Türkiye Hidrojen Zirvesi web sitesinden yeni ${label.toLowerCase()} alındı.`,
        "",
        renderText(payload),
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111827">
          <h2>Yeni ${escapeHtml(label)}</h2>
          <p>Türkiye Hidrojen Zirvesi web sitesinden yeni başvuru alındı.</p>
          <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:760px">
            <tbody>
              ${renderRows(payload)}
            </tbody>
          </table>
        </div>
      `,
    });

    return { ok: true };
  } catch (error) {
    console.error("Application notification email failed", error);
    return { ok: false };
  }
}

export async function POST(request: Request) {
  let body: BackupPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz yedekleme verisi." }, { status: 400 });
  }

  const type = typeof body.type === "string" ? body.type : "";

  if (!allowedTypes.has(type) || typeof body.payload !== "object" || body.payload === null) {
    return NextResponse.json({ error: "Eksik veya hatalı yedekleme verisi." }, { status: 400 });
  }

  const payload = body.payload as Record<string, unknown>;
  const [googleSheets, email] = await Promise.all([
    backupToGoogleSheets(type, payload),
    sendNotificationEmail(type, payload),
  ]);

  return NextResponse.json({
    ok: googleSheets.ok || email.ok,
    googleSheets,
    email,
  });
}
