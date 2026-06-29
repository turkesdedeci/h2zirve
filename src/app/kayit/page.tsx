"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { backupSubmission } from "@/lib/backupSubmission";
import { supabase } from "@/lib/supabase";

const participantTypes = [
  "Akademisyen",
  "Öğrenci",
  "Kamu",
  "Özel sektör",
  "Startup",
  "STK / Dernek",
  "Diğer",
];

const attendanceDays = ["22 Ekim 2026", "23 Ekim 2026", "Her iki gün"];

const interestAreas = [
  "Hidrojen üretimi",
  "Depolama / taşıma",
  "Yakıt hücreleri",
  "Endüstriyel uygulamalar",
  "Enerji politikaları",
  "Stand / sponsorluk",
  "Akademik posterler",
];

interface FormData {
  ad_soyad: string;
  email: string;
  telefon: string;
  kurum: string;
  unvan: string;
  katilimci_tipi: string;
  katilim_gunu: string;
  ilgi_alanlari: string[];
  kvkk_onayi: boolean;
  notlar: string;
}

const empty: FormData = {
  ad_soyad: "",
  email: "",
  telefon: "",
  kurum: "",
  unvan: "",
  katilimci_tipi: "",
  katilim_gunu: "",
  ilgi_alanlari: [],
  kvkk_onayi: false,
  notlar: "",
};

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^[0-9()+\s-]{10,20}$/;

export default function Kayit() {
  const [form, setForm] = useState<FormData>(empty);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof FormData) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value =
        event.target instanceof HTMLInputElement && event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;
      setForm((current) => ({ ...current, [key]: value }));
    };

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setForm((current) => ({ ...current, email: value }));
    setFieldErrors((current) => ({
      ...current,
      email: value && !EMAIL_RE.test(value) ? "Geçerli bir e-posta adresi girin" : undefined,
    }));
  }

  function handlePhone(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setForm((current) => ({ ...current, telefon: value }));
    setFieldErrors((current) => ({
      ...current,
      telefon:
        value && !PHONE_RE.test(value)
          ? "Telefon numarasını 10-20 karakter arasında girin"
          : undefined,
    }));
  }

  function toggleInterest(area: string) {
    setForm((current) => {
      const selected = current.ilgi_alanlari.includes(area);
      return {
        ...current,
        ilgi_alanlari: selected
          ? current.ilgi_alanlari.filter((item) => item !== area)
          : [...current.ilgi_alanlari, area],
      };
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

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

    if (!form.kvkk_onayi) {
      setFieldErrors((current) => ({
        ...current,
        kvkk_onayi: "Devam etmek için onay vermeniz gerekiyor",
      }));
      return;
    }

    setLoading(true);
    setError("");

    const submission = {
      ad_soyad: form.ad_soyad,
      email: form.email,
      telefon: form.telefon || null,
      kurum: form.kurum,
      unvan: form.unvan || null,
      katilimci_tipi: form.katilimci_tipi,
      katilim_gunu: form.katilim_gunu,
      ilgi_alanlari: form.ilgi_alanlari,
      kvkk_onayi: form.kvkk_onayi,
      notlar: form.notlar || null,
    };

    const { error: insertError } = await supabase
      .from("katilimci_kayitlari")
      .insert([submission]);

    if (insertError) {
      setLoading(false);
      setError(
        "Kayıt alınamadı. Lütfen tekrar deneyin veya e-posta ile iletişime geçin."
      );
      return;
    }

    await backupSubmission("kayit", submission);
    setLoading(false);
    setSuccess(true);
  }

  const inputCls =
    "min-w-0 w-full rounded-h2-md border border-h2-border bg-h2-bg px-4 py-3 text-h2-small text-h2-ink-1 outline-none transition-colors placeholder:text-h2-ink-disabled focus:border-h2-green";
  const labelCls =
    "mb-1.5 block text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3";

  if (success) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center bg-h2-bg px-4 pt-20">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-h2-green/30 bg-h2-green/15 text-3xl text-h2-green">
              ✓
            </div>
            <h1 className="font-display text-h2-h2 font-bold text-h2-ink-1">
              Kaydınız Alındı
            </h1>
            <p className="mt-4 leading-relaxed text-h2-ink-2">
              Türkiye Hidrojen Zirvesi 2026 katılımcı kaydınız ekibimize iletildi.
              Etkinlik bilgilendirmeleri için e-posta adresinizi takip edebilirsiniz.
            </p>
            <a
              href="/"
              className="mt-8 inline-block rounded-h2-md bg-h2-green px-8 py-3 font-semibold text-white transition-all hover:bg-h2-green/85"
            >
              Ana Sayfaya Dön
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-h2-bg">
      <Navbar />

      <main className="mx-auto grid max-w-5xl gap-10 px-4 pb-12 pt-28 lg:grid-cols-[1fr_20rem] lg:pb-16 lg:pt-32">
        <div className="min-w-0">
          <div className="mb-10">
            <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-green">
              Katılımcı Kaydı
            </span>
            <h1 className="mt-3 font-display text-h2-h2 font-bold text-h2-ink-1 sm:text-h2-h1">
              Türkiye Hidrojen Zirvesi 2026 Kayıt Formu
            </h1>
            <p className="mt-4 max-w-2xl text-h2-body leading-relaxed text-h2-ink-2">
              22-23 Ekim 2026 tarihlerinde Ankara Yıldırım Beyazıt Üniversitesi
              Etlik Kongre Salonu&apos;nda gerçekleşecek zirveye katılım için
              bilgilerinizi paylaşın.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="min-w-0 space-y-4 rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6">
              <h2 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
                Katılımcı Bilgileri
              </h2>

              <div>
                <label className={labelCls}>Ad Soyad *</label>
                <input
                  required
                  value={form.ad_soyad}
                  onChange={set("ad_soyad")}
                  placeholder="Adınız ve soyadınız"
                  className={inputCls}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>E-posta *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={handleEmail}
                    placeholder="ornek@kurum.com"
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

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Kurum / Şirket *</label>
                  <input
                    required
                    value={form.kurum}
                    onChange={set("kurum")}
                    placeholder="Kurum veya şirket adınız"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Unvan / Görev</label>
                  <input
                    value={form.unvan}
                    onChange={set("unvan")}
                    placeholder="Örn: Araştırmacı, Yönetici, Öğrenci"
                    className={inputCls}
                  />
                </div>
              </div>
            </section>

            <section className="min-w-0 space-y-4 rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6">
              <h2 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
                Katılım Bilgileri
              </h2>

              <div>
                <label className={labelCls}>Katılımcı Tipi *</label>
                <select
                  required
                  value={form.katilimci_tipi}
                  onChange={set("katilimci_tipi")}
                  className={inputCls}
                >
                  <option value="" disabled>
                    Seçin
                  </option>
                  {participantTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls}>Katılım Günü *</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {attendanceDays.map((day) => (
                    <label
                      key={day}
                      className={`cursor-pointer rounded-h2-md border p-4 text-h2-small font-semibold transition-colors ${
                        form.katilim_gunu === day
                          ? "border-h2-green bg-h2-green/12 text-h2-ink-1"
                          : "border-h2-border bg-h2-bg/45 text-h2-ink-2 hover:border-h2-green/45"
                      }`}
                    >
                      <input
                        required
                        type="radio"
                        name="katilim_gunu"
                        value={day}
                        checked={form.katilim_gunu === day}
                        onChange={set("katilim_gunu")}
                        className="sr-only"
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelCls}>İlgi Alanları</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {interestAreas.map((area) => (
                    <label
                      key={area}
                      className={`cursor-pointer rounded-h2-md border p-4 text-h2-small transition-colors ${
                        form.ilgi_alanlari.includes(area)
                          ? "border-h2-cyan bg-h2-cyan/10 text-h2-ink-1"
                          : "border-h2-border bg-h2-bg/45 text-h2-ink-2 hover:border-h2-cyan/45"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.ilgi_alanlari.includes(area)}
                        onChange={() => toggleInterest(area)}
                        className="sr-only"
                      />
                      {area}
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

            <section className="min-w-0 rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6">
              <label className="flex cursor-pointer gap-3 text-h2-small leading-relaxed text-h2-ink-2">
                <input
                  required
                  type="checkbox"
                  checked={form.kvkk_onayi}
                  onChange={set("kvkk_onayi")}
                  className="mt-1 h-4 w-4 rounded border-h2-border accent-h2-green"
                />
                <span>
                  Paylaştığım bilgilerin Türkiye Hidrojen Zirvesi 2026 katılım
                  süreçleri kapsamında işlenmesini ve etkinlik bilgilendirmeleri
                  için kullanılmasını onaylıyorum.
                </span>
              </label>
              {fieldErrors.kvkk_onayi && (
                <p className="mt-2 text-h2-micro text-red-400">
                  {fieldErrors.kvkk_onayi}
                </p>
              )}
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
              {loading ? "Kaydediliyor..." : "Kaydımı Tamamla"}
            </button>
          </form>
        </div>

        <aside className="min-w-0 space-y-5 lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6">
            <h2 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
              Etkinlik Bilgileri
            </h2>
            <div className="mt-5 space-y-3">
              {[
                ["Tarih", "22-23 Ekim 2026"],
                ["Yer", "AYBÜ Etlik Kongre Salonu"],
                ["Şehir", "Ankara"],
                ["Katılım", "Ön kayıt gereklidir"],
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
        </aside>
      </main>
    </div>
  );
}
