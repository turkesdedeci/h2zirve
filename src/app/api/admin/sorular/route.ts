import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { soruOturumu } from "@/data/soru-oturumlari";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Yönetici şifresi veya (tanımlıysa) moderatör kodu ile erişilir.
function checkAuth(request: Request) {
  const key = request.headers.get("x-admin-key");
  if (!key) return false;
  const admin = process.env.ADMIN_PASSWORD;
  const mod = process.env.MODERATOR_PIN;
  return (Boolean(admin) && key === admin) || (Boolean(mod) && key === mod);
}

export async function GET(request: Request) {
  if (!checkAuth(request)) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  const oturum = new URL(request.url).searchParams.get("oturum") ?? "";
  if (!soruOturumu(oturum)) return NextResponse.json({ error: "Oturum bulunamadı." }, { status: 404 });

  const { data, error } = await supabaseAdmin
    .from("panel_sorulari")
    .select("id, created_at, ad_soyad, soru, durum")
    .eq("oturum", oturum)
    .neq("durum", "gizli")
    .order("created_at", { ascending: true })
    .limit(500);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ sorular: data ?? [] });
}

export async function PATCH(request: Request) {
  if (!checkAuth(request)) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  let body: { id?: unknown; durum?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }
  if (typeof body.id !== "string" || !["bekliyor", "soruldu", "gizli"].includes(String(body.durum))) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }
  const { error } = await supabaseAdmin.from("panel_sorulari").update({ durum: body.durum }).eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
