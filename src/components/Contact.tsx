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
  { label: "E-posta", value: "h2zirvesi@tespam.org" },
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
    "w-full bg-h2-surface-2 border border-h2-border focus:border-h2-blue rounded-h2-md px-4 py-3 text-h2-ink-1 placeholder-h2-ink-disabled outline-none transition-colors text-h2-small";
  const isSending = status === "sending";

  return (
    <section id="contact" className="bg-h2-surface-1 py-16 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-cyan">
            Bize Ulaşın
          </span>
          <h2 className="font-display text-h2-h1 font-bold text-h2-ink-1 mt-3">
            İletişim
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-h2-ink-3 text-h2-micro font-semibold uppercase tracking-wider mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  disabled={isSending}
                  placeholder="Adınız Soyadınız"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block text-h2-ink-3 text-h2-micro font-semibold uppercase tracking-wider mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  disabled={isSending}
                  placeholder="ornek@email.com"
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label className="block text-h2-ink-3 text-h2-micro font-semibold uppercase tracking-wider mb-2">
                Konu
              </label>
              <select
                value={form.subject}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value })
                }
                disabled={isSending}
                className={inputCls}
              >
                <option value="" className="bg-h2-surface-2">
                  Konu seçin...
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
              <label className="block text-h2-ink-3 text-h2-micro font-semibold uppercase tracking-wider mb-2">
                Mesaj
              </label>
              <textarea
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                required
                disabled={isSending}
                rows={5}
                placeholder="Mesajınızı buraya yazın..."
                className={`${inputCls} resize-none`}
              />
            </div>

            {feedback && (
              <p
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
              className={`w-full py-4 rounded-h2-md font-semibold text-base transition-all ${
                status === "success"
                  ? "bg-h2-green text-white"
                  : "bg-h2-blue hover:bg-h2-blue-bright text-white hover:shadow-md hover:shadow-h2-blue/20 disabled:cursor-not-allowed disabled:opacity-70"
              }`}
            >
              {isSending
                ? "Gönderiliyor..."
                : status === "success"
                  ? "Mesajınız İletildi"
                  : "Gönder"}
            </button>
          </form>

          <div className="space-y-5">
            <div className="rounded-h2-lg border border-h2-border bg-h2-surface-2 p-7">
              <h3 className="font-display text-h2-h3 font-semibold text-h2-ink-1 mb-6">
                İletişim Bilgileri
              </h3>
              <div className="space-y-5">
                {info.map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-h2-cyan" />
                    <div>
                      <p className="text-h2-ink-disabled text-h2-micro font-semibold uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-h2-ink-2 text-h2-small mt-1">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-h2-lg border border-h2-border bg-h2-surface-2 p-7">
              <h3 className="font-display text-h2-h3 font-semibold text-h2-ink-1 mb-4">
                Sosyal Medya
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((p) => (
                  <a
                    key={p.label}
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white/5 hover:bg-h2-blue/20 border border-white/8 hover:border-h2-blue/35 rounded-h2-md px-4 py-2.5 text-h2-ink-2 hover:text-h2-ink-1 text-h2-small font-medium transition-all"
                  >
                    {p.label}
                  </a>
                ))}
              </div>
              <p className="text-h2-ink-disabled text-h2-micro mt-4">
                #TESPAMH2 &nbsp;#Hidrojen &nbsp;#EnerjiDönüşümü
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
