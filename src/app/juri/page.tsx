import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import JuriOrtakGiris from "./JuriOrtakGiris";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Jüri Girişi", robots: { index: false, follow: false } };

export default async function JuriGirisPage() {
  const { data } = await supabaseAdmin
    .from("juri_uyeleri")
    .select("id, ad_soyad")
    .eq("aktif", true);

  const juriler = (data ?? []).sort((a, b) => a.ad_soyad.localeCompare(b.ad_soyad, "tr"));
  return <JuriOrtakGiris juriler={juriler} />;
}
