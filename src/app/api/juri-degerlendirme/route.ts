import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const TOKEN_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Body = {
  token?: unknown;
  poster_id?: unknown;
  bilimsel_icerik?: unknown;
  metodoloji?: unknown;
  gorsel_tasarim?: unknown;
  sunum_netligi?: unknown;
  soru_cevap?: unknown;
  genel_puan?: unknown;
  yorum?: unknown;
};

function scoreInRange(value: unknown, min: number, max: number) {
  return typeof value === "number" && Number.isInteger(value) && value >= min && value <= max;
}

export async function POST(request: Request) {
  let body: Body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const token = typeof body.token === "string" ? body.token : "";
  const posterId = typeof body.poster_id === "string" ? body.poster_id : "";

  if (!TOKEN_RE.test(token) || !TOKEN_RE.test(posterId)) {
    return NextResponse.json({ error: "Geçersiz token veya poster." }, { status: 400 });
  }

  const scores = {
    bilimsel_icerik: body.bilimsel_icerik,
    metodoloji: body.metodoloji,
    gorsel_tasarim: body.gorsel_tasarim,
    sunum_netligi: body.sunum_netligi,
    soru_cevap: body.soru_cevap,
  };

  for (const value of Object.values(scores)) {
    if (!scoreInRange(value, 1, 5)) {
      return NextResponse.json({ error: "Kriter puanları 1-5 arasında olmalıdır." }, { status: 400 });
    }
  }

  if (!scoreInRange(body.genel_puan, 1, 10)) {
    return NextResponse.json({ error: "Genel puan 1-10 arasında olmalıdır." }, { status: 400 });
  }

  const yorum = typeof body.yorum === "string" ? body.yorum.slice(0, 2000) : null;

  const { data: juror, error: jurorError } = await supabaseAdmin
    .from("juri_uyeleri")
    .select("id, aktif")
    .eq("token", token)
    .maybeSingle();

  if (jurorError || !juror || !juror.aktif) {
    return NextResponse.json({ error: "Geçersiz veya pasif jüri linki." }, { status: 403 });
  }

  const { error: upsertError } = await supabaseAdmin
    .from("poster_degerlendirmeleri")
    .upsert(
      {
        poster_id: posterId,
        juri_id: juror.id,
        ...scores,
        genel_puan: body.genel_puan,
        yorum,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "poster_id,juri_id" }
    );

  if (upsertError) {
    return NextResponse.json({ error: "Kaydedilirken hata oluştu: " + upsertError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
