"use client";

import { useState } from "react";

const info = [
  {
    label: "Organizasyon",
    value:
      "TESPAM - Türkiye Enerji Stratejileri & Politikaları Araştırma Merkezi",
  },
  {
    label: "Ev Sahibi Kurum",
    value:
      "Ankara Yıldırım Beyazıt Üniversitesi - Hidrojen Araştırma Merkezi",
  },
  { label: "Yer", value: "Ankara, Türkiye" },
  { label: "Tarih", value: "22-23 Ekim 2026" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/showcase/t%C3%BCrkiye-hidrojen-zirvesi",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/h2zirvesi/",
  },
];

const emptyForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Mesaj gönderilemedi.");
      }

      setStatus("success");
      setFeedback("Mesajınız alındı. Ekibimiz en kısa sürede dönüş yapacaktır.");
      setForm(emptyForm);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Mesaj gönderilemedi. Lütfen tekrar deneyin."
      );
    }
  };

  const inputCls =
    "w-full rounded-h2-sm border border-h2-border bg-h2-bg/60 px-4 py-3.5 text-base text-h2-ink-1 placeholder:text-h2-ink-3 transition-colors hover:border-h2-ink-3/60 focus-visible:border-h2-cyan disabled:opacity-60";
  const labelCls = "mb-2 block text-sm font-medium text-h2-ink-2";
  const isSending = status === "sending";

  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-h2-border bg-h2-bg py-16 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <span className="text-sm font-medium text-h2-cyan">İletişim</span>
            <h2 id="contact-heading" className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-h2-ink-1 sm:text-5xl">
              Zirve ekibine<br />ulaşın.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-h2-ink-2">
              Katılım, bildiriler ve iş birliğiyle ilgili sorularınızı organizasyon ekibimize iletebilirsiniz.
            </p>

            <a
              href="mailto:h2zirvesi@tespam.org"
              className="mt-8 inline-flex max-w-full items-center gap-3 border-b border-h2-cyan/40 pb-2 text-xl font-medium tracking-tight text-h2-ink-1 transition-colors hover:border-h2-cyan hover:text-h2-cyan sm:text-2xl"
            >
              <span className="break-all">h2zirvesi@tespam.org</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 shrink-0">
                <path d="M5 19 19 5M5 5h14v14" />
              </svg>
            </a>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 border-t border-h2-border">
              {info.map(({ label, value }, index) => (
                <div key={label} className={`border-b border-h2-border py-5 ${index < 2 ? "col-span-2" : ""}`}>
                  <dt className="text-sm text-h2-ink-3">{label}</dt>
                  <dd className="mt-2 max-w-md text-base leading-relaxed text-h2-ink-2">{value}</dd>
                </div>
              ))}
            </dl>

            <nav aria-label="Zirvenin sosyal medya hesapları" className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-h2-ink-2 transition-colors hover:text-h2-cyan"
                >
                  {link.label}<span aria-hidden="true">↗</span>
                  <span className="sr-only"> (yeni sekmede açılır)</span>
                </a>
              ))}
            </nav>
          </div>

          <form onSubmit={handleSubmit} aria-labelledby="contact-form-heading" aria-busy={isSending} className="min-w-0 space-y-6 rounded-h2-lg border border-h2-border bg-h2-surface-1 p-6 sm:p-9">
            <div className="border-b border-h2-border pb-6">
              <h3 id="contact-form-heading" className="font-display text-2xl font-semibold tracking-tight text-h2-ink-1">Mesajınızı bırakın</h3>
              <p className="mt-2 text-sm leading-relaxed text-h2-ink-2">Konu dışındaki tüm alanlar zorunludur.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className={labelCls}
                >
                  Ad Soyad
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  disabled={isSending}
                  placeholder="Adınız ve soyadınız"
                  className={inputCls}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className={labelCls}
                >
                  E-posta
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  spellCheck={false}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  disabled={isSending}
                  placeholder="ornek@kurum.com"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className={labelCls}
              >
                Konu <span className="font-normal text-h2-ink-3">(isteğe bağlı)</span>
              </label>
              <select
                id="contact-subject"
                name="subject"
                autoComplete="off"
                value={form.subject}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value })
                }
                disabled={isSending}
                className={inputCls}
              >
                <option value="" className="bg-h2-surface-2">
                  Konu seçin…
                </option>
                <option value="kayit" className="bg-h2-surface-2">
                  Kayıt Bilgisi
                </option>
                <option value="bildiri" className="bg-h2-surface-2">
                  Bildiri Gönderimi
                </option>
                <option value="sponsor" className="bg-h2-surface-2">
                  Sponsorluk
                </option>
                <option value="konusma" className="bg-h2-surface-2">
                  Konuşmacı Daveti
                </option>
                <option value="diger" className="bg-h2-surface-2">
                  Diğer
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className={labelCls}
              >
                Mesaj
              </label>
              <textarea
                id="contact-message"
                name="message"
                autoComplete="off"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                required
                disabled={isSending}
                rows={6}
                placeholder="Size nasıl yardımcı olabiliriz?"
                className={`${inputCls} min-h-40 resize-y`}
              />
            </div>

            {feedback && (
              <p
                aria-live="polite"
                role="status"
                className={`rounded-h2-md border px-4 py-3 text-h2-small ${
                  status === "success"
                    ? "border-h2-green/30 bg-h2-green/10 text-h2-green"
                    : "border-red-500/30 bg-red-500/10 text-red-200"
                }`}
              >
                {feedback}
              </p>
            )}

            <button
              type="submit"
              disabled={isSending}
              className={`flex w-full items-center justify-between gap-4 rounded-h2-sm px-5 py-4 text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
                status === "success"
                  ? "bg-h2-green text-white"
                  : "bg-h2-blue hover:bg-h2-blue-bright text-white"
              }`}
            >
              {isSending
                ? "Gönderiliyor…"
                : status === "success"
                  ? "Mesajınız İletildi"
                  : "Mesajı gönder"}
              <span aria-hidden="true">{status === "success" ? "✓" : "→"}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
