const FALLBACK_ADDRESS = "h2zirvesi@tespam.org";

/**
 * Gönderen adresi SMTP kullanıcı adından ayrı tutulur: Resend, Brevo gibi
 * relay servislerinde SMTP kullanıcı adı bir e-posta adresi değildir
 * (Resend'de "resend", Brevo'da hesap numarasıdır). Adres MAIL_FROM ile
 * verilir; tanımlı değilse SMTP_USER'a, o da yoksa sabit adrese düşülür.
 */
export function mailFromAddress() {
  const fromEnv = process.env.MAIL_FROM?.trim();

  if (fromEnv) {
    return fromEnv;
  }

  const smtpUser = process.env.SMTP_USER?.trim();

  return smtpUser?.includes("@") ? smtpUser : FALLBACK_ADDRESS;
}

export function mailFrom(displayName: string) {
  return `"${displayName}" <${mailFromAddress()}>`;
}

/**
 * Yanıtların düşeceği kutu. Relay üzerinden gönderirken gönderen adresi
 * doğrulanmış alan adında olmak zorunda olduğundan, yanıtlar için ayrı bir
 * adres gerekebilir.
 */
export function mailReplyTo() {
  return process.env.MAIL_REPLY_TO?.trim() || mailFromAddress();
}
