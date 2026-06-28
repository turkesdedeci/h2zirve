// Google Apps Script webhook for H2 Zirve backup submissions.
// 1. Create a Google Sheet with three tabs:
//    Poster Özeti, Stand Başvuruları, Sponsorluk Başvuruları
// 2. Paste this file into Extensions > Apps Script.
// 3. Set SHEET_ID and WEBHOOK_SECRET below.
// 4. Deploy > New deployment > Web app:
//    Execute as: Me
//    Who has access: Anyone
// 5. Put the deployment URL into GOOGLE_SHEETS_WEBHOOK_URL.
// 6. Put the same WEBHOOK_SECRET into GOOGLE_SHEETS_WEBHOOK_SECRET.

const SHEET_ID = "PASTE_GOOGLE_SHEET_ID_HERE";
const WEBHOOK_SECRET = "CHANGE_THIS_TO_A_LONG_RANDOM_SECRET";

const TAB_NAMES = {
  poster: "Poster Özeti",
  stand: "Stand Başvuruları",
  sponsorluk: "Sponsorluk Başvuruları",
};

const HEADERS = {
  poster: [
    "Yedeklenme Tarihi",
    "Poster Başlığı",
    "Yazarlar",
    "Sorumlu Yazar",
    "E-posta",
    "Kurum",
    "Telefon",
    "Çalışma Alanı",
    "TRL",
    "Öne Çıkan Katkı",
    "Prototip",
    "Prototip Açıklama",
    "Sergi İhtiyaçları",
    "Notlar",
    "PDF URL",
    "Özet",
  ],
  stand: [
    "Yedeklenme Tarihi",
    "Firma Adı",
    "Segment",
    "Yetkili Kişi",
    "E-posta",
    "Telefon",
    "Web Sitesi",
    "Sektör",
    "Ürün Açıklaması",
    "Stand İhtiyacı",
    "Özel İhtiyaçlar",
    "Notlar",
  ],
  sponsorluk: [
    "Yedeklenme Tarihi",
    "Firma Adı",
    "Yetkili Kişi",
    "E-posta",
    "Telefon",
    "Web Sitesi",
    "Sponsorluk Tipi",
    "Bütçe Aralığı",
    "Görünürlük Beklentisi",
    "Notlar",
  ],
};

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");

    if (body.source !== "h2zirve") {
      return json({ ok: false, error: "Invalid source" });
    }

    if (WEBHOOK_SECRET && body.secret !== WEBHOOK_SECRET) {
      return json({ ok: false, error: "Invalid secret" });
    }

    const type = body.type;
    const payload = body.payload || {};
    const submittedAt = body.submittedAt || new Date().toISOString();
    const tabName = TAB_NAMES[type];

    if (!tabName) {
      return json({ ok: false, error: "Invalid type" });
    }

    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(tabName) || spreadsheet.insertSheet(tabName);
    ensureHeaders(sheet, HEADERS[type]);
    sheet.appendRow(buildRow(type, payload, submittedAt));

    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: String(error) });
  }
}

function ensureHeaders(sheet, headers) {
  const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const isEmpty = current.every((cell) => cell === "");
  if (isEmpty) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }
}

function buildRow(type, payload, submittedAt) {
  if (type === "poster") {
    return [
      submittedAt,
      value(payload.poster_basligi),
      value(payload.yazarlar),
      value(payload.ad_soyad),
      value(payload.email),
      value(payload.kurum),
      value(payload.telefon),
      value(payload.konu_basligi),
      value(payload.trl),
      value(payload.katkisi),
      value(payload.prototip),
      value(payload.prototip_aciklama),
      value(payload.sergi_ihtiyaclari),
      value(payload.notlar),
      value(payload.pdf_url),
      value(payload.ozet),
    ];
  }

  if (type === "stand") {
    return [
      submittedAt,
      value(payload.firma_adi),
      value(payload.segment),
      value(payload.yetkili_kisi),
      value(payload.email),
      value(payload.telefon),
      value(payload.web_sitesi),
      value(payload.sektor),
      value(payload.urun_aciklamasi),
      value(payload.stand_ihtiyaci),
      value(payload.ozel_ihtiyaclar),
      value(payload.notlar),
    ];
  }

  return [
    submittedAt,
    value(payload.firma_adi),
    value(payload.yetkili_kisi),
    value(payload.email),
    value(payload.telefon),
    value(payload.web_sitesi),
    value(payload.sponsor_tipi),
    value(payload.butce_araligi),
    value(payload.gorunurluk_beklentisi),
    value(payload.notlar),
  ];
}

function value(input) {
  if (Array.isArray(input)) {
    return input.join(", ");
  }
  return input == null ? "" : String(input);
}

function json(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
