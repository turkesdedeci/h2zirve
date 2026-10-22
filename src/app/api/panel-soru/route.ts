import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { tooManyAttempts } from "@/lib/juriAuth";
import { oturumKonusmacilari, soruOturumu } from "@/data/soru-oturumlari";

export const runtime = "nodejs";

const MAX_SORU = 5;

export async function POST(request: Request) {
  let body: { oturum?: unknown; ad_soyad?: unknown; soru?: unknown; kime?: unknown; website?: unknown };
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json({ error: "İstek okunamadı." }, { status: 400 });
  }
  if (raw.length > 4096) {
    return NextResponse.json({ error: "İstek çok büyük." }, { status: 413 });
  }
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  // Bot tuzağı: gizli alan doluysa sessizce başarılı say.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (typeof body.oturum !== "string" || !soruOturumu(body.oturum)) {
    return NextResponse.json({ error: "Oturum bulunamadı." }, { status: 404 });
  }

  // Kime: yalnızca o oturumun konuşmacılarından biri kabul edilir; veritabanı değişikliği
  // gerektirmesin diye sorunun başına eklenir ("→ Ad Soyad: soru").
  const kime =
    typeof body.kime === "string" && oturumKonusmacilari(body.oturum).includes(body.kime) ? body.kime : "";
  const metin = typeof body.soru === "string" ? body.soru.trim().replace(/\s+/g, " ") : "";
  const soru = kime ? `→ ${kime}: ${metin}` : metin;
  if (metin.length < 3 || soru.length > 400) {
    return NextResponse.json(
      { error: `Soru 3–${kime ? 400 - kime.length - 4 : 400} karakter arasında olmalı.` },
      { status: 400 },
    );
  }
  const ad = typeof body.ad_soyad === "string" ? body.ad_soyad.trim().replace(/\s+/g, " ").slice(0, 80) : "";
  if (ad.length < 3 || !ad.includes(" ")) {
    return NextResponse.json({ error: "Lütfen adınızı ve soyadınızı yazın." }, { status: 400 });
  }

  // Salonda herkes aynı kampüs ağından gelebilir; sınır bilerek yüksek tutuldu.
  const ip = request.headers.get("x-real-ip")?.trim()
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
  if (tooManyAttempts(`soru:${ip}`, 200, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Çok fazla istek. Lütfen biraz sonra tekrar deneyin." }, { status: 429 });
  }

  // Kişi başı (oturum + ad soyad) en fazla MAX_SORU soru.
  const { count, error: sayimHata } = await supabaseAdmin
    .from("panel_sorulari")
    .select("id", { count: "exact", head: true })
    .eq("oturum", body.oturum)
    .ilike("ad_soyad", ad.replace(/[\\%_]/g, "\\$&"));
  if (sayimHata) {
    return NextResponse.json({ error: "Soru kaydedilemedi, lütfen tekrar deneyin." }, { status: 500 });
  }
  if ((count ?? 0) >= MAX_SORU) {
    return NextResponse.json(
      { error: `Bir kişi en fazla ${MAX_SORU} soru sorabilir. Hakkınızı doldurdunuz.` },
      { status: 429 },
    );
  }

  const { error } = await supabaseAdmin
    .from("panel_sorulari")
    .insert({ oturum: body.oturum, ad_soyad: ad, soru });
  if (error) {
    return NextResponse.json({ error: "Soru kaydedilemedi, lütfen tekrar deneyin." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
