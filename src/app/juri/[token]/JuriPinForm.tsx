"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PreviewHeader from "@/components/home/PreviewHeader";
import TrialFooter from "@/components/home/TrialFooter";

export default function JuriPinForm({ token, juriAdi }: { token: string; juriAdi: string }) {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [hata, setHata] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  async function gonder(event: React.FormEvent) {
    event.preventDefault();
    setHata("");
    setYukleniyor(true);

    try {
      const res = await fetch("/api/juri-giris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, pin }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setHata(data.error ?? "Giriş yapılamadı.");
        setYukleniyor(false);
        return;
      }

      router.refresh();
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
          Hoş geldiniz, {juriAdi}
          <span className="text-h2-cyan">.</span>
        </h1>
        <p className="mt-4 text-h2-body leading-relaxed text-h2-ink-2">
          Devam etmek için size ayrıca iletilen 6 haneli PIN&apos;i girin.
        </p>

        <form onSubmit={gonder} noValidate className="mt-6 space-y-4">
          <div>
            <label htmlFor="juri-pin" className="mb-1.5 block text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3">
              PIN
            </label>
            <input
              id="juri-pin"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="w-full rounded-h2-md border border-h2-border bg-h2-bg px-4 py-3 text-center font-mono text-xl tracking-[0.4em] text-h2-ink-1 outline-none focus:border-h2-blue"
            />
          </div>
          {hata && <p className="text-h2-micro text-red-400">{hata}</p>}
          <button
            type="submit"
            disabled={yukleniyor || pin.length !== 6}
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
