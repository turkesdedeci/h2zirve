import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  cookieName,
  isValidToken,
  pinMatches,
  sessionValue,
  tooManyAttempts,
} from "@/lib/juriAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { token?: unknown; pin?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (!isValidToken(body.token)) {
    return NextResponse.json({ error: "Geçersiz bağlantı." }, { status: 400 });
  }

  const token = body.token;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";

  if (tooManyAttempts(`t:${token}`) || tooManyAttempts(`ip:${ip}`, 30)) {
    return NextResponse.json(
      { error: "Çok fazla deneme yapıldı. Lütfen 15 dakika sonra tekrar deneyin." },
      { status: 429 },
    );
  }

  const { data: juror } = await supabaseAdmin
    .from("juri_uyeleri")
    .select("id, aktif")
    .eq("token", token)
    .maybeSingle();

  if (!juror || !juror.aktif || !pinMatches(token, body.pin)) {
    return NextResponse.json({ error: "PIN hatalı." }, { status: 403 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookieName(token), sessionValue(token), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return response;
}
