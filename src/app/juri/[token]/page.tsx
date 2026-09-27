import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
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

  const { data: posters } = await supabaseAdmin
    .from("poster_basvurulari")
    .select("id, ad_soyad, kurum, poster_basligi, konu_basligi, pdf_url")
    .neq("durum", "reddedildi")
    .order("poster_basligi", { ascending: true });

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
      posterler={(posters ?? []) as Poster[]}
      mevcutDegerlendirmeler={(mevcutDegerlendirmeler ?? []) as MevcutDegerlendirme[]}
    />
  );
}
