import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { posterGroups } from "@/data/accepted-posters";
import eslesme from "@/data/juri-poster-eslesme.json";
import { isValidToken, sessionFromCookieHeader } from "@/lib/juriAuth";
import { sendJuriMail } from "@/lib/juriMail";

export const runtime = "nodejs";

const ADMIN_MAIL = process.env.JURI_BILDIRIM_MAILI || "h2zirvesi@tespam.org";
const links = eslesme as Record<string, { id: string; pdf: string }>;
const lastSent = new Map<string, number>();

export async function POST(request: Request) {
  let body: { token?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (!isValidToken(body.token)) {
    return NextResponse.json({ error: "Geçersiz bağlantı." }, { status: 400 });
  }

  const token = body.token;

  if (!sessionFromCookieHeader(request.headers.get("cookie"), token)) {
    return NextResponse.json({ error: "Oturum gerekli. Sayfayı yenileyip PIN'i girin." }, { status: 401 });
  }

  const { data: juror } = await supabaseAdmin
    .from("juri_uyeleri")
    .select("id, ad_soyad, email, aktif")
    .eq("token", token)
    .maybeSingle();

  if (!juror || !juror.aktif) {
    return NextResponse.json({ error: "Geçersiz veya pasif jüri linki." }, { status: 403 });
  }

  const acceptedIds = new Set(Object.values(links).map((l) => l.id));
  const total = acceptedIds.size;

  const { data: puanlar, error } = await supabaseAdmin
    .from("poster_degerlendirmeleri")
    .select("poster_id, genel_puan")
    .eq("juri_id", juror.id);

  if (error) {
    return NextResponse.json({ error: "Puanlar okunamadı: " + error.message }, { status: 500 });
  }

  const own = (puanlar ?? []).filter((p) => acceptedIds.has(p.poster_id));
  const done = own.length;
  const avg = done ? own.reduce((t, p) => t + p.genel_puan, 0) / done : 0;

  // Aynı jüriden art arda gelen bildirimleri engelle (en iyi çaba).
  const now = Date.now();
  const last = lastSent.get(token) ?? 0;
  const throttled = now - last < 10 * 60 * 1000;
  if (!throttled) lastSent.set(token, now);

  const eksik = total - done;
  const durum = eksik === 0 ? "TAMAMLADI" : `YARIM BIRAKTI (${eksik} poster eksik)`;
  const konuGrubu = posterGroups.length;

  let adminMail = false;
  let juriMail = false;

  if (!throttled) {
    adminMail = await sendJuriMail({
      to: ADMIN_MAIL,
      subject: `Poster jürisi: ${juror.ad_soyad} – ${durum}`,
      text: `${juror.ad_soyad} poster değerlendirmesini bitirdi olarak işaretledi.\n\nDurum: ${durum}\nPuanlanan poster: ${done} / ${total}\nGenel puan ortalaması: ${avg ? avg.toFixed(2) : "-"}\n\nTüm sonuçlar: https://www.hidrojenzirvesi.com/admin/sonuclar\n(${konuGrubu} konu grubu, kabul edilen posterler)`,
    });

    if (juror.email) {
      juriMail = await sendJuriMail({
        to: juror.email,
        subject: "Türkiye Hidrojen Zirvesi 2026 – Poster değerlendirmeniz için teşekkürler",
        text: `Sayın ${juror.ad_soyad},\n\nPoster değerlendirmenizi tamamladığınız için teşekkür ederiz.\n\nDurum: ${done} / ${total} poster puanlandı${eksik ? ` (${eksik} poster puanlanmadı)` : ""}.\nPuanlarınız kaydedilmiştir; son değerlendirme tarihine kadar aynı bağlantıdan dönüp güncelleyebilirsiniz.\nPuanlarınızın yazdırılabilir özetine bağlantı sayfasındaki "Puanlarımın özeti" bölümünden ulaşabilirsiniz.\n\nSaygılarımızla,\nTürkiye Hidrojen Zirvesi 2026\nZirve Sekretaryası\nAYBÜ H2 TEAM & TESPAM\nhttps://www.hidrojenzirvesi.com\nh2zirvesi@tespam.org\n`,
      });
    }
  }

  return NextResponse.json({ ok: true, done, total, eksik, adminMail, juriMail, throttled });
}
