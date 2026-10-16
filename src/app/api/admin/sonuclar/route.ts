import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import eslesme from "@/data/juri-poster-eslesme.json";
import { posterGroups } from "@/data/accepted-posters";

export const runtime = "nodejs";

function checkAuth(request: Request) {
  const key = request.headers.get("x-admin-key");
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && key === expected;
}

export async function GET(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  // Sonuçlar yalnızca kabul edilen ve final A2 PDF'i alınmış 53 poster için hesaplanır.
  const links = eslesme as Record<string, { id: string; pdf: string }>;
  const posterler = posterGroups.flatMap((g) =>
    g.posters
      .filter((p) => links[p.no])
      .map((p) => ({ id: links[p.no].id, no: p.no, poster_basligi: p.title, ad_soyad: p.author, kurum: "", konu_basligi: g.name })),
  );
  const toplamPoster = posterler.length;

  const { data: degerlendirmeler, error: degError } = await supabaseAdmin
    .from("poster_degerlendirmeleri")
    .select(
      "poster_id, juri_id, updated_at, bilimsel_icerik, metodoloji, gorsel_tasarim, sunum_netligi, soru_cevap, genel_puan"
    );

  if (degError) {
    return NextResponse.json({ error: degError.message }, { status: 500 });
  }

  const gruplu = new Map<string, typeof degerlendirmeler>();
  for (const d of degerlendirmeler ?? []) {
    const liste = gruplu.get(d.poster_id) ?? [];
    liste.push(d);
    gruplu.set(d.poster_id, liste);
  }

  const ortalama = (sayilar: number[]) =>
    sayilar.length === 0 ? null : sayilar.reduce((a, b) => a + b, 0) / sayilar.length;

  const sonuclar = (posterler ?? []).map((poster) => {
    const oylar = gruplu.get(poster.id) ?? [];
    return {
      poster_id: poster.id,
      poster_no: poster.no,
      poster_basligi: poster.poster_basligi,
      ad_soyad: poster.ad_soyad,
      kurum: poster.kurum,
      konu_basligi: poster.konu_basligi,
      oy_sayisi: oylar.length,
      ortalama_genel_puan: ortalama(oylar.map((o) => o.genel_puan)),
      ortalama_bilimsel_icerik: ortalama(oylar.map((o) => o.bilimsel_icerik)),
      ortalama_metodoloji: ortalama(oylar.map((o) => o.metodoloji)),
      ortalama_gorsel_tasarim: ortalama(oylar.map((o) => o.gorsel_tasarim)),
      ortalama_sunum_netligi: ortalama(oylar.map((o) => o.sunum_netligi)),
      ortalama_soru_cevap: ortalama(oylar.map((o) => o.soru_cevap)),
    };
  });

  sonuclar.sort((a, b) => {
    if (a.ortalama_genel_puan === null) return 1;
    if (b.ortalama_genel_puan === null) return -1;
    return b.ortalama_genel_puan - a.ortalama_genel_puan;
  });

  const { data: juriler } = await supabaseAdmin.from("juri_uyeleri").select("id, ad_soyad, email, aktif");
  const gecerli = new Set(posterler.map((p) => p.id));
  const juriIlerleme = (juriler ?? []).map((j) => {
    const kendi = (degerlendirmeler ?? []).filter((d) => d.juri_id === j.id && gecerli.has(d.poster_id));
    const son = kendi.map((d) => d.updated_at).sort().pop() ?? null;
    return { juri_id: j.id, ad_soyad: j.ad_soyad, email: j.email, aktif: j.aktif, puanlanan: kendi.length, toplam: toplamPoster, son_guncelleme: son };
  });

  return NextResponse.json({ sonuclar, juriIlerleme });
}
