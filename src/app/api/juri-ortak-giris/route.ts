import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { cookieName, sessionValue, tooManyAttempts } from "@/lib/juriAuth";

export const runtime = "nodejs";

const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function pinOk(input: unknown) {
  const expected = process.env.JURI_ORTAK_PIN;
  if (!expected || typeof input !== "string") return false;
  const a = Buffer.from(input.replace(/\s+/g, ""));
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  let body: { id?: unknown; pin?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (typeof body.id !== "string" || !ID_RE.test(body.id)) {
    return NextResponse.json({ error: "Lütfen listeden adınızı seçin." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  if (tooManyAttempts(`ortak:ip:${ip}`, 20)) {
    return NextResponse.json(
      { error: "Çok fazla deneme yapıldı. Lütfen 15 dakika sonra tekrar deneyin." },
      { status: 429 },
    );
  }

  if (!pinOk(body.pin)) {
    return NextResponse.json({ error: "Kod hatalı." }, { status: 403 });
  }

  const { data: juror } = await supabaseAdmin
    .from("juri_uyeleri")
    .select("token, aktif")
    .eq("id", body.id)
    .maybeSingle();

  if (!juror || !juror.aktif) {
    return NextResponse.json({ error: "Jüri üyesi bulunamadı." }, { status: 404 });
  }

  const response = NextResponse.json({ ok: true, token: juror.token });
  response.cookies.set(cookieName(juror.token), sessionValue(juror.token), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return response;
}
