import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { soruOturumu } from "@/data/soru-oturumlari";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Soru yönetimi yalnızca ana yönetici şifresiyle kullanılabilir.
function checkAuth(request: Request) {
  const key = request.headers.get("x-admin-key");
  const admin = process.env.ADMIN_PASSWORD;
  if (!key || !admin) return false;
  const received = Buffer.from(key);
  const expected = Buffer.from(admin);
  return received.length === expected.length && timingSafeEqual(received, expected);
}

function databaseReady() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

const noStore = { "Cache-Control": "private, no-store" };

export async function GET(request: Request) {
  if (!checkAuth(request)) return NextResponse.json({ error: "Yetkisiz." }, { status: 401, headers: noStore });
  if (!databaseReady()) return NextResponse.json({ error: "Soru sistemi yapılandırılmamış." }, { status: 503, headers: noStore });
  const oturum = new URL(request.url).searchParams.get("oturum") ?? "";
  if (!soruOturumu(oturum)) return NextResponse.json({ error: "Oturum bulunamadı." }, { status: 404 });

  const { data, error } = await supabaseAdmin
    .from("panel_sorulari")
    .select("id, created_at, ad_soyad, soru, durum")
    .eq("oturum", oturum)
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) return NextResponse.json({ error: "Sorular yüklenemedi." }, { status: 500, headers: noStore });
  return NextResponse.json({ sorular: data ?? [] }, { headers: noStore });
}

export async function PATCH(request: Request) {
  if (!checkAuth(request)) return NextResponse.json({ error: "Yetkisiz." }, { status: 401, headers: noStore });
  if (!databaseReady()) return NextResponse.json({ error: "Soru sistemi yapılandırılmamış." }, { status: 503, headers: noStore });
  let body: { id?: unknown; durum?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }
  if (typeof body.id !== "string" || !/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(body.id) || !["bekliyor", "soruldu", "gizli"].includes(String(body.durum))) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin.from("panel_sorulari")
    .update({ durum: body.durum })
    .eq("id", body.id)
    .select("id")
    .maybeSingle();
  if (error) return NextResponse.json({ error: "Soru güncellenemedi." }, { status: 500, headers: noStore });
  if (!data) return NextResponse.json({ error: "Soru bulunamadı." }, { status: 404, headers: noStore });
  return NextResponse.json({ ok: true }, { headers: noStore });
}
