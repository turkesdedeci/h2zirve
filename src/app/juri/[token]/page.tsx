import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { posterGroups } from "@/data/accepted-posters";
import eslesme from "@/data/juri-poster-eslesme.json";
import JuriDegerlendirmeForm, { type Poster, type MevcutDegerlendirme } from "./JuriDegerlendirmeForm";

const TOKEN_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function JuriPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  if (!TOKEN_RE.test(token)) {
    notFound();
  }

  const { data: juror } = await supabaseAdmin
    .from("juri_uyeleri")
    .select("id, ad_soyad, aktif")
    .eq("token", token)
    .maybeSingle();

  if (!juror || !juror.aktif) {
    notFound();
  }

  // Jüri yalnızca kabul edilen ve final A2 PDF'i alınmış posterleri görür.
  const links = eslesme as Record<string, { id: string; pdf: string }>;
  const posters: Poster[] = posterGroups.flatMap((g) =>
    g.posters
      .filter((p) => links[p.no])
      .map((p) => ({ id: links[p.no].id, no: p.no, title: p.title, konu: g.name, pdf_url: links[p.no].pdf })),
  );

  const { data: mevcutDegerlendirmeler } = await supabaseAdmin
    .from("poster_degerlendirmeleri")
    .select(
      "poster_id, bilimsel_icerik, metodoloji, gorsel_tasarim, sunum_netligi, soru_cevap, genel_puan, yorum"
    )
    .eq("juri_id", juror.id);

  return (
    <JuriDegerlendirmeForm
      token={token}
      juriAdi={juror.ad_soyad}
      posterler={posters}
      mevcutDegerlendirmeler={(mevcutDegerlendirmeler ?? []) as MevcutDegerlendirme[]}
    />
  );
}
