import { NextResponse } from "next/server";

export const runtime = "nodejs";

const allowedTypes = new Set(["poster", "stand", "sponsorluk"]);

type BackupPayload = {
  type?: unknown;
  payload?: unknown;
};

export async function POST(request: Request) {
  let body: BackupPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz yedekleme verisi." }, { status: 400 });
  }

  const type = typeof body.type === "string" ? body.type : "";

  if (!allowedTypes.has(type) || typeof body.payload !== "object" || body.payload === null) {
    return NextResponse.json({ error: "Eksik veya hatalı yedekleme verisi." }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const webhookSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

  if (!webhookUrl) {
    console.warn("Google Sheets backup skipped: GOOGLE_SHEETS_WEBHOOK_URL is not set.");
    return NextResponse.json({ ok: false, skipped: true });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "h2zirve",
        type,
        secret: webhookSecret,
        submittedAt: new Date().toISOString(),
        payload: body.payload,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("Google Sheets backup failed", {
        status: response.status,
        statusText: response.statusText,
        body: text.slice(0, 500),
      });

      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Google Sheets backup request failed", error);
    return NextResponse.json({ ok: false }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
