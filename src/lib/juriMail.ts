import { mailFromAddress, mailReplyTo } from "@/lib/mailer";

/**
 * Jüri bildirimleri için tek seferlik mail (hacim düşük: jüri başına en fazla birkaç mail).
 * Hosting SMTP'si toplu/dış gönderime uygun olmadığından Resend HTTP API'si kullanılır.
 */
export async function sendJuriMail(opts: { to: string; subject: string; text: string }) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn("RESEND_API_KEY tanımlı değil, jüri maili gönderilmedi.");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `Türkiye Hidrojen Zirvesi 2026 <${mailFromAddress()}>`,
        to: [opts.to],
        reply_to: mailReplyTo(),
        subject: opts.subject,
        text: opts.text,
      }),
    });

    if (!response.ok) {
      console.error("Jüri maili gönderilemedi", response.status, await response.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (error) {
    console.error("Jüri maili gönderilemedi", error);
    return false;
  }
}
