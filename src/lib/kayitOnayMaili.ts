const SITE_URL = "https://www.hidrojenzirvesi.com";
const LOGO_URL = `${SITE_URL}/logos/turkiye-hidrojen-zirvesi-logo-v4.png`;
const WHATSAPP_URL = "https://whatsapp.com/channel/0029VbDtjhnInlqIHuZUOp2H";
const CONTACT_EMAIL = "h2zirvesi@tespam.org";

export const kayitOnaySubject =
  "Türkiye Hidrojen Zirvesi 2026 | Kaydınız alındı";

export const kayitOnayText = `Sayın Katılımcımız,

Türkiye Hidrojen Zirvesi 2026 katılımcı kaydınız alınmıştır; ilginiz için
teşekkür ederiz.

Zirveye ilişkin tüm duyuruları WhatsApp kanalımızdan paylaşacağız. Programı ve
zirve günlerindeki gelişmeleri takip edebilmek için kanala katılmanızı rica
ederiz.

DUYURU KANALI - Türkiye Hidrojen Zirvesi 2026 WhatsApp Kanalı
${WHATSAPP_URL}

Kesinleşen program ve oturum saatleri, konuşmacı duyuruları, poster ve sergi
bilgileri, kayıt ve ulaşım detayları bu kanaldan duyurulacaktır. Kanal tek
yönlüdür; numaranız diğer üyelerce görülmez.

Zirve 22-23 Ekim 2026 tarihlerinde Ankara Yıldırım Beyazıt Üniversitesi ev
sahipliğinde gerçekleştirilecektir. Güncel program: ${SITE_URL}

Sorularınız için bu e-postayı yanıtlayabilirsiniz.

Saygılarımızla,

Türkiye Hidrojen Zirvesi 2026
Zirve Sekretaryası
AYBÜ H2 TEAM & TESPAM
${SITE_URL}
${CONTACT_EMAIL}

---
Bu e-posta, Türkiye Hidrojen Zirvesi 2026 kayıt formunu doldurduğunuz için
gönderilmiştir.
`;

/**
 * Onay maili gövdesi. Mail istemcileri modern CSS desteklemediği için düzen
 * tablolarla, stiller satır içinde kurulur; site renkleri globals.css ile aynı.
 */
export const kayitOnayHtml = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<!--[if mso]>
<style>
  /* Outlook web fontu yüklemez; bilinmeyen font adında Times New Roman'a
     düşmemesi için Arial'a sabitleniyor. */
  body, table, td, div, p, a, span, strong { font-family: Arial, sans-serif !important; }
</style>
<![endif]-->
<title>Türkiye Hidrojen Zirvesi 2026</title>
</head>
<body style="margin:0; padding:0; background-color:#06091A;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#06091A" style="background-color:#06091A; padding:36px 16px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#0A0F24" style="width:600px; max-width:600px; background-color:#0A0F24; border:1px solid #1A2845; border-radius:12px; font-family:'Inter',Arial,Helvetica,sans-serif;">

  <tr>
    <td style="padding:32px 36px 0 36px;">
      <img src="${LOGO_URL}" alt="Türkiye Hidrojen Zirvesi 2026" width="230" style="display:block; border:0; width:230px; max-width:100%; height:auto; color:#F2F5FA; font-family:Arial,sans-serif; font-size:19px; font-weight:bold;">
    </td>
  </tr>
  <tr>
    <td style="padding:14px 36px 0 36px;">
      <div style="font-size:12px; letter-spacing:2px; color:#00C8FF; font-weight:bold; text-transform:uppercase;">22&#8211;23 Ekim 2026 &nbsp;&middot;&nbsp; AYB&Uuml;, Ankara</div>
    </td>
  </tr>
  <tr><td style="padding:22px 36px 0 36px;"><div style="border-top:1px solid #1A2845; font-size:0; line-height:0;">&nbsp;</div></td></tr>

  <tr>
    <td style="padding:24px 36px 0 36px; font-size:15px; line-height:26px; color:#B7C2D6;">
      <p style="margin:0 0 18px 0;">Say&#305;n Kat&#305;l&#305;mc&#305;m&#305;z,</p>
      <p style="margin:0 0 18px 0;">T&uuml;rkiye Hidrojen Zirvesi 2026 kat&#305;l&#305;mc&#305; kayd&#305;n&#305;z al&#305;nm&#305;&#351;t&#305;r; ilginiz i&ccedil;in te&#351;ekk&uuml;r ederiz.</p>
      <p style="margin:0 0 24px 0;">Zirveye ili&#351;kin t&uuml;m duyurular&#305; WhatsApp kanal&#305;m&#305;zdan payla&#351;aca&#287;&#305;z. Program&#305; ve zirve g&uuml;nlerindeki geli&#351;meleri takip edebilmek i&ccedil;in kanala kat&#305;lman&#305;z&#305; rica ederiz.</p>
    </td>
  </tr>

  <tr>
    <td style="padding:0 36px 26px 36px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0D1530" style="background-color:#0D1530; border:1px solid #1A2845; border-radius:12px;">
        <tr><td style="padding:24px 26px;">
          <div style="font-size:11px; letter-spacing:2px; color:#00C8FF; font-weight:bold; text-transform:uppercase; padding-bottom:10px;">Duyuru Kanal&#305;</div>
          <div style="font-size:19px; line-height:26px; font-weight:bold; color:#F2F5FA; font-family:'Space Grotesk',Arial,Helvetica,sans-serif; padding-bottom:12px;">T&uuml;rkiye Hidrojen Zirvesi 2026<br>WhatsApp Kanal&#305;</div>
          <div style="font-size:14px; line-height:23px; color:#B7C2D6; padding-bottom:20px;">
            Kesinle&#351;en program ve oturum saatleri, konu&#351;mac&#305; duyurular&#305;, poster ve sergi bilgileri, kay&#305;t ve ula&#351;&#305;m detaylar&#305; bu kanaldan duyurulacakt&#305;r.
          </div>
          <div style="padding-bottom:14px;">
            <a href="${WHATSAPP_URL}" style="display:inline-block; background-color:#0066CC; color:#ffffff; font-size:15px; font-weight:bold; text-decoration:none; padding:14px 28px; border-radius:6px; font-family:'Inter',Arial,Helvetica,sans-serif;">Kanala Kat&#305;l</a>
          </div>
          <div style="font-size:12px; line-height:20px; color:#7A8BA8;">
            <a href="${WHATSAPP_URL}" style="color:#00C8FF; text-decoration:none;">whatsapp.com/channel/0029VbDtjhnInlqIHuZUOp2H</a><br>
            Kanal tek y&ouml;nl&uuml;d&uuml;r; numaran&#305;z di&#287;er &uuml;yelerce g&ouml;r&uuml;lmez.
          </div>
        </td></tr>
      </table>
    </td>
  </tr>

  <tr>
    <td style="padding:0 36px 0 36px; font-size:15px; line-height:26px; color:#B7C2D6;">
      <p style="margin:0 0 20px 0;">Zirve, 22&#8211;23 Ekim 2026 tarihlerinde Ankara Y&#305;ld&#305;r&#305;m Beyaz&#305;t &Uuml;niversitesi ev sahipli&#287;inde ger&ccedil;ekle&#351;tirilecektir. G&uuml;ncel program:
        <a href="${SITE_URL}" style="color:#00C8FF; text-decoration:none;">hidrojenzirvesi.com</a></p>
      <p style="margin:0 0 28px 0;">Sorular&#305;n&#305;z i&ccedil;in bu e-postay&#305; yan&#305;tlayabilirsiniz.</p>
    </td>
  </tr>

  <tr>
    <td style="padding:0 36px 30px 36px;">
      <div style="border-top:1px solid #1A2845; padding-top:20px; font-size:14px; line-height:22px; color:#B7C2D6;">
        Sayg&#305;lar&#305;m&#305;zla,<br><br>
        <strong style="color:#F2F5FA; font-size:15px;">T&uuml;rkiye Hidrojen Zirvesi 2026</strong><br>
        <span style="color:#7A8BA8;">Zirve Sekretaryas&#305;</span><br>
        <span style="color:#7A8BA8;">AYB&Uuml; H2 TEAM &amp; TESPAM</span><br>
        <a href="${SITE_URL}" style="color:#00C8FF; text-decoration:none;">hidrojenzirvesi.com</a><br>
        <a href="mailto:${CONTACT_EMAIL}" style="color:#00C8FF; text-decoration:none;">${CONTACT_EMAIL}</a>
      </div>
    </td>
  </tr>

  <tr>
    <td bgcolor="#06091A" style="background-color:#06091A; border-top:1px solid #1A2845; border-radius:0 0 12px 12px; padding:18px 36px; font-size:11px; line-height:18px; color:#4B5A78;">
      Bu e-posta, T&uuml;rkiye Hidrojen Zirvesi 2026 kay&#305;t formunu doldurdu&#287;unuz i&ccedil;in g&ouml;nderilmi&#351;tir.
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
