import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { oturumKonusmacilari, soruOturumu } from "@/data/soru-oturumlari";
import SoruFormu from "./SoruFormu";

export const metadata: Metadata = {
  title: "Soru sor – Türkiye Hidrojen Zirvesi 2026",
  robots: { index: false, follow: false },
};

export default async function SoruSayfasi({ params }: { params: Promise<{ oturum: string }> }) {
  const { oturum } = await params;
  const o = soruOturumu(oturum);
  if (!o) notFound();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-5 bg-h2-bg px-4 py-8 text-h2-ink-1">
      <div>
        <p className="text-h2-small font-semibold uppercase tracking-wide text-h2-blue">
          Türkiye Hidrojen Zirvesi 2026 · {o.gun} {o.saat}
        </p>
        <h1 className="mt-2 text-xl font-bold leading-snug">{o.baslik}</h1>
        <p className="mt-2 text-h2-small text-h2-ink-2">
          Sorunuzu yazın; moderatör uygun anda konuşmacılara iletecektir.
        </p>
      </div>
      <SoruFormu oturum={o.slug} konusmacilar={oturumKonusmacilari(o.slug)} />
    </main>
  );
}
