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
  { icon: "📅", label: "Tarih", value: "15–16 Ekim 2026" },
  { icon: "📧", label: "E-posta", value: "info@tespam.org.tr" },
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
    "w-full bg-[#0D1530] border border-[#1A2845] focus:border-[#0066CC] rounded-xl px-4 py-3 text-white placeholder-slate-700 outline-none transition-colors text-sm";

  return (
    <section id="contact" className="bg-[#060B18] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-[#00C8FF] font-semibold text-sm uppercase tracking-widest">
            Bize Ulaşın
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3">
            İletişim
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
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
                <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
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
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Konu
              </label>
              <select
                value={form.subject}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value })
                }
                className={inputCls}
              >
                <option value="" className="bg-[#0D1530]">
                  Konu seçin...
                </option>
                <option value="kayit" className="bg-[#0D1530]">
                  Kayıt Bilgisi
                </option>
                <option value="bildiri" className="bg-[#0D1530]">
                  Bildiri Gönderimi
                </option>
                <option value="sponsor" className="bg-[#0D1530]">
                  Sponsorluk
                </option>
                <option value="konusma" className="bg-[#0D1530]">
                  Konuşmacı Daveti
                </option>
                <option value="diger" className="bg-[#0D1530]">
                  Diğer
                </option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
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
              className={`w-full py-4 rounded-xl font-semibold text-base transition-all ${
                sent
                  ? "bg-[#00D084] text-white"
                  : "bg-[#0066CC] hover:bg-[#0055bb] text-white hover:shadow-lg hover:shadow-[#0066CC]/20"
              }`}
            >
              {sent ? "Mesajınız İletildi ✓" : "Gönder"}
            </button>
          </form>

          {/* Info */}
          <div className="space-y-5">
            <div className="bg-[#0D1530] border border-[#1A2845] rounded-2xl p-7">
              <h3 className="text-white font-bold text-xl mb-6">
                İletişim Bilgileri
              </h3>
              <div className="space-y-5">
                {info.map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className="text-xl mt-0.5 flex-shrink-0">{icon}</span>
                    <div>
                      <p className="text-slate-600 text-xs font-semibold uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-slate-300 text-sm mt-1">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0D1530] border border-[#1A2845] rounded-2xl p-7">
              <h3 className="text-white font-bold text-lg mb-4">
                Sosyal Medya
              </h3>
              <div className="flex flex-wrap gap-3">
                {["LinkedIn", "X (Twitter)", "Instagram"].map((p) => (
                  <a
                    key={p}
                    href="#"
                    className="bg-white/5 hover:bg-[#0066CC]/20 border border-white/8 hover:border-[#0066CC]/35 rounded-xl px-4 py-2.5 text-slate-400 hover:text-white text-sm font-medium transition-all"
                  >
                    {p}
                  </a>
                ))}
              </div>
              <p className="text-slate-600 text-xs mt-4">
                #TESPAMH2 &nbsp;#Hidrojen &nbsp;#EnerjiDönüşümü
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
