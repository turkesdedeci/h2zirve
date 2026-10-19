"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PreviewHeader from "@/components/home/PreviewHeader";
import TrialFooter from "@/components/home/TrialFooter";

export default function JuriOrtakGiris({ juriler }: { juriler: { id: string; ad_soyad: string }[] }) {
  const router = useRouter();
  const [id, setId] = useState("");
  const [pin, setPin] = useState("");
  const [hata, setHata] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  async function gonder(event: React.FormEvent) {
    event.preventDefault();
    setHata("");
    setYukleniyor(true);
    try {
      const res = await fetch("/api/juri-ortak-giris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, pin }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setHata(data.error ?? "Giriş yapılamadı.");
        setYukleniyor(false);
        return;
      }
      router.push(`/juri/${data.token}`);
    } catch {
      setHata("Bağlantı hatası, tekrar deneyin.");
      setYukleniyor(false);
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-h2-bg">
      <PreviewHeader />
      <main className="mx-auto max-w-md px-4 pb-12 pt-32">
        <span className="text-h2-micro font-semibold uppercase tracking-[0.13em] text-h2-ink-3">
          Jüri Değerlendirme Paneli
        </span>
        <h1 className="mt-4 font-display text-[clamp(26px,4vw,36px)] font-bold leading-[1.1] tracking-[-0.03em] text-h2-ink-1">
          Jüri girişi<span className="text-h2-cyan">.</span>
        </h1>
        <p className="mt-4 text-h2-body leading-relaxed text-h2-ink-2">
          Listeden adınızı seçin ve komite grubunda paylaşılan 4 haneli jüri kodunu girin.
        </p>

        <form onSubmit={gonder} noValidate className="mt-6 space-y-4">
          <div>
            <label htmlFor="juri-ad" className="mb-1.5 block text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3">
              Adınız
            </label>
            <select
              id="juri-ad"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full rounded-h2-md border border-h2-border bg-h2-bg px-4 py-3 text-h2-body text-h2-ink-1 outline-none focus:border-h2-blue"
            >
              <option value="">Seçiniz…</option>
              {juriler.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.ad_soyad}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="juri-kod" className="mb-1.5 block text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3">
              Jüri kodu
            </label>
            <input
              id="juri-kod"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              placeholder="0000"
              className="w-full rounded-h2-md border border-h2-border bg-h2-bg px-4 py-3 text-center font-mono text-xl tracking-[0.5em] text-h2-ink-1 outline-none focus:border-h2-blue"
            />
          </div>
          {hata && <p className="text-h2-micro text-red-400">{hata}</p>}
          <button
            type="submit"
            disabled={yukleniyor || !id || pin.length !== 4}
            className="w-full rounded-h2-md bg-h2-blue py-3 text-h2-small font-bold text-white transition-all hover:bg-h2-blue/85 disabled:opacity-50"
          >
            {yukleniyor ? "Kontrol ediliyor..." : "Giriş Yap"}
          </button>
        </form>
      </main>
      <TrialFooter />
    </div>
  );
}
