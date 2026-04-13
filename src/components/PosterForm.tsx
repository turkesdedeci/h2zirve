"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const topics = [
  "Hidrojen Üretim Teknolojileri",
  "Elektroliz ve Yenilikçi Üretim Yöntemleri",
  "Depolama ve Taşıma",
  "Yakıt Pilleri",
  "Enerji Sistemlerinde Hidrojen Kullanımı",
  "Ulaşım ve Mobilite",
  "Sanayide Hidrojen Uygulamaları",
  "Güvenlik ve Standartlar",
  "Maliyet Analizi ve Ticarileşme",
  "Finansman, Teşvik ve Yatırım Modelleri",
  "Politika, Mevzuat ve Strateji Geliştirme",
  "Ar-Ge, İnovasyon ve Teknoloji Yönetimi",
  "Savunma ve Sanayi Uygulamaları",
  "Uluslararası İş Birlikleri",
];

interface FormData {
  ad_soyad: string;
  kurum: string;
  email: string;
  telefon: string;
  poster_basligi: string;
  konu_basligi: string;
  ozet: string;
}

const empty: FormData = {
  ad_soyad: "",
  kurum: "",
  email: "",
  telefon: "",
  poster_basligi: "",
  konu_basligi: "",
  ozet: "",
};

export default function PosterForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<FormData>(empty);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: err } = await supabase.from("poster_basvurulari").insert([form]);

    setLoading(false);
    if (err) {
      setError("Bir hata oluştu, lütfen tekrar deneyin.");
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
        <div className="bg-[#0D1530] border border-[#1A2845] rounded-2xl p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-white font-bold text-xl mb-3">Başvurunuz Alındı!</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Poster başvurunuz bilimsel kurulumuza iletildi. Değerlendirme sonucunu{" "}
            <span className="text-white font-semibold">{form.email}</span> adresine göndereceğiz.
          </p>
          <button
            onClick={onClose}
            className="bg-[#00D084] hover:bg-[#00b872] text-white font-semibold px-8 py-3 rounded-xl transition-all"
          >
            Kapat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-8">
      <div className="bg-[#0D1530] border border-[#1A2845] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1A2845]">
          <h2 className="text-white font-bold text-xl">Poster Başvurusu</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors text-2xl leading-none">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Ad Soyad + Kurum */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                Ad Soyad *
              </label>
              <input
                required
                value={form.ad_soyad}
                onChange={set("ad_soyad")}
                placeholder="Ad Soyad"
                className="w-full bg-[#060B18] border border-[#1A2845] focus:border-[#0066CC] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                Kurum / Üniversite *
              </label>
              <input
                required
                value={form.kurum}
                onChange={set("kurum")}
                placeholder="Kurum adı"
                className="w-full bg-[#060B18] border border-[#1A2845] focus:border-[#0066CC] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* E-posta + Telefon */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                E-posta *
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="ornek@kurum.edu.tr"
                className="w-full bg-[#060B18] border border-[#1A2845] focus:border-[#0066CC] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                Telefon
              </label>
              <input
                value={form.telefon}
                onChange={set("telefon")}
                placeholder="05xx xxx xx xx"
                className="w-full bg-[#060B18] border border-[#1A2845] focus:border-[#0066CC] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Poster Başlığı */}
          <div>
            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Poster Başlığı *
            </label>
            <input
              required
              value={form.poster_basligi}
              onChange={set("poster_basligi")}
              placeholder="Posterinizin başlığı"
              className="w-full bg-[#060B18] border border-[#1A2845] focus:border-[#0066CC] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600"
            />
          </div>

          {/* Konu Başlığı */}
          <div>
            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Konu Başlığı *
            </label>
            <select
              required
              value={form.konu_basligi}
              onChange={set("konu_basligi")}
              className="w-full bg-[#060B18] border border-[#1A2845] focus:border-[#0066CC] rounded-xl px-4 py-3 text-sm outline-none transition-colors text-white"
            >
              <option value="" disabled className="text-slate-600">Konu seçin</option>
              {topics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Özet */}
          <div>
            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
              Özet * <span className="normal-case text-slate-600">(max 300 kelime)</span>
            </label>
            <textarea
              required
              value={form.ozet}
              onChange={set("ozet")}
              placeholder="Çalışmanızın kısa özetini yazın..."
              rows={5}
              className="w-full bg-[#060B18] border border-[#1A2845] focus:border-[#0066CC] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600 resize-none"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-transparent border border-[#1A2845] hover:border-slate-500 text-slate-400 hover:text-white font-semibold py-3.5 rounded-xl transition-all"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#00D084] hover:bg-[#00b872] disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all"
            >
              {loading ? "Gönderiliyor..." : "Başvuruyu Gönder"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
