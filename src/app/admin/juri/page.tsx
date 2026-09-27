"use client";

import { useEffect, useState } from "react";
import PreviewHeader from "@/components/home/PreviewHeader";
import TrialFooter from "@/components/home/TrialFooter";

interface Juri {
  id: string;
  ad_soyad: string;
  email: string | null;
  token: string;
  aktif: boolean;
  created_at: string;
}

const inputCls =
  "min-w-0 w-full rounded-h2-md border border-h2-border bg-h2-bg px-4 py-3 text-h2-small text-h2-ink-1 outline-none transition-colors placeholder:text-h2-ink-disabled focus:border-h2-blue";

function siteUrl() {
  return typeof window !== "undefined" ? window.location.origin : "";
}

export default function AdminJuriPage() {
  const [sifre, setSifre] = useState("");
  const [dogrulandi, setDogrulandi] = useState(false);
  const [girisHata, setGirisHata] = useState("");

  const [juriler, setJuriler] = useState<Juri[]>([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");

  const [adSoyad, setAdSoyad] = useState("");
  const [email, setEmail] = useState("");
  const [ekleniyor, setEkleniyor] = useState(false);
  const [kopyalanan, setKopyalanan] = useState<string | null>(null);

  async function fetchJuriler(key: string) {
    setYukleniyor(true);
    setHata("");
    try {
      const res = await fetch("/api/admin/juri-uyeleri", {
        headers: { "x-admin-key": key },
      });
      const data = await res.json();
      if (!res.ok) {
        setHata(data.error ?? "Yüklenemedi.");
        return false;
      }
      setJuriler(data.juriler);
      return true;
    } catch {
      setHata("Bağlantı hatası.");
      return false;
    } finally {
      setYukleniyor(false);
    }
  }

  async function girisYap(e: React.FormEvent) {
    e.preventDefault();
    setGirisHata("");
    const ok = await fetchJuriler(sifre);
    if (ok) {
      setDogrulandi(true);
      sessionStorage.setItem("h2zirve_admin_key", sifre);
    } else {
      setGirisHata("Şifre hatalı veya bir sorun oluştu.");
    }
  }

  useEffect(() => {
    const kayitliSifre = sessionStorage.getItem("h2zirve_admin_key");
    if (kayitliSifre) {
      setSifre(kayitliSifre);
      fetchJuriler(kayitliSifre).then((ok) => {
        if (ok) setDogrulandi(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function juriEkle(e: React.FormEvent) {
    e.preventDefault();
    if (!adSoyad.trim()) return;

    setEkleniyor(true);
    setHata("");
    try {
      const res = await fetch("/api/admin/juri-uyeleri", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": sifre },
        body: JSON.stringify({ ad_soyad: adSoyad, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setHata(data.error ?? "Eklenemedi.");
        return;
      }
      setJuriler((current) => [data.juri, ...current]);
      setAdSoyad("");
      setEmail("");
    } catch {
      setHata("Bağlantı hatası.");
    } finally {
      setEkleniyor(false);
    }
  }

  async function durumDegistir(juri: Juri) {
    const yeniDurum = !juri.aktif;
    setJuriler((current) =>
      current.map((j) => (j.id === juri.id ? { ...j, aktif: yeniDurum } : j))
    );
    await fetch("/api/admin/juri-uyeleri", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-key": sifre },
      body: JSON.stringify({ id: juri.id, aktif: yeniDurum }),
    });
  }

  function linkKopyala(token: string) {
    const link = `${siteUrl()}/juri/${token}`;
    navigator.clipboard.writeText(link).then(() => {
      setKopyalanan(token);
      setTimeout(() => setKopyalanan(null), 1500);
    });
  }

  if (!dogrulandi) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-h2-bg px-4">
        <form
          onSubmit={girisYap}
          className="w-full max-w-sm space-y-4 rounded-h2-lg border border-h2-border bg-h2-surface-2 p-8"
        >
          <h1 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
            Jüri Yönetimi
          </h1>
          <div>
            <label htmlFor="admin-sifre" className="mb-1.5 block text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3">
              Yönetici Şifresi
            </label>
            <input
              id="admin-sifre"
              type="password"
              required
              value={sifre}
              onChange={(e) => setSifre(e.target.value)}
              className={inputCls}
            />
          </div>
          {girisHata && <p className="text-h2-micro text-red-400">{girisHata}</p>}
          <button
            type="submit"
            disabled={yukleniyor}
            className="w-full rounded-h2-md bg-h2-blue py-3 text-h2-small font-bold text-white transition-all hover:bg-h2-blue/85 disabled:opacity-50"
          >
            {yukleniyor ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-h2-bg">
      <PreviewHeader />

      <main className="mx-auto max-w-3xl px-4 pb-12 pt-28 lg:pb-16 lg:pt-32">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-[clamp(28px,3.6vw,40px)] font-bold leading-[1.06] tracking-[-0.04em] text-h2-ink-1">
            Jüri Yönetimi<span className="text-h2-cyan">.</span>
          </h1>
          <a
            href="/admin/sonuclar"
            className="rounded-h2-md border border-h2-border px-4 py-2 text-h2-small font-semibold text-h2-ink-1 transition-colors hover:border-h2-blue/45"
          >
            Sonuçları Gör →
          </a>
        </div>

        <form
          onSubmit={juriEkle}
          className="mt-8 space-y-4 rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6"
        >
          <h2 className="font-display text-h2-h4 font-semibold text-h2-ink-1">
            Yeni Jüri Üyesi Ekle
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="juri-ad" className="mb-1.5 block text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3">
                Ad Soyad *
              </label>
              <input
                id="juri-ad"
                required
                value={adSoyad}
                onChange={(e) => setAdSoyad(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="juri-email" className="mb-1.5 block text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3">
                E-posta (opsiyonel)
              </label>
              <input
                id="juri-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
              />
            </div>
          </div>
          {hata && <p className="text-h2-micro text-red-400">{hata}</p>}
          <button
            type="submit"
            disabled={ekleniyor}
            className="rounded-h2-md bg-h2-blue px-6 py-3 text-h2-small font-bold text-white transition-all hover:bg-h2-blue/85 disabled:opacity-50"
          >
            {ekleniyor ? "Ekleniyor..." : "Jüri Üyesi Ekle"}
          </button>
        </form>

        <div className="mt-8 space-y-3">
          {juriler.map((juri) => (
            <div
              key={juri.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-h2-lg border border-h2-border bg-h2-surface-2 p-5"
            >
              <div>
                <p className="font-semibold text-h2-ink-1">{juri.ad_soyad}</p>
                {juri.email && <p className="text-h2-micro text-h2-ink-3">{juri.email}</p>}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => linkKopyala(juri.token)}
                  className="rounded-h2-md border border-h2-border px-4 py-2 text-h2-micro font-semibold text-h2-ink-1 transition-colors hover:border-h2-blue/45"
                >
                  {kopyalanan === juri.token ? "Kopyalandı!" : "Linki Kopyala"}
                </button>
                <button
                  type="button"
                  onClick={() => durumDegistir(juri)}
                  className={`rounded-h2-md px-4 py-2 text-h2-micro font-semibold transition-colors ${
                    juri.aktif
                      ? "border border-h2-border text-h2-ink-2 hover:border-red-400/45"
                      : "border border-h2-cyan/40 text-h2-cyan"
                  }`}
                >
                  {juri.aktif ? "Pasifleştir" : "Aktifleştir"}
                </button>
              </div>
            </div>
          ))}
          {juriler.length === 0 && (
            <p className="text-h2-small text-h2-ink-3">Henüz jüri üyesi eklenmedi.</p>
          )}
        </div>
      </main>
      <TrialFooter />
    </div>
  );
}
