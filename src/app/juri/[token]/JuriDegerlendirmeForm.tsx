"use client";

import { useMemo, useState } from "react";
import PreviewHeader from "@/components/home/PreviewHeader";
import TrialFooter from "@/components/home/TrialFooter";

export interface Poster {
  id: string;
  no: string;
  title: string;
  konu: string;
  pdf_url: string;
}

export interface MevcutDegerlendirme {
  poster_id: string;
  bilimsel_icerik: number;
  metodoloji: number;
  gorsel_tasarim: number;
  sunum_netligi: number;
  soru_cevap: number;
  genel_puan: number;
  yorum: string | null;
}

const kriterler = [
  { key: "bilimsel_icerik", label: "Bilimsel İçerik / Özgünlük" },
  { key: "metodoloji", label: "Metodoloji / Veri Kalitesi" },
  { key: "gorsel_tasarim", label: "Görsel Tasarım ve Düzen" },
  { key: "sunum_netligi", label: "Sunum Netliği ve Anlaşılırlık" },
  { key: "soru_cevap", label: "Özgün Katkı ve Uygulanabilirlik" },
] as const;

type KriterKey = (typeof kriterler)[number]["key"];

type PuanState = Record<KriterKey, number> & { genel_puan: number; yorum: string };

const bosPuan: PuanState = {
  bilimsel_icerik: 0,
  metodoloji: 0,
  gorsel_tasarim: 0,
  sunum_netligi: 0,
  soru_cevap: 0,
  genel_puan: 0,
  yorum: "",
};

function puanFromMevcut(m: MevcutDegerlendirme | undefined): PuanState {
  if (!m) return bosPuan;
  return {
    bilimsel_icerik: m.bilimsel_icerik,
    metodoloji: m.metodoloji,
    gorsel_tasarim: m.gorsel_tasarim,
    sunum_netligi: m.sunum_netligi,
    soru_cevap: m.soru_cevap,
    genel_puan: m.genel_puan,
    yorum: m.yorum ?? "",
  };
}

function PosterCard({
  token,
  poster,
  mevcut,
}: {
  token: string;
  poster: Poster;
  mevcut?: MevcutDegerlendirme;
}) {
  const [acik, setAcik] = useState(false);
  const [puan, setPuan] = useState<PuanState>(() => puanFromMevcut(mevcut));
  const [durum, setDurum] = useState<"idle" | "loading" | "saved" | "error">(
    mevcut ? "saved" : "idle"
  );
  const [hata, setHata] = useState("");

  const tamamlandi = kriterler.every((k) => puan[k.key] > 0);
  // Genel puan (1-10): kriter ortalamasının 2 katı; jüri yalnızca 5 kriteri 1-5 ile puanlar.
  const genelPuan = tamamlandi
    ? Math.min(10, Math.max(1, Math.round((kriterler.reduce((t, k) => t + puan[k.key], 0) / kriterler.length) * 2)))
    : 0;

  async function kaydet() {
    if (!tamamlandi) {
      setHata("Tüm kriterleri puanlayın.");
      setDurum("error");
      return;
    }

    setDurum("loading");
    setHata("");

    try {
      const res = await fetch("/api/juri-degerlendirme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          poster_id: poster.id,
          ...puan,
          genel_puan: genelPuan,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setHata(data.error ?? "Kaydedilemedi.");
        setDurum("error");
        return;
      }

      setDurum("saved");
    } catch {
      setHata("Bağlantı hatası, tekrar deneyin.");
      setDurum("error");
    }
  }

  return (
    <div className="rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6">
      <button
        type="button"
        onClick={() => setAcik((v) => !v)}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <div>
          <p className="text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3">
            {poster.no} · {poster.konu}
          </p>
          <h3 className="mt-1 font-display text-h2-h4 font-semibold text-h2-ink-1">
            {poster.title}
          </h3>
        </div>
        <span className="flex shrink-0 items-center gap-2">
          {durum === "saved" && (
            <span className="rounded-full bg-h2-cyan/15 px-3 py-1 text-h2-micro font-semibold text-h2-cyan">
              Değerlendirildi
            </span>
          )}
          <span className="text-h2-ink-3">{acik ? "▲" : "▼"}</span>
        </span>
      </button>

      {acik && (
        <div className="mt-5 space-y-5 border-t border-h2-border pt-5">
          <a
            href={poster.pdf_url}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-h2-small font-semibold text-h2-blue hover:text-h2-blue-bright"
          >
            Posteri Görüntüle (A2 PDF) →
          </a>

          <div className="grid gap-4 sm:grid-cols-2">
            {kriterler.map((k) => (
              <div key={k.key}>
                <label className="mb-1.5 block text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3">
                  {k.label}: {puan[k.key] || "-"}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setPuan((p) => ({ ...p, [k.key]: v }))}
                      className={`h-10 w-10 rounded-h2-md border text-h2-small font-semibold transition-colors ${
                        puan[k.key] === v
                          ? "border-h2-blue bg-h2-blue text-white"
                          : "border-h2-border bg-h2-bg/45 text-h2-ink-2 hover:border-h2-blue/45"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-h2-small text-h2-ink-2">
            Genel puan (otomatik): <span className="font-semibold text-h2-ink-1">{genelPuan || "-"} / 10</span>
          </p>

          <div>
            <label
              htmlFor={`yorum-${poster.id}`}
              className="mb-1.5 block text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3"
            >
              Yorum (opsiyonel)
            </label>
            <textarea
              id={`yorum-${poster.id}`}
              value={puan.yorum}
              onChange={(e) => setPuan((p) => ({ ...p, yorum: e.target.value }))}
              rows={3}
              className="w-full resize-none rounded-h2-md border border-h2-border bg-h2-bg px-4 py-3 text-h2-small text-h2-ink-1 outline-none transition-colors focus:border-h2-blue"
            />
          </div>

          {durum === "error" && (
            <p className="text-h2-micro text-red-400">{hata}</p>
          )}

          <button
            type="button"
            onClick={kaydet}
            disabled={durum === "loading"}
            className="rounded-h2-md bg-h2-blue px-6 py-3 text-h2-small font-bold text-white transition-all hover:bg-h2-blue/85 disabled:opacity-50"
          >
            {durum === "loading" ? "Kaydediliyor..." : "Puanları Kaydet"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function JuriDegerlendirmeForm({
  token,
  juriAdi,
  posterler,
  mevcutDegerlendirmeler,
}: {
  token: string;
  juriAdi: string;
  posterler: Poster[];
  mevcutDegerlendirmeler: MevcutDegerlendirme[];
}) {
  const mevcutMap = useMemo(() => {
    const map = new Map<string, MevcutDegerlendirme>();
    for (const m of mevcutDegerlendirmeler) map.set(m.poster_id, m);
    return map;
  }, [mevcutDegerlendirmeler]);

  const tamamlananSayi = posterler.filter((p) => mevcutMap.has(p.id)).length;

  return (
    <div className="min-h-screen overflow-x-hidden bg-h2-bg">
      <PreviewHeader />

      <main className="mx-auto max-w-4xl px-4 pb-12 pt-28 lg:pb-16 lg:pt-32">
        <div className="mb-10">
          <span className="text-h2-micro font-semibold uppercase tracking-[0.13em] text-h2-ink-3">
            Jüri Değerlendirme Paneli
          </span>
          <h1 className="mt-4 font-display text-[clamp(30px,4vw,46px)] font-bold leading-[1.06] tracking-[-0.04em] text-h2-ink-1">
            Hoş geldiniz, {juriAdi}
            <span className="text-h2-cyan">.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-h2-body leading-relaxed text-h2-ink-2">
            {tamamlananSayi} / {posterler.length} poster değerlendirildi. Her posteri
            açıp PDF&apos;ini inceleyin, beş kriteri 1 (zayıf) ile 5 (çok iyi) arasında puanlayın ve
            &quot;Puanları Kaydet&quot; butonuna basın; istediğiniz zaman dönüp güncelleyebilirsiniz.
            Kendi öğrencinizin veya kurumunuzun posterini puanlamayın.
          </p>
        </div>

        <div className="space-y-4">
          {posterler.map((poster) => (
            <PosterCard
              key={poster.id}
              token={token}
              poster={poster}
              mevcut={mevcutMap.get(poster.id)}
            />
          ))}
        </div>
      </main>
      <TrialFooter />
    </div>
  );
}
