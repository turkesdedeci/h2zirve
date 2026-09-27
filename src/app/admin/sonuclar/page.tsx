"use client";

import { useEffect, useState } from "react";
import PreviewHeader from "@/components/home/PreviewHeader";
import TrialFooter from "@/components/home/TrialFooter";

interface Sonuc {
  poster_id: string;
  poster_basligi: string;
  ad_soyad: string;
  kurum: string;
  konu_basligi: string;
  oy_sayisi: number;
  ortalama_genel_puan: number | null;
  ortalama_bilimsel_icerik: number | null;
  ortalama_metodoloji: number | null;
  ortalama_gorsel_tasarim: number | null;
  ortalama_sunum_netligi: number | null;
  ortalama_soru_cevap: number | null;
}

const inputCls =
  "min-w-0 w-full rounded-h2-md border border-h2-border bg-h2-bg px-4 py-3 text-h2-small text-h2-ink-1 outline-none transition-colors placeholder:text-h2-ink-disabled focus:border-h2-blue";

function fmt(n: number | null) {
  return n === null ? "-" : n.toFixed(1);
}

export default function AdminSonuclarPage() {
  const [sifre, setSifre] = useState("");
  const [dogrulandi, setDogrulandi] = useState(false);
  const [girisHata, setGirisHata] = useState("");

  const [sonuclar, setSonuclar] = useState<Sonuc[]>([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState("");

  async function fetchSonuclar(key: string) {
    setYukleniyor(true);
    setHata("");
    try {
      const res = await fetch("/api/admin/sonuclar", {
        headers: { "x-admin-key": key },
      });
      const data = await res.json();
      if (!res.ok) {
        setHata(data.error ?? "Yüklenemedi.");
        return false;
      }
      setSonuclar(data.sonuclar);
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
    const ok = await fetchSonuclar(sifre);
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
      fetchSonuclar(kayitliSifre).then((ok) => {
        if (ok) setDogrulandi(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!dogrulandi) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-h2-bg px-4">
        <form
          onSubmit={girisYap}
          className="w-full max-w-sm space-y-4 rounded-h2-lg border border-h2-border bg-h2-surface-2 p-8"
        >
          <h1 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
            Poster Sonuçları
          </h1>
          <div>
            <label
              htmlFor="admin-sifre"
              className="mb-1.5 block text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3"
            >
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

      <main className="mx-auto max-w-6xl px-4 pb-12 pt-28 lg:pb-16 lg:pt-32">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-[clamp(28px,3.6vw,40px)] font-bold leading-[1.06] tracking-[-0.04em] text-h2-ink-1">
            Poster Sonuçları<span className="text-h2-cyan">.</span>
          </h1>
          <a
            href="/admin/juri"
            className="rounded-h2-md border border-h2-border px-4 py-2 text-h2-small font-semibold text-h2-ink-1 transition-colors hover:border-h2-blue/45"
          >
            Jüri Yönetimi →
          </a>
        </div>

        {hata && <p className="mb-4 text-h2-micro text-red-400">{hata}</p>}

        <div className="overflow-x-auto rounded-h2-lg border border-h2-border">
          <table className="w-full min-w-[900px] border-collapse text-left text-h2-small">
            <thead>
              <tr className="border-b border-h2-border bg-h2-surface-2 text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Poster</th>
                <th className="px-4 py-3">Yazar / Kurum</th>
                <th className="px-4 py-3 text-center">Oy</th>
                <th className="px-4 py-3 text-center">Bilimsel</th>
                <th className="px-4 py-3 text-center">Metodoloji</th>
                <th className="px-4 py-3 text-center">Görsel</th>
                <th className="px-4 py-3 text-center">Sunum</th>
                <th className="px-4 py-3 text-center">Soru-Cevap</th>
                <th className="px-4 py-3 text-center">Genel</th>
              </tr>
            </thead>
            <tbody>
              {sonuclar.map((s, i) => (
                <tr
                  key={s.poster_id}
                  className="border-b border-h2-border/60 bg-h2-bg/40 align-top"
                >
                  <td className="px-4 py-3 text-h2-ink-3">{i + 1}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-h2-ink-1">{s.poster_basligi}</p>
                    <p className="mt-1 text-h2-micro text-h2-ink-3">{s.konu_basligi}</p>
                  </td>
                  <td className="px-4 py-3 text-h2-ink-2">
                    {s.ad_soyad}
                    <br />
                    <span className="text-h2-micro text-h2-ink-3">{s.kurum}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-h2-ink-2">{s.oy_sayisi}</td>
                  <td className="px-4 py-3 text-center text-h2-ink-2">
                    {fmt(s.ortalama_bilimsel_icerik)}
                  </td>
                  <td className="px-4 py-3 text-center text-h2-ink-2">
                    {fmt(s.ortalama_metodoloji)}
                  </td>
                  <td className="px-4 py-3 text-center text-h2-ink-2">
                    {fmt(s.ortalama_gorsel_tasarim)}
                  </td>
                  <td className="px-4 py-3 text-center text-h2-ink-2">
                    {fmt(s.ortalama_sunum_netligi)}
                  </td>
                  <td className="px-4 py-3 text-center text-h2-ink-2">
                    {fmt(s.ortalama_soru_cevap)}
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-h2-cyan">
                    {fmt(s.ortalama_genel_puan)}
                  </td>
                </tr>
              ))}
              {sonuclar.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-6 text-center text-h2-ink-3">
                    Henüz değerlendirme yok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <TrialFooter />
    </div>
  );
}
