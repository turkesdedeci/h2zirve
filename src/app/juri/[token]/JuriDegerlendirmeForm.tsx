"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
type PuanState = Record<KriterKey, number> & { yorum: string };
type Durum = "idle" | "dirty" | "loading" | "saved" | "pending" | "error";

const bosPuan: PuanState = {
  bilimsel_icerik: 0,
  metodoloji: 0,
  gorsel_tasarim: 0,
  sunum_netligi: 0,
  soru_cevap: 0,
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
    yorum: m.yorum ?? "",
  };
}

const tamam = (p: PuanState) => kriterler.every((k) => p[k.key] > 0);

/** Genel puan (1-10): beş kriterin ortalamasının 2 katı. */
function genelPuanOf(p: PuanState) {
  if (!tamam(p)) return 0;
  const ort = kriterler.reduce((t, k) => t + p[k.key], 0) / kriterler.length;
  return Math.min(10, Math.max(1, Math.round(ort * 2)));
}

/* ---- Taslak ve bekleyen gönderiler tarayıcıda saklanır; sayfa kapansa da kaybolmaz ---- */
const draftKey = (token: string, id: string) => `juri:${token}:draft:${id}`;
const pendingKey = (token: string) => `juri:${token}:pending`;

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* depolama kapalıysa sessizce geç */
  }
}

function removeKey(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* yoksay */
  }
}

async function postScore(token: string, posterId: string, puan: PuanState) {
  try {
    const res = await fetch("/api/juri-degerlendirme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, poster_id: posterId, ...puan, genel_puan: genelPuanOf(puan) }),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, error: (data.error as string | undefined) ?? "" };
  } catch {
    return { ok: false, status: 0, error: "Bağlantı hatası" };
  }
}

function PosterCard({
  token,
  poster,
  mevcut,
  onSaved,
  onPendingChange,
}: {
  token: string;
  poster: Poster;
  mevcut?: MevcutDegerlendirme;
  onSaved: (posterId: string, puan: PuanState) => void;
  onPendingChange: () => void;
}) {
  const [acik, setAcik] = useState(false);
  const [puan, setPuan] = useState<PuanState>(() => puanFromMevcut(mevcut));
  const [durum, setDurum] = useState<Durum>(mevcut ? "saved" : "idle");
  const [hata, setHata] = useState("");

  // Önceki oturumdan kalan taslak/bekleyen gönderi varsa geri yükle.
  useEffect(() => {
    const draft = readJson<PuanState | null>(draftKey(token, poster.id), null);
    if (!draft) return;
    const bekliyor = readJson<string[]>(pendingKey(token), []).includes(poster.id);
    setPuan(draft);
    setDurum(bekliyor ? "pending" : "dirty");
  }, [token, poster.id]);

  // Arka planda başarıyla gönderilen bekleyen puan bu karta da yansısın.
  useEffect(() => {
    function onFlushed(event: Event) {
      const detail = (event as CustomEvent<{ posterId: string; puan: PuanState }>).detail;
      if (detail.posterId !== poster.id) return;
      setPuan(detail.puan);
      setDurum("saved");
      setHata("");
    }
    window.addEventListener("juri-saved", onFlushed);
    return () => window.removeEventListener("juri-saved", onFlushed);
  }, [poster.id]);

  const tamamlandi = tamam(puan);
  const genel = genelPuanOf(puan);

  function degistir(next: PuanState) {
    setPuan(next);
    setDurum("dirty");
    writeJson(draftKey(token, poster.id), next);
  }

  async function kaydet() {
    if (!tamamlandi) {
      setHata("Beş kriterin hepsini puanlayın.");
      setDurum("error");
      return;
    }

    setDurum("loading");
    setHata("");

    const result = await postScore(token, poster.id, puan);

    if (result.ok) {
      removeKey(draftKey(token, poster.id));
      writeJson(
        pendingKey(token),
        readJson<string[]>(pendingKey(token), []).filter((id) => id !== poster.id),
      );
      onPendingChange();
      onSaved(poster.id, puan);
      setDurum("saved");
      return;
    }

    if (result.status === 401) {
      setHata("Oturum süresi doldu. Sayfayı yenileyip PIN'i tekrar girin; puanlarınız bu tarayıcıda saklandı.");
    } else if (result.status === 0) {
      setHata("Bağlantı kurulamadı. Puanlarınız bu tarayıcıda saklandı; bağlantı gelince otomatik gönderilecek.");
    } else {
      setHata((result.error || "Kaydedilemedi.") + " Puanlarınız bu tarayıcıda saklandı; yeniden denenecek.");
    }

    // Kayıt başarısız: taslak kalsın, bekleyenlere ekle.
    writeJson(draftKey(token, poster.id), puan);
    const bekleyen = new Set(readJson<string[]>(pendingKey(token), []));
    bekleyen.add(poster.id);
    writeJson(pendingKey(token), [...bekleyen]);
    onPendingChange();
    setDurum("pending");
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
          <h3 className="mt-1 font-display text-h2-h4 font-semibold text-h2-ink-1">{poster.title}</h3>
        </div>
        <span className="flex shrink-0 items-center gap-2">
          {durum === "saved" && (
            <span className="rounded-full bg-h2-cyan/15 px-3 py-1 text-h2-micro font-semibold text-h2-cyan">
              Değerlendirildi
            </span>
          )}
          {durum === "dirty" && (
            <span className="rounded-full bg-amber-500/15 px-3 py-1 text-h2-micro font-semibold text-amber-300">
              Kaydedilmedi
            </span>
          )}
          {durum === "pending" && (
            <span className="rounded-full bg-red-500/15 px-3 py-1 text-h2-micro font-semibold text-red-300">
              Gönderilemedi
            </span>
          )}
          <span className="text-h2-ink-3">{acik ? "▲" : "▼"}</span>
        </span>
      </button>

      {acik && (
        <div className="mt-5 grid gap-6 border-t border-h2-border pt-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-5">
          <a
            href={poster.pdf_url}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-h2-small font-semibold text-white underline underline-offset-4 hover:text-h2-cyan"
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
                      onClick={() => degistir({ ...puan, [k.key]: v })}
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
            Genel puan (otomatik): <span className="font-semibold text-h2-ink-1">{genel || "-"} / 10</span>
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
              onChange={(e) => degistir({ ...puan, yorum: e.target.value })}
              rows={3}
              className="w-full resize-none rounded-h2-md border border-h2-border bg-h2-bg px-4 py-3 text-h2-small text-h2-ink-1 outline-none transition-colors focus:border-h2-blue"
            />
          </div>

          {(durum === "error" || durum === "pending") && hata && (
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

          <div className="hidden lg:block">
            <div className="sticky top-24 overflow-hidden rounded-h2-md border border-h2-border bg-h2-bg">
              <iframe
                src={`${poster.pdf_url}#toolbar=0&navpanes=0&view=Fit`}
                title={`${poster.no} poster önizleme`}
                loading="lazy"
                className="block aspect-[420/594] w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function csvEscape(value: string | number) {
  const text = String(value ?? "");
  return /[";\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export default function JuriDegerlendirmeForm({
  token,
  juriAdi,
  sonTarih,
  posterler,
  mevcutDegerlendirmeler,
}: {
  token: string;
  juriAdi: string;
  sonTarih: string;
  posterler: Poster[];
  mevcutDegerlendirmeler: MevcutDegerlendirme[];
}) {
  const mevcutMap = useMemo(() => {
    const map = new Map<string, MevcutDegerlendirme>();
    for (const m of mevcutDegerlendirmeler) map.set(m.poster_id, m);
    return map;
  }, [mevcutDegerlendirmeler]);

  const [kayitli, setKayitli] = useState<Map<string, PuanState>>(() => {
    const map = new Map<string, PuanState>();
    for (const m of mevcutDegerlendirmeler) map.set(m.poster_id, puanFromMevcut(m));
    return map;
  });
  const [bekleyenSayisi, setBekleyenSayisi] = useState(0);
  const [bitirMesaj, setBitirMesaj] = useState("");
  const [bitiriyor, setBitiriyor] = useState(false);

  const bekleyenGuncelle = useCallback(() => {
    setBekleyenSayisi(readJson<string[]>(pendingKey(token), []).length);
  }, [token]);

  const onSaved = useCallback((posterId: string, puan: PuanState) => {
    setKayitli((current) => new Map(current).set(posterId, puan));
  }, []);

  /** Başarısız gönderileri arka planda yeniden dener. */
  const bekleyenleriGonder = useCallback(async () => {
    const ids = readJson<string[]>(pendingKey(token), []);
    if (ids.length === 0) return;

    for (const id of ids) {
      const draft = readJson<PuanState | null>(draftKey(token, id), null);
      if (!draft || !tamam(draft)) continue;
      const result = await postScore(token, id, draft);
      if (!result.ok) continue;

      removeKey(draftKey(token, id));
      writeJson(
        pendingKey(token),
        readJson<string[]>(pendingKey(token), []).filter((x) => x !== id),
      );
      setKayitli((current) => new Map(current).set(id, draft));
      window.dispatchEvent(new CustomEvent("juri-saved", { detail: { posterId: id, puan: draft } }));
    }
    bekleyenGuncelle();
  }, [token, bekleyenGuncelle]);

  useEffect(() => {
    bekleyenGuncelle();
    const timer = window.setInterval(bekleyenleriGonder, 30_000);
    window.addEventListener("online", bekleyenleriGonder);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("online", bekleyenleriGonder);
    };
  }, [bekleyenGuncelle, bekleyenleriGonder]);

  useEffect(() => {
    function uyar(event: BeforeUnloadEvent) {
      if (readJson<string[]>(pendingKey(token), []).length > 0) {
        event.preventDefault();
        event.returnValue = "";
      }
    }
    window.addEventListener("beforeunload", uyar);
    return () => window.removeEventListener("beforeunload", uyar);
  }, [token]);

  const tamamlananSayi = posterler.filter((p) => kayitli.has(p.id)).length;
  const eksik = posterler.length - tamamlananSayi;

  function csvIndir() {
    const basliklar = [
      "Poster No",
      "Konu",
      "Başlık",
      ...kriterler.map((k) => k.label),
      "Genel Puan (10 üzerinden)",
      "Yorum",
    ];
    const satirlar = posterler.map((poster) => {
      const p = kayitli.get(poster.id);
      return [
        poster.no,
        poster.konu,
        poster.title,
        ...kriterler.map((k) => (p ? p[k.key] : "")),
        p ? genelPuanOf(p) : "",
        p?.yorum ?? "",
      ];
    });
    const metin = [basliklar, ...satirlar].map((row) => row.map(csvEscape).join(";")).join("\r\n");
    const blob = new Blob(["﻿" + metin], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `poster-puanlarim-${juriAdi.replace(/[^\p{L}\p{N}]+/gu, "-")}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function bitir() {
    const bekleyen = readJson<string[]>(pendingKey(token), []).length;
    const uyari =
      bekleyen > 0
        ? `${bekleyen} posterin puanı henüz gönderilemedi. Yine de bitirmek istiyor musunuz?`
        : eksik > 0
          ? `${eksik} poster puanlanmadı. Yine de değerlendirmeyi bitirmek istiyor musunuz? Daha sonra aynı bağlantıdan devam edebilirsiniz.`
          : "Değerlendirmeyi bitirmek istiyor musunuz? Ekibe bilgi gidecek; sonradan puanlarınızı güncelleyebilirsiniz.";
    if (!window.confirm(uyari)) return;

    setBitiriyor(true);
    setBitirMesaj("");
    try {
      const res = await fetch("/api/juri-bitir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setBitirMesaj(data.error ?? "İşlem tamamlanamadı, tekrar deneyin.");
      } else if (data.throttled) {
        setBitirMesaj("Bilgi zaten kısa süre önce iletildi. Teşekkür ederiz.");
      } else {
        setBitirMesaj(
          `Teşekkür ederiz. ${data.done} / ${data.total} poster değerlendirmeniz ekibe iletildi.` +
            (data.juriMail ? " Size de bir teşekkür maili gönderdik." : ""),
        );
      }
    } catch {
      setBitirMesaj("Bağlantı hatası, tekrar deneyin.");
    }
    setBitiriyor(false);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-h2-bg">
      <PreviewHeader />

      <main className="mx-auto max-w-6xl px-4 pb-12 pt-28 lg:pb-16 lg:pt-32">
        <div className="mb-8">
          <span className="text-h2-micro font-semibold uppercase tracking-[0.13em] text-h2-ink-3">
            Jüri Değerlendirme Paneli
          </span>
          <h1 className="mt-4 font-display text-[clamp(30px,4vw,46px)] font-bold leading-[1.06] tracking-[-0.04em] text-h2-ink-1">
            Hoş geldiniz, {juriAdi}
            <span className="text-h2-cyan">.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-h2-body leading-relaxed text-h2-ink-2">
            Her posteri açıp PDF&apos;ini inceleyin, beş kriteri 1 (zayıf) ile 5 (çok iyi) arasında puanlayın ve
            &quot;Puanları Kaydet&quot; butonuna basın. Kapatıp aynı bağlantıdan döndüğünüzde kaldığınız yerden
            devam edebilirsiniz. Kendi öğrencinizin veya kurumunuzun posterini puanlamayın.
          </p>
          <p className="mt-3 text-h2-small text-h2-ink-3">Son değerlendirme tarihi: {sonTarih}</p>
        </div>

        <div className="mb-6 rounded-h2-lg border border-h2-border bg-h2-surface-2 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-h2-body font-semibold text-h2-ink-1">
              {tamamlananSayi} / {posterler.length} poster puanlandı
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={csvIndir}
                className="rounded-h2-md border border-h2-border px-4 py-2 text-h2-small font-semibold text-h2-ink-1 transition-colors hover:border-h2-blue/45"
              >
                Puanlarımı indir (CSV)
              </button>
              <a
                href={`/juri/${token}/ozet`}
                target="_blank"
                rel="noreferrer"
                className="rounded-h2-md border border-h2-border px-4 py-2 text-h2-small font-semibold text-h2-ink-1 transition-colors hover:border-h2-blue/45"
              >
                Puanlarımın özeti (PDF) →
              </a>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-h2-bg">
            <div
              className="h-full bg-h2-cyan transition-all"
              style={{ width: `${posterler.length ? (tamamlananSayi / posterler.length) * 100 : 0}%` }}
            />
          </div>
          {bekleyenSayisi > 0 && (
            <p className="mt-3 text-h2-small text-red-300">
              {bekleyenSayisi} posterin puanı gönderilemedi; bu tarayıcıda saklanıyor ve bağlantı gelince otomatik
              gönderilecek.{" "}
              <button type="button" onClick={bekleyenleriGonder} className="underline">
                Şimdi dene
              </button>
            </p>
          )}
        </div>

        <div className="space-y-4">
          {posterler.map((poster) => (
            <PosterCard
              key={poster.id}
              token={token}
              poster={poster}
              mevcut={mevcutMap.get(poster.id)}
              onSaved={onSaved}
              onPendingChange={bekleyenGuncelle}
            />
          ))}
        </div>

        <div className="mt-10 rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6">
          <h2 className="font-display text-h2-h4 font-semibold text-h2-ink-1">Değerlendirmeyi bitir</h2>
          <p className="mt-2 text-h2-small text-h2-ink-2">
            Puanlamayı bitirdiğinizde ekibe bilgi gider ve size teşekkür maili gönderilir. Sonrasında da son tarihe
            kadar bu bağlantıdan puanlarınızı güncelleyebilirsiniz.
          </p>
          <button
            type="button"
            onClick={bitir}
            disabled={bitiriyor}
            className="mt-4 rounded-h2-md bg-h2-blue px-6 py-3 text-h2-small font-bold text-white transition-all hover:bg-h2-blue/85 disabled:opacity-50"
          >
            {bitiriyor ? "Gönderiliyor..." : "Değerlendirmeyi Bitir"}
          </button>
          {bitirMesaj && <p className="mt-3 text-h2-small text-h2-cyan">{bitirMesaj}</p>}
        </div>
      </main>
      <TrialFooter />
    </div>
  );
}
