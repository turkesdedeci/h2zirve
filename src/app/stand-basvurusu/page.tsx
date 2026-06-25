"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

const segments = {
  Startup: {
    title: "Startup stand başvurusu ücretsizdir",
    body: "Erken aşama girişimler, hidrojen ekosistemine katkı sunan ürün ve prototiplerini ücretsiz stand başvurusu ile sergilemek için değerlendirmeye alınır.",
    accent: "border-h2-green/35 bg-h2-green/10 text-h2-green",
  },
  KOBİ: {
    title: "KOBİ başvuruları ekip tarafından tekliflendirilir",
    body: "Başvuru sonrası stand ihtiyacı, ürün gösterimi ve alan talebine göre ekip sizinle iletişime geçecektir.",
    accent: "border-h2-cyan/35 bg-h2-cyan/10 text-h2-cyan",
  },
  "Büyük Firma": {
    title: "Büyük firma başvuruları sponsorlukla eşleştirilebilir",
    body: "Stand alanı, görünürlük beklentisi ve sponsorluk ihtiyacı birlikte değerlendirilerek size özel dönüş yapılır.",
    accent: "border-h2-blue/35 bg-h2-blue/10 text-h2-blue-bright",
  },
};

const standNeeds = [
  "Masa / demo alanı",
  "Stand alanı",
  "Prototip / ürün sergileme alanı",
  "Görüşme alanı",
  "Kararsızım",
];

const specialNeeds = [
  "Elektrik bağlantısı",
  "İnternet",
  "Güvenlik / koruma",
  "Lojistik destek",
  "Depolama alanı",
];

interface FormData {
  firma_adi: string;
  segment: keyof typeof segments | "";
  yetkili_kisi: string;
  email: string;
  telefon: string;
  web_sitesi: string;
  sektor: string;
  urun_aciklamasi: string;
  stand_ihtiyaci: string;
  ozel_ihtiyaclar: string[];
  notlar: string;
}

const empty: FormData = {
  firma_adi: "",
  segment: "",
  yetkili_kisi: "",
  email: "",
  telefon: "",
  web_sitesi: "",
  sektor: "",
  urun_aciklamasi: "",
  stand_ihtiyaci: "",
  ozel_ihtiyaclar: [],
  notlar: "",
};

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^[0-9()+\s-]{10,20}$/;

export default function StandBasvurusu() {
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

  function toggleNeed(need: string) {
    setForm((current) => {
      const exists = current.ozel_ihtiyaclar.includes(need);
      return {
        ...current,
        ozel_ihtiyaclar: exists
          ? current.ozel_ihtiyaclar.filter((item) => item !== need)
          : [...current.ozel_ihtiyaclar, need],
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

    setLoading(true);
    setError("");

    const { error: insertError } = await supabase
      .from("stand_basvurulari")
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

  const selectedSegment = form.segment ? segments[form.segment] : null;
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
              Stand Başvurunuz Alındı
            </h1>
            <p className="mt-4 leading-relaxed text-h2-ink-2">
              Başvurunuz ekibimize iletildi. Firma segmenti ve stand ihtiyacına
              göre sizinle iletişime geçeceğiz.
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
              Stand Başvurusu
            </span>
            <h1 className="mt-3 font-display text-h2-h2 font-bold text-h2-ink-1 sm:text-h2-h1">
              Fuar Alanında Yer Alın
            </h1>
            <p className="mt-4 max-w-2xl text-h2-body leading-relaxed text-h2-ink-2">
              Firma büyüklüğünüzü seçin, sergilemek istediğiniz ürün veya
              prototipi paylaşın. Startup başvuruları ücretsiz olarak
              değerlendirilir.
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

              <div>
                <label className={labelCls}>Firma Segmenti *</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {Object.keys(segments).map((segment) => (
                    <label
                      key={segment}
                      className={`cursor-pointer rounded-h2-md border p-4 text-h2-small font-semibold transition-colors ${
                        form.segment === segment
                          ? "border-h2-green bg-h2-green/12 text-h2-ink-1"
                          : "border-h2-border bg-h2-bg/45 text-h2-ink-2 hover:border-h2-green/45"
                      }`}
                    >
                      <input
                        required
                        type="radio"
                        name="segment"
                        value={segment}
                        checked={form.segment === segment}
                        onChange={set("segment")}
                        className="sr-only"
                      />
                      {segment}
                    </label>
                  ))}
                </div>
              </div>

              {selectedSegment && (
                <div
                  className={`rounded-h2-md border p-4 ${selectedSegment.accent}`}
                >
                  <p className="font-display text-h2-small font-semibold">
                    {selectedSegment.title}
                  </p>
                  <p className="mt-2 text-h2-small leading-relaxed text-h2-ink-2">
                    {selectedSegment.body}
                  </p>
                </div>
              )}

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
                  <label className={labelCls}>Sektör *</label>
                  <input
                    required
                    value={form.sektor}
                    onChange={set("sektor")}
                    placeholder="Örn: Elektroliz, yakıt hücresi, mobilite"
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

              <div>
                <label className={labelCls}>Web Sitesi</label>
                <input
                  type="url"
                  value={form.web_sitesi}
                  onChange={set("web_sitesi")}
                  placeholder="https://firma.com"
                  className={inputCls}
                />
              </div>
            </section>

            <section className="min-w-0 space-y-4 rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6">
              <h2 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
                Stand İhtiyacı
              </h2>

              <div>
                <label className={labelCls}>Stand İhtiyacı *</label>
                <select
                  required
                  value={form.stand_ihtiyaci}
                  onChange={set("stand_ihtiyaci")}
                  className={inputCls}
                >
                  <option value="" disabled>
                    Stand ihtiyacı seçin
                  </option>
                  {standNeeds.map((need) => (
                    <option key={need} value={need}>
                      {need}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls}>Ürün / Prototip Açıklaması *</label>
                <textarea
                  required
                  value={form.urun_aciklamasi}
                  onChange={set("urun_aciklamasi")}
                  placeholder="Sergilemek istediğiniz ürün, prototip veya hizmeti kısaca açıklayın."
                  rows={5}
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div>
                <label className={labelCls}>Özel İhtiyaçlar</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {specialNeeds.map((need) => (
                    <label
                      key={need}
                      className={`cursor-pointer rounded-h2-md border p-4 text-h2-small transition-colors ${
                        form.ozel_ihtiyaclar.includes(need)
                          ? "border-h2-cyan bg-h2-cyan/10 text-h2-ink-1"
                          : "border-h2-border bg-h2-bg/45 text-h2-ink-2 hover:border-h2-cyan/45"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.ozel_ihtiyaclar.includes(need)}
                        onChange={() => toggleNeed(need)}
                        className="sr-only"
                      />
                      {need}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelCls}>Not</label>
                <textarea
                  value={form.notlar}
                  onChange={set("notlar")}
                  placeholder="Eklemek istediğiniz bilgiler"
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
              {loading ? "Gönderiliyor..." : "Stand Başvurusunu Gönder"}
            </button>
          </form>
        </div>

        <aside className="min-w-0 space-y-5 lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-h2-lg border border-h2-green/25 bg-h2-green/8 p-6">
            <h2 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
              Startup ücretsiz
            </h2>
            <p className="mt-3 text-h2-small leading-relaxed text-h2-ink-2">
              Startup seçimi başvurunun ücretsiz değerlendirme sürecine
              alınmasını sağlar. Nihai kabul ekip değerlendirmesine bağlıdır.
            </p>
          </div>

          <div className="rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6">
            <h2 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
              Süreç
            </h2>
            <div className="mt-5 space-y-3">
              {["Başvuru alınır", "İhtiyaç değerlendirilir", "Ekip sizinle iletişime geçer"].map(
                (step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-3 rounded-h2-md border border-h2-border bg-h2-bg/45 p-4"
                  >
                    <span className="font-display text-h2-small font-bold text-h2-green">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-h2-small text-h2-ink-2">{step}</span>
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
