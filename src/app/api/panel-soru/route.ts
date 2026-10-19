import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { tooManyAttempts } from "@/lib/juriAuth";
import { soruOturumu } from "@/data/soru-oturumlari";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { oturum?: unknown; ad_soyad?: unknown; soru?: unknown; website?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  // Bot tuzağı: gizli alan doluysa sessizce başarılı say.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (typeof body.oturum !== "string" || !soruOturumu(body.oturum)) {
    return NextResponse.json({ error: "Oturum bulunamadı." }, { status: 404 });
  }

  const soru = typeof body.soru === "string" ? body.soru.trim().replace(/\s+/g, " ") : "";
  if (soru.length < 3 || soru.length > 400) {
    return NextResponse.json({ error: "Soru 3–400 karakter arasında olmalı." }, { status: 400 });
  }
  const ad = typeof body.ad_soyad === "string" ? body.ad_soyad.trim().slice(0, 80) : "";

  // Salonda herkes aynı kampüs ağından gelebilir; sınır bilerek yüksek tutuldu.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  if (tooManyAttempts(`soru:${ip}`, 200, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Çok fazla istek. Lütfen biraz sonra tekrar deneyin." }, { status: 429 });
  }

  const { error } = await supabaseAdmin
    .from("panel_sorulari")
    .insert({ oturum: body.oturum, ad_soyad: ad || null, soru });
  if (error) {
    return NextResponse.json({ error: "Soru kaydedilemedi, lütfen tekrar deneyin." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
