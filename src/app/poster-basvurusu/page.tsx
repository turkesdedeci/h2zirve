"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { backupSubmission } from "@/lib/backupSubmission";

const topics = [
  "Hidrojen üretim teknolojileri (elektroliz, termokimyasal vb.)",
  "Hidrojen depolama ve taşıma teknolojileri",
  "Hidrojen dağıtım altyapısı ve sistemleri",
  "Yakıt hücreleri (PEM, SOFC, SOEC vb.)",
  "Hidrojenin endüstriyel uygulamaları",
  "Enerji sistemleri entegrasyonu ve hibrit sistemler",
  "Karbon azaltımı ve sürdürülebilirlik çözümleri",
  "Hidrojen ekonomisi, politikalar ve stratejiler",
  "Güvenlik, standartlar ve regülasyonlar",
  "Mobilite ve ulaşım uygulamaları (kara, deniz, hava)",
  "Diğer",
];

const trlLevels = [
  "TRL 1-3 (Temel araştırma)",
  "TRL 4-6 (Geliştirme / prototip aşaması)",
  "TRL 7-9 (Ürün / saha uygulaması)",
];

const exhibitionNeeds = [
  "Elektrik bağlantısı",
  "Masa / stand alanı",
  "Güvenlik / koruma",
  "Diğer",
];

interface FormData {
  poster_basligi: string;
  yazarlar: string;
  sorumlu_yazar: string;
  email: string;
  kurum: string;
  telefon: string;
  calisma_alani: string;
  trl: string;
  katkisi: string;
  prototip: "Evet" | "Hayır" | "";
  prototip_aciklama: string;
  sergi_ihtiyaclari: string[];
  notlar: string;
}

const empty: FormData = {
  poster_basligi: "",
  yazarlar: "",
  sorumlu_yazar: "",
  email: "",
  kurum: "",
  telefon: "",
  calisma_alani: "",
  trl: "",
  katkisi: "",
  prototip: "",
  prototip_aciklama: "",
  sergi_ihtiyaclari: [],
  notlar: "",
};

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^[0-9()+\s-]{10,20}$/;

function wordCount(value: string) {
  return value.trim() === "" ? 0 : value.trim().split(/\s+/).length;
}

export default function PosterBasvurusu() {
  const [form, setForm] = useState<FormData>(empty);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData | "pdf", string>>>({});
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof FormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((current) => ({ ...current, [key]: e.target.value }));
    };

  function handleResponsibleAuthor(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (/^[\p{L}\s.'-]*$/u.test(value)) {
      setForm((current) => ({ ...current, sorumlu_yazar: value }));
    }
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setForm((current) => ({ ...current, email: value }));
    setFieldErrors((current) => ({
      ...current,
      email: value && !EMAIL_RE.test(value) ? "Geçerli bir e-posta adresi girin" : undefined,
    }));
  }

  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setForm((current) => ({ ...current, telefon: value }));
    setFieldErrors((current) => ({
      ...current,
      telefon:
        value && !PHONE_RE.test(value)
          ? "Telefon numarasını 10-20 karakter arasında girin"
          : undefined,
    }));
  }

  function handleContribution(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    if (wordCount(value) <= 80) {
      setForm((current) => ({ ...current, katkisi: value }));
    }
  }

  function toggleNeed(need: string) {
    setForm((current) => {
      const selected = current.sergi_ihtiyaclari.includes(need);
      return {
        ...current,
        sergi_ihtiyaclari: selected
          ? current.sergi_ihtiyaclari.filter((item) => item !== need)
          : [...current.sergi_ihtiyaclari, need],
      };
    });
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Yalnızca PDF dosyası yükleyebilirsiniz.");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setError("Dosya boyutu 15 MB'ı geçemez.");
      return;
    }
    setError("");
    setPdfFile(file);
    setFieldErrors((current) => ({ ...current, pdf: undefined }));
  }

  function handleDropZoneKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileRef.current?.click();
    }
  }

  function buildSubmissionSummary() {
    const lines = [
      `Yazar(lar): ${form.yazarlar}`,
      `Sorumlu Yazar: ${form.sorumlu_yazar}`,
      `Çalışma Alanı: ${form.calisma_alani}`,
      `Teknoloji Hazırlık Seviyesi: ${form.trl}`,
      `Öne Çıkan Katkı: ${form.katkisi}`,
      `Poster ile prototip/ürün sergileme isteği: ${form.prototip}`,
    ];

    if (form.prototip === "Evet" && form.prototip_aciklama.trim()) {
      lines.push(`Sergilenecek ürün/prototip: ${form.prototip_aciklama}`);
    }

    if (form.sergi_ihtiyaclari.length > 0) {
      lines.push(`Sergi özel ihtiyaçları: ${form.sergi_ihtiyaclari.join(", ")}`);
    }

    if (form.notlar.trim()) {
      lines.push(`Not / Açıklama: ${form.notlar}`);
    }

    return lines.join("\n");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!EMAIL_RE.test(form.email)) {
      setFieldErrors((current) => ({
        ...current,
        email: "Geçerli bir e-posta adresi girin",
      }));
      return;
    }

    if (form.telefon && !PHONE_RE.test(form.telefon)) {
      setFieldErrors((current) => ({
        ...current,
        telefon: "Telefon numarasını 10-20 karakter arasında girin",
      }));
      return;
    }

    if (!pdfFile) {
      setFieldErrors((current) => ({
        ...current,
        pdf: "Genişletilmiş özet PDF dosyası zorunludur",
      }));
      return;
    }

    setLoading(true);
    setError("");

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

    const submission = {
      ad_soyad: form.sorumlu_yazar,
      kurum: form.kurum,
      email: form.email,
      telefon: form.telefon || null,
      poster_basligi: form.poster_basligi,
      konu_basligi: form.calisma_alani,
      ozet: buildSubmissionSummary(),
      pdf_url: data.publicUrl,
    };

    const { error: insertError } = await supabase
      .from("poster_basvurulari")
      .insert([submission]);

    if (insertError) {
      await supabase.storage.from("poster-dosyalari").remove([fileName]);
      setLoading(false);
      setError("Bir hata oluştu: " + insertError.message);
      return;
    }

    await backupSubmission("poster", {
      ...submission,
      yazarlar: form.yazarlar,
      trl: form.trl,
      katkisi: form.katkisi,
      prototip: form.prototip,
      prototip_aciklama: form.prototip_aciklama,
      sergi_ihtiyaclari: form.sergi_ihtiyaclari,
      notlar: form.notlar,
    });
    setLoading(false);
    setSuccess(true);
  }

  const inputCls =
    "min-w-0 w-full rounded-h2-md border border-h2-border bg-h2-bg px-4 py-3 text-h2-small text-h2-ink-1 outline-none transition-colors placeholder:text-h2-ink-disabled focus:border-h2-blue";
  const labelCls =
    "mb-1.5 block text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3";
  const contributionCount = wordCount(form.katkisi);

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-h2-bg px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-h2-green/30 bg-h2-green/15 text-3xl text-h2-green">
            ✓
          </div>
          <h2 className="mb-3 font-display text-h2-h2 font-bold text-h2-ink-1">
            Başvurunuz Alındı
          </h2>
          <p className="mb-8 leading-relaxed text-h2-ink-2">
            Poster özeti başvurunuz bilimsel kurulumuza iletildi. Değerlendirme
            sonucunu{" "}
            <span className="font-semibold text-h2-ink-1">{form.email}</span>{" "}
            adresine göndereceğiz.
          </p>
          <a
            href="/"
            className="inline-block rounded-h2-md bg-h2-green px-8 py-3 font-semibold text-white transition-all hover:bg-h2-green/85"
          >
            Ana Sayfaya Dön
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-h2-bg">
      <div className="border-b border-h2-border bg-h2-bg/95 px-4 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <a href="/" aria-label="Ana sayfa">
            <Image
              src="/logos/header.png"
              alt="Türkiye Hidrojen Zirvesi 2026"
              width={160}
              height={44}
              className="object-contain"
            />
          </a>
          <a
            href="/#cfp"
            className="text-h2-small text-h2-ink-2 transition-colors hover:text-h2-ink-1"
          >
            Geri
          </a>
        </div>
      </div>

      <main className="mx-auto grid max-w-5xl gap-10 px-4 py-12 lg:grid-cols-[1fr_20rem] lg:py-16">
        <div className="min-w-0">
          <div className="mb-10">
            <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-green">
              Poster Özeti Başvurusu
            </span>
            <h1 className="mt-3 font-display text-h2-h2 font-bold text-h2-ink-1 sm:text-h2-h1">
              Türkiye Hidrojen Zirvesi 2026
            </h1>
            <p className="mt-4 max-w-2xl text-h2-body leading-relaxed text-h2-ink-2">
              Genişletilmiş özetinizi 1 Eylül 2026 tarihine kadar yükleyin.
              Kabul edilen çalışmalar için final poster yükleme süreci 10 Eylül
              2026 tarihinde açılacaktır.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="min-w-0 space-y-4 rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6">
              <h2 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
                Başvuru Bilgileri
              </h2>

              <div>
                <label className={labelCls}>Poster Başlığı *</label>
                <input
                  required
                  value={form.poster_basligi}
                  onChange={set("poster_basligi")}
                  placeholder="Posterinizin tam başlığı"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>Yazar(lar) *</label>
                <input
                  required
                  value={form.yazarlar}
                  onChange={set("yazarlar")}
                  placeholder="Örn: Ad Soyad, Ad Soyad..."
                  className={inputCls}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Sorumlu Yazar *</label>
                  <input
                    required
                    value={form.sorumlu_yazar}
                    onChange={handleResponsibleAuthor}
                    placeholder="İletişim kişisi"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Kurum / Şirket *</label>
                  <input
                    required
                    value={form.kurum}
                    onChange={set("kurum")}
                    placeholder="Kurum veya şirket adı"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>E-posta *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={handleEmail}
                    placeholder="ornek@kurum.edu.tr"
                    className={`${inputCls} ${fieldErrors.email ? "border-red-500/60" : ""}`}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1 text-h2-micro text-red-400">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelCls}>Telefon</label>
                  <input
                    value={form.telefon}
                    onChange={handlePhone}
                    placeholder="+90 555 555 55 55"
                    className={`${inputCls} ${fieldErrors.telefon ? "border-red-500/60" : ""}`}
                  />
                  {fieldErrors.telefon && (
                    <p className="mt-1 text-h2-micro text-red-400">
                      {fieldErrors.telefon}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="min-w-0 space-y-4 rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6">
              <h2 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
                Çalışma Bilgileri
              </h2>

              <div>
                <label className={labelCls}>Çalışma Alanı *</label>
                <select
                  required
                  value={form.calisma_alani}
                  onChange={set("calisma_alani")}
                  className={inputCls}
                >
                  <option value="" disabled>
                    Alan seçin
                  </option>
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls}>Teknoloji Hazırlık Seviyesi *</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {trlLevels.map((level) => (
                    <label
                      key={level}
                      className={`cursor-pointer rounded-h2-md border p-4 text-h2-small transition-colors ${
                        form.trl === level
                          ? "border-h2-blue bg-h2-blue/15 text-h2-ink-1"
                          : "border-h2-border bg-h2-bg/45 text-h2-ink-2 hover:border-h2-blue/45"
                      }`}
                    >
                      <input
                        required
                        type="radio"
                        name="trl"
                        value={level}
                        checked={form.trl === level}
                        onChange={set("trl")}
                        className="sr-only"
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-4">
                  <label className="text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3">
                    Öne Çıkan Katkı *
                  </label>
                  <span
                    className={`text-h2-micro font-semibold ${
                      contributionCount >= 70 ? "text-red-400" : "text-h2-ink-3"
                    }`}
                  >
                    {contributionCount} / 80 kelime
                  </span>
                </div>
                <textarea
                  required
                  value={form.katkisi}
                  onChange={handleContribution}
                  placeholder="Jüri için çalışmanın katkısını 2-3 cümlede özetleyin."
                  rows={4}
                  className={`${inputCls} resize-none`}
                />
              </div>
            </section>

            <section className="min-w-0 rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6">
              <h2 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
                Genişletilmiş Özet Dosyası
              </h2>
              <p className="mt-1 text-h2-micro text-h2-ink-3">
                Zorunlu - 2-4 sayfa PDF, şekil/grafik içermesi önerilir, max 15 MB
              </p>

              <div
                onClick={() => fileRef.current?.click()}
                onKeyDown={handleDropZoneKeyDown}
                role="button"
                tabIndex={0}
                aria-label="Genişletilmiş özet PDF dosyası seç"
                className={`mt-5 cursor-pointer rounded-h2-md border-2 border-dashed p-8 text-center transition-all ${
                  pdfFile
                    ? "border-h2-green/50 bg-h2-green/5"
                    : "border-h2-border hover:border-h2-blue/50 hover:bg-h2-blue/5"
                } ${fieldErrors.pdf ? "border-red-500/60" : ""}`}
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
                    <p className="text-h2-small font-semibold text-h2-green">
                      {pdfFile.name}
                    </p>
                    <p className="mt-1 text-h2-micro text-h2-ink-3">
                      {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setPdfFile(null);
                      }}
                      className="mt-3 text-h2-micro text-h2-ink-3 transition-colors hover:text-red-400"
                    >
                      Kaldır
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-h2-small font-medium text-h2-ink-2">
                      PDF dosyanızı buraya sürükleyin
                    </p>
                    <p className="mt-1 text-h2-micro text-h2-ink-disabled">
                      veya tıklayarak seçin
                    </p>
                  </div>
                )}
              </div>
              {fieldErrors.pdf && (
                <p className="mt-2 text-h2-micro text-red-400">
                  {fieldErrors.pdf}
                </p>
              )}
            </section>

            <section className="min-w-0 space-y-4 rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6">
              <h2 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
                Uygulama ve Sergi
              </h2>

              <div>
                <label className={labelCls}>
                  Poster ile birlikte prototip veya ürün sergilemek istiyor musunuz? *
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(["Evet", "Hayır"] as const).map((answer) => (
                    <label
                      key={answer}
                      className={`cursor-pointer rounded-h2-md border p-4 text-h2-small font-semibold transition-colors ${
                        form.prototip === answer
                          ? "border-h2-green bg-h2-green/12 text-h2-ink-1"
                          : "border-h2-border bg-h2-bg/45 text-h2-ink-2 hover:border-h2-green/45"
                      }`}
                    >
                      <input
                        required
                        type="radio"
                        name="prototip"
                        value={answer}
                        checked={form.prototip === answer}
                        onChange={set("prototip")}
                        className="sr-only"
                      />
                      {answer}
                    </label>
                  ))}
                </div>
              </div>

              {form.prototip === "Evet" && (
                <div>
                  <label className={labelCls}>Sergilenecek Ürün / Prototip</label>
                  <textarea
                    value={form.prototip_aciklama}
                    onChange={set("prototip_aciklama")}
                    placeholder="Ürün veya prototip hakkında kısa açıklama"
                    rows={3}
                    className={`${inputCls} resize-none`}
                  />
                </div>
              )}

              <div>
                <label className={labelCls}>Sergi İçin Özel İhtiyaçlar</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {exhibitionNeeds.map((need) => (
                    <label
                      key={need}
                      className={`cursor-pointer rounded-h2-md border p-4 text-h2-small transition-colors ${
                        form.sergi_ihtiyaclari.includes(need)
                          ? "border-h2-cyan bg-h2-cyan/10 text-h2-ink-1"
                          : "border-h2-border bg-h2-bg/45 text-h2-ink-2 hover:border-h2-cyan/45"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.sergi_ihtiyaclari.includes(need)}
                        onChange={() => toggleNeed(need)}
                        className="sr-only"
                      />
                      {need}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelCls}>Not / Açıklama</label>
                <textarea
                  value={form.notlar}
                  onChange={set("notlar")}
                  placeholder="Eklemek istediğiniz notlar"
                  rows={3}
                  className={`${inputCls} resize-none`}
                />
              </div>
            </section>

            {error && (
              <div className="rounded-h2-md border border-red-500/30 bg-red-500/10 px-4 py-3">
                <p className="text-h2-small text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-h2-md bg-h2-green py-4 text-base font-bold text-white transition-all hover:bg-h2-green/85 hover:shadow-lg hover:shadow-h2-green/20 disabled:opacity-50"
            >
              {loading ? "Gönderiliyor..." : "Poster Özeti Başvurusunu Gönder"}
            </button>
          </form>
        </div>

        <aside className="min-w-0 space-y-5 lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6">
            <h2 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
              Önemli Tarihler
            </h2>
            <div className="mt-5 space-y-3">
              {[
                ["Son Başvuru", "1 Eylül 2026"],
                ["Kabul Bildirimi", "10 Eylül 2026"],
                ["Poster Yükleme", "20 Eylül 2026"],
                ["Zirve", "22-23 Ekim 2026"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-h2-md border border-h2-border bg-h2-bg/45 p-4"
                >
                  <p className="text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3">
                    {label}
                  </p>
                  <p className="mt-1 text-h2-small font-semibold text-h2-ink-1">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-h2-lg border border-h2-blue/25 bg-h2-blue/8 p-6">
            <h2 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
              Şablonlar
            </h2>
            <p className="mt-3 text-h2-small leading-relaxed text-h2-ink-2">
              Başvuru dosyanızı hazırlamak için genişletilmiş özet şablonunu
              kullanın.
            </p>
            <div className="mt-5 space-y-3">
              <a
                href="/templates/poster-extended-abstract.docx"
                className="block rounded-h2-md bg-h2-blue px-4 py-3 text-center text-h2-small font-semibold text-white transition-all hover:bg-h2-blue-bright"
              >
                Özet Şablonu İndir
              </a>
              <a
                href="/templates/hidrojen-zirvesi-a1-poster-sablonu.pdf"
                className="block rounded-h2-md border border-h2-border px-4 py-3 text-center text-h2-small font-semibold text-h2-ink-1 transition-all hover:border-h2-cyan/45"
              >
                Poster Şablonu Önizle
              </a>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
