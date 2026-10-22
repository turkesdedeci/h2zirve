"use client";

import { useState } from "react";

const inputCls =
  "w-full rounded-h2-md border border-h2-border bg-h2-bg px-4 py-3 text-base text-h2-ink-1 outline-none transition-colors placeholder:text-h2-ink-disabled focus:border-h2-blue";

export default function SoruFormu({ oturum, konusmacilar }: { oturum: string; konusmacilar: string[] }) {
  const [soru, setSoru] = useState("");
  const [ad, setAd] = useState("");
  const [kime, setKime] = useState("");
  const [website, setWebsite] = useState("");
  const [durum, setDurum] = useState<"hazir" | "gonderiliyor" | "tamam">("hazir");
  const [hata, setHata] = useState("");
  const maxSoruLength = kime ? 400 - `→ ${kime}: `.length : 400;

  async function gonder(e: React.FormEvent) {
    e.preventDefault();
    setHata("");
    setDurum("gonderiliyor");
    try {
      const res = await fetch("/api/panel-soru", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oturum, soru, ad_soyad: ad, kime, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setHata(data.error ?? "Soru gönderilemedi.");
        setDurum("hazir");
        return;
      }
      setDurum("tamam");
    } catch {
      setHata("Bağlantı hatası. Lütfen tekrar deneyin.");
      setDurum("hazir");
    }
  }

  if (durum === "tamam") {
    return (
      <div className="rounded-h2-md border border-h2-border p-5">
        <p className="text-lg font-semibold">Sorunuz iletildi, teşekkürler.</p>
        <button
          type="button"
          onClick={() => {
            setSoru("");
            setDurum("hazir");
          }}
          className="mt-4 w-full rounded-h2-md bg-h2-blue px-4 py-3 text-base font-semibold text-white"
        >
          Yeni soru sor
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={gonder} className="flex flex-col gap-3">
      {konusmacilar.length > 0 && (
        <label className="flex flex-col gap-1.5 text-h2-small font-medium">
          Soruyu kime soruyorsunuz? (isteğe bağlı)
          <select value={kime} onChange={(e) => setKime(e.target.value)} className={inputCls}>
            <option value="">Tüm panelistler</option>
            {konusmacilar.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className="flex flex-col gap-1.5 text-h2-small font-medium">
        Sorunuz
        <textarea
          required
          rows={5}
          maxLength={maxSoruLength}
          value={soru}
          onChange={(e) => setSoru(e.target.value)}
          placeholder="Sorunuzu buraya yazın"
          className={inputCls}
        />
        <span className="self-end text-xs text-h2-ink-disabled">{soru.length}/{maxSoruLength}</span>
      </label>
      <label className="flex flex-col gap-1.5 text-h2-small font-medium">
        Adınız Soyadınız
        <input
          required
          value={ad}
          maxLength={80}
          onChange={(e) => setAd(e.target.value)}
          className={inputCls}
          placeholder="Ad Soyad"
        />
        <span className="text-xs font-normal text-h2-ink-disabled">Anonim soru kabul edilmez. Kişi başı en fazla 5 soru sorulabilir.</span>
      </label>
      {/* Bot tuzağı */}
      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        name="website"
      />
      {soru.length > maxSoruLength && <p className="text-h2-small text-red-500">Konuşmacı adını dahil etmek için soruyu kısaltın.</p>}
      {hata && <p className="text-h2-small text-red-500">{hata}</p>}
      <button
        type="submit"
        disabled={durum === "gonderiliyor" || soru.trim().length < 3 || ad.trim().length < 3 || soru.length > maxSoruLength}
        className="rounded-h2-md bg-h2-blue px-4 py-3 text-base font-semibold text-white disabled:opacity-50"
      >
        {durum === "gonderiliyor" ? "Gönderiliyor…" : "Soruyu gönder"}
      </button>
    </form>
  );
}
