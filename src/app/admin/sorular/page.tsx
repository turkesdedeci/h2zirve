"use client";

import { useCallback, useEffect, useState } from "react";
import { soruOturumlari } from "@/data/soru-oturumlari";

interface Soru {
  id: string;
  created_at: string;
  ad_soyad: string | null;
  soru: string;
  durum: "bekliyor" | "soruldu" | "gizli";
}

const KEY = "h2zirve_admin_key";

function saat(iso: string) {
  return new Date(iso).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}

export default function AdminSorularPage() {
  const [sifre, setSifre] = useState("");
  const [girdi, setGirdi] = useState("");
  const [oturum, setOturum] = useState(soruOturumlari[0].slug);
  const [sorular, setSorular] = useState<Soru[]>([]);
  const [hata, setHata] = useState("");
  const [yetkili, setYetkili] = useState(false);

  const yukle = useCallback(async () => {
    if (!sifre) return;
    try {
      const res = await fetch(`/api/admin/sorular?oturum=${oturum}`, {
        headers: { "x-admin-key": sifre },
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) {
        setHata(res.status === 401 ? "Şifre hatalı." : (data.error ?? "Yüklenemedi."));
        if (res.status === 401) {
          setYetkili(false);
          try {
            sessionStorage.removeItem(KEY);
          } catch {}
        }
        return;
      }
      setHata("");
      setYetkili(true);
      setSorular(data.sorular);
    } catch {
      setHata("Bağlantı hatası, yeniden deneniyor…");
    }
  }, [sifre, oturum]);

  useEffect(() => {
    try {
      const k = sessionStorage.getItem(KEY);
      if (k) setSifre(k);
    } catch {}
  }, []);

  useEffect(() => {
    if (!sifre) return;
    yukle();
    const t = setInterval(yukle, 4000);
    return () => clearInterval(t);
  }, [sifre, yukle]);

  async function isaretle(id: string, durum: Soru["durum"]) {
    setSorular((s) => s.map((x) => (x.id === id ? { ...x, durum } : x)));
    await fetch("/api/admin/sorular", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-key": sifre },
      body: JSON.stringify({ id, durum }),
    });
    yukle();
  }

  if (!yetkili) {
    return (
      <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-3 bg-h2-bg px-4 text-h2-ink-1">
        <h1 className="text-xl font-bold">Soru yönetimi</h1>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            try {
              sessionStorage.setItem(KEY, girdi);
            } catch {}
            setSifre(girdi);
          }}
        >
          <input
            type="password"
            value={girdi}
            onChange={(e) => setGirdi(e.target.value)}
            placeholder="Şifre"
            className="rounded-h2-md border border-h2-border bg-h2-bg px-4 py-3"
          />
          <button className="rounded-h2-md bg-h2-blue px-4 py-3 font-semibold text-white">Giriş</button>
          {hata && <p className="text-h2-small text-red-500">{hata}</p>}
        </form>
      </main>
    );
  }

  const bekleyen = sorular.filter((s) => s.durum === "bekliyor");
  const sorulan = sorular.filter((s) => s.durum === "soruldu");

  return (
    <main className="mx-auto max-w-3xl bg-h2-bg px-4 py-6 text-h2-ink-1">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-bold">Soru yönetimi</h1>
        <select
          value={oturum}
          onChange={(e) => setOturum(e.target.value)}
          className="min-w-0 flex-1 rounded-h2-md border border-h2-border bg-h2-bg px-3 py-2"
        >
          {soruOturumlari.map((o) => (
            <option key={o.slug} value={o.slug}>
              {o.gun} {o.saat} · {o.baslik}
            </option>
          ))}
        </select>
      </div>
      {hata && <p className="mb-3 text-h2-small text-red-500">{hata}</p>}
      <p className="mb-3 text-h2-small text-h2-ink-2">
        {bekleyen.length} bekleyen · {sorulan.length} sorulan · 4 sn'de bir yenilenir
      </p>

      <ul className="flex flex-col gap-3">
        {bekleyen.map((s) => (
          <li key={s.id} className="rounded-h2-md border border-h2-border p-4">
            <p className="text-lg leading-snug">{s.soru}</p>
            <p className="mt-1 text-h2-small text-h2-ink-2">
              {s.ad_soyad || "Anonim"} · {saat(s.created_at)}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => isaretle(s.id, "soruldu")}
                className="rounded-h2-md bg-h2-blue px-4 py-2 text-h2-small font-semibold text-white"
              >
                Soruldu
              </button>
              <button
                onClick={() => isaretle(s.id, "gizli")}
                className="rounded-h2-md border border-h2-border px-4 py-2 text-h2-small"
              >
                Gizle
              </button>
            </div>
          </li>
        ))}
        {bekleyen.length === 0 && <li className="text-h2-ink-2">Bekleyen soru yok.</li>}
      </ul>

      {sorulan.length > 0 && (
        <>
          <h2 className="mb-2 mt-8 text-h2-small font-semibold uppercase tracking-wide text-h2-ink-2">Sorulanlar</h2>
          <ul className="flex flex-col gap-2">
            {sorulan.map((s) => (
              <li key={s.id} className="flex items-start justify-between gap-3 rounded-h2-md border border-h2-border p-3 opacity-70">
                <span>
                  {s.soru} <span className="text-h2-small text-h2-ink-2">— {s.ad_soyad || "Anonim"}</span>
                </span>
                <button onClick={() => isaretle(s.id, "bekliyor")} className="shrink-0 text-h2-small underline">
                  Geri al
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
