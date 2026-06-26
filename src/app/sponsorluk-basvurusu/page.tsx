"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

const sponsorTypes = [
  "Ana Sponsor",
  "Platin Sponsor",
  "Altın Sponsor",
  "Gümüş Sponsor",
  "Destek Sponsoru",
  "Özel Sponsorluk",
  "Kararsızım",
];

const budgetRanges = [
  "Belirtmek istemiyorum",
  "100.000 TL altı",
  "100.000 - 250.000 TL",
  "250.000 - 500.000 TL",
  "500.000 TL üzeri",
];

const expectations = [
  "Logo görünürlüğü",
  "Stand alanı",
  "Sahne / salon görünürlüğü",
  "Konuşmacı öneri hakkı",
  "Sosyal medya görünürlüğü",
  "Basılı materyallerde yer alma",
  "Özel etkinlik sponsorluğu",
];

interface FormData {
  firma_adi: string;
  yetkili_kisi: string;
  email: string;
  telefon: string;
  web_sitesi: string;
  sponsor_tipi: string;
  butce_araligi: string;
  gorunurluk_beklentisi: string[];
  notlar: string;
}

const empty: FormData = {
  firma_adi: "",
  yetkili_kisi: "",
  email: "",
  telefon: "",
  web_sitesi: "",
  sponsor_tipi: "",
  butce_araligi: "",
  gorunurluk_beklentisi: [],
  notlar: "",
};

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^[0-9()+\s-]{10,20}$/;

export default function SponsorlukBasvurusu() {
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
      setForm((current) => ({ ...current, [key]: event.target.value }));
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

  function toggleExpectation(expectation: string) {
    setForm((current) => {
      const exists = current.gorunurluk_beklentisi.includes(expectation);
      return {
        ...current,
        gorunurluk_beklentisi: exists
          ? current.gorunurluk_beklentisi.filter((item) => item !== expectation)
          : [...current.gorunurluk_beklentisi, expectation],
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

    if (form.gorunurluk_beklentisi.length === 0) {
      setFieldErrors((current) => ({
        ...current,
        gorunurluk_beklentisi: "En az bir görünürlük beklentisi seçin",
      }));
      return;
    }

    setLoading(true);
    setError("");

    const { error: insertError } = await supabase
      .from("sponsorluk_basvurulari")
      .insert([
        {
          ...form,
          web_sitesi: form.web_sitesi || null,
          telefon: form.telefon || null,
          notlar: form.notlar || null,
        },
      ]);

    setLoading(false);

    if (insertError) {
      setError(
        "Başvuru alınamadı. Lütfen tekrar deneyin veya e-posta ile iletişime geçin."
      );
      return;
    }

    setSuccess(true);
  }

  const inputCls =
    "min-w-0 w-full rounded-h2-md border border-h2-border bg-h2-bg px-4 py-3 text-h2-small text-h2-ink-1 outline-none transition-colors placeholder:text-h2-ink-disabled focus:border-h2-blue";
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
              Sponsorluk Başvurunuz Alındı
            </h1>
            <p className="mt-4 leading-relaxed text-h2-ink-2">
              Başvurunuz ekibimize iletildi. Sponsorluk tipi ve görünürlük
              beklentilerinize göre sizinle iletişime geçeceğiz.
            </p>
            <a
              href="/"
              className="mt-8 inline-block rounded-h2-md bg-h2-blue px-8 py-3 font-semibold text-white transition-all hover:bg-h2-blue-bright"
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
            <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-cyan">
              Sponsorluk Başvurusu
            </span>
            <h1 className="mt-3 font-display text-h2-h2 font-bold text-h2-ink-1 sm:text-h2-h1">
              Zirvenin Kurumsal Destekçileri Arasında Yer Alın
            </h1>
            <p className="mt-4 max-w-2xl text-h2-body leading-relaxed text-h2-ink-2">
              Sponsor tipi, bütçe aralığı ve görünürlük beklentinizi paylaşın.
              Ekip, başvurunuz sonrası en uygun paket ve kapsam için dönüş
              yapacaktır.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="min-w-0 space-y-4 rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6">
              <h2 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
                Firma Bilgileri
              </h2>

              <div>
                <label className={labelCls}>Firma Adı *</label>
                <input
                  required
                  value={form.firma_adi}
                  onChange={set("firma_adi")}
                  placeholder="Firma adınız"
                  className={inputCls}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Yetkili Kişi *</label>
                  <input
                    required
                    value={form.yetkili_kisi}
                    onChange={set("yetkili_kisi")}
                    placeholder="Ad Soyad"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Web Sitesi</label>
                  <input
                    type="text"
                    inputMode="url"
                    value={form.web_sitesi}
                    onChange={set("web_sitesi")}
                    placeholder="firma.com veya https://firma.com"
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
                    placeholder="ornek@firma.com"
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
                Sponsorluk İlgisi
              </h2>

              <div>
                <label className={labelCls}>Sponsor Tipi *</label>
                <select
                  required
                  value={form.sponsor_tipi}
                  onChange={set("sponsor_tipi")}
                  className={inputCls}
                >
                  <option value="" disabled>
                    Sponsor tipi seçin
                  </option>
                  {sponsorTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls}>Bütçe Aralığı *</label>
                <select
                  required
                  value={form.butce_araligi}
                  onChange={set("butce_araligi")}
                  className={inputCls}
                >
                  <option value="" disabled>
                    Bütçe aralığı seçin
                  </option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls}>Görünürlük Beklentisi *</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {expectations.map((expectation) => (
                    <label
                      key={expectation}
                      className={`cursor-pointer rounded-h2-md border p-4 text-h2-small transition-colors ${
                        form.gorunurluk_beklentisi.includes(expectation)
                          ? "border-h2-blue bg-h2-blue/15 text-h2-ink-1"
                          : "border-h2-border bg-h2-bg/45 text-h2-ink-2 hover:border-h2-blue/45"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.gorunurluk_beklentisi.includes(expectation)}
                        onChange={() => toggleExpectation(expectation)}
                        className="sr-only"
                      />
                      {expectation}
                    </label>
                  ))}
                </div>
                {fieldErrors.gorunurluk_beklentisi && (
                  <p className="mt-2 text-h2-micro text-red-400">
                    {fieldErrors.gorunurluk_beklentisi}
                  </p>
                )}
              </div>

              <div>
                <label className={labelCls}>Not</label>
                <textarea
                  value={form.notlar}
                  onChange={set("notlar")}
                  placeholder="Özel beklenti, sponsorluk fikri veya eklemek istediğiniz bilgiler"
                  rows={4}
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
              className="w-full rounded-h2-md bg-h2-blue py-4 text-base font-bold text-white transition-all hover:bg-h2-blue-bright hover:shadow-lg hover:shadow-h2-blue/20 disabled:opacity-50"
            >
              {loading ? "Gönderiliyor..." : "Sponsorluk Başvurusunu Gönder"}
            </button>
          </form>
        </div>

        <aside className="min-w-0 space-y-5 lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-h2-lg border border-h2-blue/25 bg-h2-blue/8 p-6">
            <h2 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
              İlgi formu
            </h2>
            <p className="mt-3 text-h2-small leading-relaxed text-h2-ink-2">
              Bu form kesin paket satın alma işlemi değildir. Ekibimiz başvuru
              detaylarınıza göre en uygun sponsorluk kapsamı için dönüş yapar.
            </p>
          </div>

          <div className="rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6">
            <h2 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
              Sponsor Alanları
            </h2>
            <div className="mt-5 space-y-3">
              {["Ana / Platin / Altın paketler", "Özel etkinlik sponsorluğu", "Stand ve görünürlük birleşimi"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-h2-md border border-h2-border bg-h2-bg/45 p-4 text-h2-small text-h2-ink-2"
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
