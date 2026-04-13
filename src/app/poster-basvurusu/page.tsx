"use client";

import { useState, useRef } from "react";
import Image from "next/image";
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

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^0\(\d{3}\)\d{7}$/;

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 1) return digits;
  if (digits.length <= 4) return `${digits[0]}(${digits.slice(1)}`;
  if (digits.length <= 11) return `${digits[0]}(${digits.slice(1, 4)})${digits.slice(4)}`;
  return raw;
}

export default function PosterBasvurusu() {
  const [form, setForm] = useState<FormData>(empty);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhone(e.target.value);
    setForm((f) => ({ ...f, telefon: formatted }));
    if (formatted && !PHONE_RE.test(formatted)) {
      setFieldErrors((fe) => ({ ...fe, telefon: "Format: 0(555)5555555" }));
    } else {
      setFieldErrors((fe) => ({ ...fe, telefon: undefined }));
    }
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setForm((f) => ({ ...f, email: val }));
    if (val && !EMAIL_RE.test(val)) {
      setFieldErrors((fe) => ({ ...fe, email: "Geçerli bir e-posta adresi girin" }));
    } else {
      setFieldErrors((fe) => ({ ...fe, email: undefined }));
    }
  }

  function handleAdSoyad(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    // Türkçe dahil sadece harf ve boşluk
    if (/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]*$/.test(val)) {
      setForm((f) => ({ ...f, ad_soyad: val }));
    }
  }

  function handleOzet(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value;
    const wordCount = val.trim() === "" ? 0 : val.trim().split(/\s+/).length;
    if (wordCount <= 300) {
      setForm((f) => ({ ...f, ozet: val }));
    }
  }

  const ozetWordCount = form.ozet.trim() === "" ? 0 : form.ozet.trim().split(/\s+/).length;

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Yalnızca PDF dosyası yükleyebilirsiniz.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Dosya boyutu 10 MB'ı geçemez.");
      return;
    }
    setError("");
    setPdfFile(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(form.email)) {
      setFieldErrors((fe) => ({ ...fe, email: "Geçerli bir e-posta adresi girin" }));
      return;
    }
    if (form.telefon && !PHONE_RE.test(form.telefon)) {
      setFieldErrors((fe) => ({ ...fe, telefon: "Format: 0(555)5555555" }));
      return;
    }
    setLoading(true);
    setError("");

    let pdf_url: string | null = null;

    if (pdfFile) {
      const fileName = `${Date.now()}_${pdfFile.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
      const { error: uploadError } = await supabase.storage
        .from("poster-dosyalari")
        .upload(fileName, pdfFile);

      if (uploadError) {
        setError("PDF yüklenirken hata oluştu: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data } = supabase.storage
        .from("poster-dosyalari")
        .getPublicUrl(fileName);
      pdf_url = data.publicUrl;
    }

    const { error: err } = await supabase
      .from("poster_basvurulari")
      .insert([{ ...form, pdf_url }]);

    setLoading(false);
    if (err) {
      setError("Bir hata oluştu: " + err.message);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#06091A] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-[#00D084]/15 border border-[#00D084]/30 flex items-center justify-center text-4xl mx-auto mb-6">
            ✅
          </div>
          <h2 className="text-white font-bold text-2xl mb-3">Başvurunuz Alındı!</h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            Poster başvurunuz bilimsel kurulumuza iletildi.
            Değerlendirme sonucunu{" "}
            <span className="text-white font-semibold">{form.email}</span>{" "}
            adresine göndereceğiz.
          </p>
          <a
            href="/"
            className="bg-[#00D084] hover:bg-[#00b872] text-white font-semibold px-8 py-3 rounded-xl transition-all inline-block"
          >
            Ana Sayfaya Dön
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06091A]">
      {/* Header */}
      <div className="bg-[#06091A]/95 border-b border-[#1A2845] px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/">
            <Image
              src="/logos/header.png"
              alt="Türkiye Hidrojen Zirvesi 2026"
              width={160}
              height={44}
              className="object-contain"
            />
          </a>
          <a href="/#cfp" className="text-slate-400 hover:text-white text-sm transition-colors">
            ← Geri
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className="mb-10">
          <span className="text-[#00D084] font-semibold text-sm uppercase tracking-widest">
            Akademik Katkı
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-3">
            Poster Başvurusu
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Formu eksiksiz doldurun. Başvurunuz bilimsel kurul tarafından
            değerlendirilecek ve sonuç e-posta ile bildirilecektir.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Kişisel bilgiler */}
          <div className="bg-[#0D1530] border border-[#1A2845] rounded-2xl p-6 space-y-4">
            <h2 className="text-white font-semibold text-base mb-2">Kişisel Bilgiler</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Ad Soyad *</label>
                <input
                  required
                  value={form.ad_soyad}
                  onChange={handleAdSoyad}
                  placeholder="Ad Soyad"
                  className="w-full bg-[#060B18] border border-[#1A2845] focus:border-[#0066CC] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600"
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Kurum / Üniversite *</label>
                <input
                  required
                  value={form.kurum}
                  onChange={set("kurum")}
                  placeholder="Kurum adı"
                  className="w-full bg-[#060B18] border border-[#1A2845] focus:border-[#0066CC] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">E-posta *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={handleEmail}
                  placeholder="ornek@kurum.edu.tr"
                  className={`w-full bg-[#060B18] border rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600 ${fieldErrors.email ? "border-red-500/60" : "border-[#1A2845] focus:border-[#0066CC]"}`}
                />
                {fieldErrors.email && <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>}
              </div>
              <div>
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Telefon</label>
                <input
                  value={form.telefon}
                  onChange={handlePhone}
                  placeholder="0(555)5555555"
                  className={`w-full bg-[#060B18] border rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600 ${fieldErrors.telefon ? "border-red-500/60" : "border-[#1A2845] focus:border-[#0066CC]"}`}
                />
                {fieldErrors.telefon && <p className="text-red-400 text-xs mt-1">{fieldErrors.telefon}</p>}
              </div>
            </div>
          </div>

          {/* Poster bilgileri */}
          <div className="bg-[#0D1530] border border-[#1A2845] rounded-2xl p-6 space-y-4">
            <h2 className="text-white font-semibold text-base mb-2">Poster Bilgileri</h2>

            <div>
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Poster Başlığı *</label>
              <input
                required
                value={form.poster_basligi}
                onChange={set("poster_basligi")}
                placeholder="Posterinizin tam başlığı"
                className="w-full bg-[#060B18] border border-[#1A2845] focus:border-[#0066CC] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Konu Başlığı *</label>
              <select
                required
                value={form.konu_basligi}
                onChange={set("konu_basligi")}
                className="w-full bg-[#060B18] border border-[#1A2845] focus:border-[#0066CC] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
              >
                <option value="" disabled>Konu seçin</option>
                {topics.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Özet *</label>
                <span className={`text-xs font-semibold ${ozetWordCount >= 290 ? "text-red-400" : "text-slate-500"}`}>
                  {ozetWordCount} / 300 kelime
                </span>
              </div>
              <textarea
                required
                value={form.ozet}
                onChange={handleOzet}
                placeholder="Çalışmanızın kısa özetini yazın..."
                rows={6}
                className="w-full bg-[#060B18] border border-[#1A2845] focus:border-[#0066CC] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-slate-600 resize-none"
              />
            </div>
          </div>

          {/* PDF Yükleme */}
          <div className="bg-[#0D1530] border border-[#1A2845] rounded-2xl p-6">
            <h2 className="text-white font-semibold text-base mb-1">Poster Dosyası</h2>
            <p className="text-slate-500 text-xs mb-4">Opsiyonel — PDF formatında, max 10 MB</p>

            <div
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                pdfFile
                  ? "border-[#00D084]/50 bg-[#00D084]/5"
                  : "border-[#1A2845] hover:border-[#0066CC]/50 hover:bg-[#0066CC]/5"
              }`}
            >
              <input
                ref={fileRef}
                type="file"
                accept="application/pdf"
                onChange={handleFile}
                className="hidden"
              />
              {pdfFile ? (
                <div>
                  <div className="text-3xl mb-2">📄</div>
                  <p className="text-[#00D084] font-semibold text-sm">{pdfFile.name}</p>
                  <p className="text-slate-500 text-xs mt-1">
                    {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setPdfFile(null); }}
                    className="text-slate-500 hover:text-red-400 text-xs mt-2 transition-colors"
                  >
                    Kaldır
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-3xl mb-2">📎</div>
                  <p className="text-slate-400 text-sm font-medium">PDF dosyanızı buraya sürükleyin</p>
                  <p className="text-slate-600 text-xs mt-1">veya tıklayarak seçin</p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00D084] hover:bg-[#00b872] disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-[#00D084]/20 text-base"
          >
            {loading ? "Gönderiliyor..." : "Başvuruyu Gönder"}
          </button>
        </form>
      </div>
    </div>
  );
}
