import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { pinFor } from "@/lib/juriAuth";

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

  const { data, error } = await supabaseAdmin
    .from("juri_uyeleri")
    .select("id, ad_soyad, email, token, aktif, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ juriler: (data ?? []).map((j) => ({ ...j, pin: pinFor(j.token) })) });
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  let body: { ad_soyad?: unknown; email?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const adSoyad = typeof body.ad_soyad === "string" ? body.ad_soyad.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!adSoyad) {
    return NextResponse.json({ error: "Ad soyad zorunludur." }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("juri_uyeleri")
    .insert([{ ad_soyad: adSoyad, email: email || null }])
    .select("id, ad_soyad, email, token, aktif, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ juri: { ...data, pin: pinFor(data.token) } });
}

export async function PATCH(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  let body: { id?: unknown; aktif?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const id = typeof body.id === "string" ? body.id : "";
  const aktif = typeof body.aktif === "boolean" ? body.aktif : undefined;

  if (!id || aktif === undefined) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("juri_uyeleri")
    .update({ aktif })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
