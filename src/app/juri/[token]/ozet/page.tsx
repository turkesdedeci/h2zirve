import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { posterGroups } from "@/data/accepted-posters";
import eslesme from "@/data/juri-poster-eslesme.json";
import { cookieName, hasSession, isValidToken } from "@/lib/juriAuth";
import YazdirButonu from "./YazdirButonu";

export const dynamic = "force-dynamic";

const links = eslesme as Record<string, { id: string; pdf: string }>;

export default async function JuriOzetPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!isValidToken(token)) notFound();

  const jar = await cookies();
  if (!hasSession(jar.get(cookieName(token))?.value, token)) redirect(`/juri/${token}`);

  const { data: juror } = await supabaseAdmin
    .from("juri_uyeleri")
    .select("id, ad_soyad, aktif")
    .eq("token", token)
    .maybeSingle();
  if (!juror || !juror.aktif) notFound();

  const { data: puanlar } = await supabaseAdmin
    .from("poster_degerlendirmeleri")
    .select("poster_id, bilimsel_icerik, metodoloji, gorsel_tasarim, sunum_netligi, soru_cevap, genel_puan, yorum, updated_at")
    .eq("juri_id", juror.id);

  const byId = new Map((puanlar ?? []).map((p) => [p.poster_id, p]));
  const satirlar = posterGroups.flatMap((g) =>
    g.posters
      .filter((p) => links[p.no])
      .map((p) => ({ no: p.no, title: p.title, konu: g.name, puan: byId.get(links[p.no].id) })),
  );
  const done = satirlar.filter((s) => s.puan).length;
  const tarih = new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });

  return (
    <main className="mx-auto max-w-5xl bg-white p-6 text-[13px] text-black">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Türkiye Hidrojen Zirvesi 2026 – Poster Değerlendirme Özeti</h1>
          <p className="mt-1">Jüri üyesi: <strong>{juror.ad_soyad}</strong></p>
          <p>Puanlanan poster: <strong>{done} / {satirlar.length}</strong> · Oluşturulma: {tarih}</p>
          <p className="text-xs text-gray-600">Kriterler 1–5; genel puan = kriter ortalamasının 2 katı (10 üzerinden).</p>
        </div>
        <YazdirButonu />
      </div>
      <table className="w-full border-collapse text-left text-[12px]">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="py-1 pr-2">No</th>
            <th className="py-1 pr-2">Başlık</th>
            <th className="py-1 pr-1 text-center">Bil.</th>
            <th className="py-1 pr-1 text-center">Met.</th>
            <th className="py-1 pr-1 text-center">Tas.</th>
            <th className="py-1 pr-1 text-center">Sun.</th>
            <th className="py-1 pr-1 text-center">Katkı</th>
            <th className="py-1 pr-1 text-center">Genel</th>
            <th className="py-1">Yorum</th>
          </tr>
        </thead>
        <tbody>
          {satirlar.map((s) => (
            <tr key={s.no} className="break-inside-avoid border-b border-gray-300 align-top">
              <td className="py-1 pr-2 font-semibold">{s.no}</td>
              <td className="py-1 pr-2">{s.title}</td>
              <td className="py-1 text-center">{s.puan?.bilimsel_icerik ?? "-"}</td>
              <td className="py-1 text-center">{s.puan?.metodoloji ?? "-"}</td>
              <td className="py-1 text-center">{s.puan?.gorsel_tasarim ?? "-"}</td>
              <td className="py-1 text-center">{s.puan?.sunum_netligi ?? "-"}</td>
              <td className="py-1 text-center">{s.puan?.soru_cevap ?? "-"}</td>
              <td className="py-1 text-center font-bold">{s.puan?.genel_puan ?? "-"}</td>
              <td className="py-1 pl-2">{s.puan?.yorum ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
