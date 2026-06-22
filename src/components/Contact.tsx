"use client";

import { useState } from "react";

const info = [
  {
    icon: "🏛️",
    label: "Organizasyon",
    value:
      "TESPAM — Türkiye Enerji Stratejileri & Politikaları Araştırma Merkezi",
  },
  {
    icon: "🏫",
    label: "Ev Sahibi Kurum",
    value: "Ankara Yıldırım Beyazıt Üniversitesi — Hidrojen Araştırma Merkezi",
  },
  { icon: "📍", label: "Yer", value: "Ankara, Türkiye" },
  { icon: "📅", label: "Tarih", value: "22–23 Ekim 2026" },
  { icon: "📧", label: "E-posta", value: "h2zirvesi@tespam.org" },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const inputCls =
    "w-full bg-h2-surface-2 border border-h2-border focus:border-h2-blue rounded-h2-md px-4 py-3 text-h2-ink-1 placeholder-h2-ink-disabled outline-none transition-colors text-h2-small";

  return (
    <section id="contact" className="bg-h2-surface-1 py-16 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-cyan">
            Bize Ulaşın
          </span>
          <h2 className="font-display text-h2-h1 font-bold text-h2-ink-1 mt-3">
            İletişim
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
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
                rows={5}
                placeholder="Mesajınızı buraya yazın..."
                className={`${inputCls} resize-none`}
              />
            </div>

            <button
              type="submit"
              className={`w-full py-4 rounded-h2-md font-semibold text-base transition-all ${
                sent
                  ? "bg-h2-green text-white"
                  : "bg-h2-blue hover:bg-h2-blue-bright text-white hover:shadow-md hover:shadow-h2-blue/20"
              }`}
            >
              {sent ? "Mesajınız İletildi ✓" : "Gönder"}
            </button>
          </form>

          {/* Info */}
          <div className="space-y-5">
            <div className="rounded-h2-lg border border-h2-border bg-h2-surface-2 p-7">
              <h3 className="font-display text-h2-h3 font-semibold text-h2-ink-1 mb-6">
                İletişim Bilgileri
              </h3>
              <div className="space-y-5">
                {info.map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className="text-xl mt-0.5 flex-shrink-0" aria-hidden="true">
                      {icon}
                    </span>
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
                {["LinkedIn", "X (Twitter)", "Instagram"].map((p) => (
                  <a
                    key={p}
                    href="#"
                    className="bg-white/5 hover:bg-h2-blue/20 border border-white/8 hover:border-h2-blue/35 rounded-h2-md px-4 py-2.5 text-h2-ink-2 hover:text-h2-ink-1 text-h2-small font-medium transition-all"
                  >
                    {p}
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
