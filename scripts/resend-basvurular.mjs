#!/usr/bin/env node
/**
 * Dün 14:52 - bugün 07:10 arası (veya --since/--until ile verilen aralıkta)
 * SMTP kesintisi nedeniyle bildirimi gitmemiş olabilecek başvuruları
 * Supabase'den bulup elle yeniden tetikler.
 *
 * Kullanım:
 *   node scripts/resend-basvurular.mjs missed --since 2026-09-19T14:52:00+03:00 --until 2026-09-20T07:10:00+03:00
 *   node scripts/resend-basvurular.mjs missed --send        # yukarıdaki varsayılan aralıkla, gerçekten gönderir
 *   node scripts/resend-basvurular.mjs whatsapp-marketing --to a@b.com,c@d.com --send
 *
 * --send verilmezse hiçbir mail atılmaz, yalnızca bulunanlar listelenir (dry-run).
 *
 * Gerekli ortam değişkenleri:
 *   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *   Gönderim için ikisinden biri:
 *     RESEND_API_KEY                (varsa Resend HTTP API kullanılır)
 *     SMTP_HOST/SMTP_PORT/SMTP_SECURE/SMTP_USER/SMTP_PASS  (yoksa nodemailer/SMTP)
 *   MAIL_FROM, MAIL_REPLY_TO, APPLICATION_NOTIFY_TO (opsiyonel, .env.example'daki gibi)
 */

const DEFAULT_SINCE = "2026-09-19T14:52:00+03:00";
const DEFAULT_UNTIL = "2026-09-20T07:10:00+03:00";

const args = process.argv.slice(2);
const command = args[0];
const flags = {};
for (let i = 1; i < args.length; i++) {
  if (args[i].startsWith("--")) {
    const key = args[i].slice(2);
    const value = args[i + 1] && !args[i + 1].startsWith("--") ? args[++i] : "true";
    flags[key] = value;
  }
}
const SEND = flags.send === "true";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Eksik ortam değişkeni: ${name}`);
    process.exit(1);
  }
  return value;
}

function mailFromAddress() {
  const fromEnv = process.env.MAIL_FROM?.trim();
  if (fromEnv) return fromEnv;
  const smtpUser = process.env.SMTP_USER?.trim();
  return smtpUser?.includes("@") ? smtpUser : "h2zirvesi@tespam.org";
}

function mailFrom(displayName) {
  return `${displayName} <${mailFromAddress()}>`;
}

function mailReplyTo() {
  return process.env.MAIL_REPLY_TO?.trim() || mailFromAddress();
}

async function sendMail({ to, subject, text, html, replyTo }) {
  if (!SEND) {
    console.log(`  [dry-run] -> ${to} : ${subject}`);
    return;
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();

  if (resendKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: mailFrom("Türkiye Hidrojen Zirvesi 2026"),
        to: [to],
        reply_to: replyTo,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error(`Resend hata: ${response.status} ${body.slice(0, 300)}`);
    }

    console.log(`  [gönderildi/resend] -> ${to} : ${subject}`);
    return;
  }

  const { default: nodemailer } = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "mt-spring.panel-giris.com",
    port: Number(process.env.SMTP_PORT ?? "465"),
    secure: (process.env.SMTP_SECURE ?? "true") === "true",
    auth: {
      user: process.env.SMTP_USER ?? "h2zirvesi@tespam.org",
      pass: requireEnv("SMTP_PASS"),
    },
  });

  await transporter.sendMail({
    from: mailFrom("Türkiye Hidrojen Zirvesi 2026"),
    to,
    replyTo,
    subject,
    text,
    html,
  });

  console.log(`  [gönderildi/smtp] -> ${to} : ${subject}`);
}

// backup-submission/route.ts ile aynı format
function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatValue(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (value == null || value === "") return "-";
  return String(value);
}

function renderRows(payload) {
  return Object.entries(payload)
    .map(([key, value]) => `<tr><td>${escapeHtml(key)}</td><td>${escapeHtml(formatValue(value))}</td></tr>`)
    .join("");
}

function renderText(payload) {
  return Object.entries(payload)
    .map(([key, value]) => `${key}: ${formatValue(value)}`)
    .join("\n");
}

const kayitOnaySubject = "Türkiye Hidrojen Zirvesi 2026 | Kaydınız alındı";
const SITE_URL = "https://www.hidrojenzirvesi.com";
const WHATSAPP_URL = "https://whatsapp.com/channel/0029VbDtjhnInlqIHuZUOp2H";

async function missedCommand(supabase) {
  const since = flags.since ?? DEFAULT_SINCE;
  const until = flags.until ?? DEFAULT_UNTIL;

  console.log(`Aralık: ${since} -> ${until}`);
  console.log(SEND ? "MOD: gerçekten gönderilecek (--send)" : "MOD: dry-run (yalnızca listeleme, göndermek için --send ekleyin)");
  console.log("");

  // 1) Katılımcı kayıtları -> katılımcıya onay maili
  {
    const { data, error } = await supabase
      .from("katilimci_kayitlari")
      .select("id, created_at, ad_soyad, email")
      .gte("created_at", since)
      .lte("created_at", until)
      .order("created_at", { ascending: true });

    if (error) throw error;

    console.log(`katilimci_kayitlari: ${data.length} kayıt`);
    for (const row of data) {
      console.log(`  - ${row.created_at}  ${row.ad_soyad} <${row.email}>`);
      try {
        await sendMail({
          to: row.email,
          replyTo: mailReplyTo(),
          subject: kayitOnaySubject,
          text: `Kaydınız alınmıştır. WhatsApp kanalı: ${WHATSAPP_URL}\nProgram: ${SITE_URL}`,
          html: `<p>Kaydınız alınmıştır.</p><p><a href="${WHATSAPP_URL}">WhatsApp Kanalına Katılın</a></p><p><a href="${SITE_URL}">${SITE_URL}</a></p>`,
        });
      } catch (err) {
        console.error(`    HATA: ${err.message}`);
      }
    }
  }

  // 2) Poster / stand / sponsorluk başvuruları -> admin bildirimi
  const adminTo =
    process.env.APPLICATION_NOTIFY_TO ?? process.env.CONTACT_TO ?? "h2zirvesi@tespam.org";

  const applicationTables = [
    { table: "poster_basvurulari", label: "Poster Özeti Başvurusu" },
    { table: "stand_basvurulari", label: "Stand Başvurusu" },
    { table: "sponsorluk_basvurulari", label: "Sponsorluk Başvurusu" },
  ];

  for (const { table, label } of applicationTables) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .gte("created_at", since)
      .lte("created_at", until)
      .order("created_at", { ascending: true });

    if (error) throw error;

    console.log(`${table}: ${data.length} kayıt`);
    for (const row of data) {
      console.log(`  - ${row.created_at}  ${row.yetkili_kisi ?? row.ad_soyad ?? "?"} <${row.email}>`);
      try {
        await sendMail({
          to: adminTo,
          replyTo: row.email,
          subject: `Yeni ${label} (elle yeniden tetiklendi)`,
          text: renderText(row),
          html: `<div><h2>Yeni ${escapeHtml(label)}</h2><table>${renderRows(row)}</table></div>`,
        });
      } catch (err) {
        console.error(`    HATA: ${err.message}`);
      }
    }
  }

  // 3) İletişim mesajları -> mail_gonderildi = false olanlar (tarih aralığından bağımsız)
  {
    const { data, error } = await supabase
      .from("iletisim_mesajlari")
      .select("*")
      .eq("mail_gonderildi", false)
      .order("created_at", { ascending: true });

    if (error) throw error;

    console.log(`iletisim_mesajlari (mail_gonderildi=false): ${data.length} kayıt`);
    for (const row of data) {
      console.log(`  - ${row.created_at}  ${row.ad_soyad} <${row.email}>`);
      try {
        await sendMail({
          to: adminTo,
          replyTo: row.email,
          subject: "Yeni İletişim Mesajı (elle yeniden tetiklendi)",
          text: renderText(row),
          html: `<div><h2>Yeni İletişim Mesajı</h2><table>${renderRows(row)}</table></div>`,
        });

        if (SEND) {
          const { error: updateError } = await supabase
            .from("iletisim_mesajlari")
            .update({ mail_gonderildi: true })
            .eq("id", row.id);

          if (updateError) {
            console.error(`    mail_gonderildi güncellenemedi: ${updateError.message}`);
          }
        }
      } catch (err) {
        console.error(`    HATA: ${err.message}`);
      }
    }
  }
}

async function whatsappMarketingCommand() {
  const to = (flags.to ?? "turkesdedeci@icloud.com,turkesdedeci@gmail.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  console.log(SEND ? "MOD: gerçekten gönderilecek (--send)" : "MOD: dry-run (yalnızca listeleme, göndermek için --send ekleyin)");
  console.log(`Alıcılar: ${to.join(", ")}`);

  const subject = "Türkiye Hidrojen Zirvesi 2026 | WhatsApp Duyuru Kanalı";
  const text = `Türkiye Hidrojen Zirvesi 2026 duyuru kanalımız yayında.\n\nKanala katılmak için: ${WHATSAPP_URL}\n\nKesinleşen program, konuşmacı duyuruları ve zirve günü bilgilendirmeleri bu kanaldan paylaşılacaktır.\n\n${SITE_URL}`;
  const html = `<!DOCTYPE html><html lang="tr"><body style="margin:0;padding:0;background:#06091A;font-family:Arial,sans-serif;">
<table role="presentation" width="100%" style="background:#06091A;padding:36px 16px;"><tr><td align="center">
<table role="presentation" width="600" style="background:#0A0F24;border:1px solid #1A2845;border-radius:12px;">
<tr><td style="padding:32px 36px;color:#F2F5FA;">
<h2 style="color:#F2F5FA;">Türkiye Hidrojen Zirvesi 2026</h2>
<p style="color:#B7C2D6;">WhatsApp duyuru kanalımız yayında. Kesinleşen program, konuşmacı duyuruları ve zirve günü bilgilendirmeleri bu kanaldan paylaşılacaktır.</p>
<p><a href="${WHATSAPP_URL}" style="display:inline-block;background:#0066CC;color:#fff;padding:14px 28px;border-radius:6px;text-decoration:none;font-weight:bold;">Kanala Katıl</a></p>
<p style="color:#7A8BA8;font-size:13px;"><a href="${SITE_URL}" style="color:#00C8FF;">${SITE_URL}</a></p>
</td></tr></table></td></tr></table></body></html>`;

  for (const recipient of to) {
    try {
      await sendMail({ to: recipient, subject, text, html, replyTo: mailReplyTo() });
    } catch (err) {
      console.error(`  HATA (${recipient}): ${err.message}`);
    }
  }
}

async function main() {
  if (command === "missed") {
    const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
    const serviceKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, serviceKey);
    await missedCommand(supabase);
    return;
  }

  if (command === "whatsapp-marketing") {
    await whatsappMarketingCommand();
    return;
  }

  console.log("Kullanım:");
  console.log("  node scripts/resend-basvurular.mjs missed [--since ISO] [--until ISO] [--send]");
  console.log("  node scripts/resend-basvurular.mjs whatsapp-marketing [--to a@b.com,c@d.com] [--send]");
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
