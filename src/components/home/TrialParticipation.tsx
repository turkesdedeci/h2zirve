import s from "./participation.module.css";
import PosterApplyLink from "@/components/PosterApplyLink";

export default function TrialParticipation() {
  return <section id="participate" className={s.section}>
    <header className={s.heading}><p>Zirvede yerinizi alın</p><h2>Fikrinizi paylaşın.<br /><span>Teknolojinizi gösterin.</span></h2></header>
    <div className={s.cards}>
      <article id="cfp" className={s.posterCard}>
        <div className={s.visual} aria-hidden="true">
          <span className={s.visualLabel}>ARAŞTIRMA / POSTER</span>
          <div className={s.paperBack} />
          <div className={s.paper}><span className={s.paperBrand}>H₂ / 2026</span><b>Bilimden<br />uygulamaya.</b><div className={s.paperRule} /><div className={s.paperChart}><i /><i /><i /><i /><i /></div><div className={s.paperText}><span /><span /><span /><span /></div></div>
          <div className={s.award}><span>En yüksek ödül</span><strong>75.000 <small>TL</small></strong></div>
        </div>
        <div className={s.content}><p className={s.audience}>Araştırmacılar için</p><h3>Poster sunun.</h3><p>Akademik ve endüstriyel çalışmalarınızı paylaşın. Seçilen çalışmalar için özel sayı daveti imkânı.</p><div className={s.fact}><span>Özet son başvuru</span><strong>22 Eylül 2026</strong></div><div className={s.actions}><PosterApplyLink className={s.primary}>Poster başvurusu <span aria-hidden="true">↗</span></PosterApplyLink><a href="/poster-cagrisi">Takvim ve koşullar <span aria-hidden="true">↗</span></a></div></div>
      </article>
      <article id="exhibitors" className={s.standCard}>
        <div className={s.visual} aria-hidden="true">
          <span className={s.visualLabel}>TEKNOLOJİ / SERGİ</span>
          <svg className={s.booth} viewBox="0 0 560 320" fill="none">
            <defs><linearGradient id="booth-wall" x1="110" y1="40" x2="390" y2="280" gradientUnits="userSpaceOnUse"><stop stopColor="#125fa3" /><stop offset="1" stopColor="#111b3c" /></linearGradient><linearGradient id="booth-floor"><stop stopColor="#0066cc" stopOpacity=".45"/><stop offset="1" stopColor="#00c8ff" stopOpacity=".08"/></linearGradient></defs>
            <path d="M55 232 284 123 512 229 282 309Z" fill="url(#booth-floor)" stroke="#2878ae"/>
            <path d="M110 223V64L286 23V181Z" fill="url(#booth-wall)" stroke="#37b8ed"/>
            <path d="M286 23 450 94V253L286 181Z" fill="#0d2246" stroke="#2c78b2"/>
            <path d="M110 64 286 23 450 94" stroke="#79e5ff" strokeWidth="5"/>
            <path d="M137 101 256 72V170L137 199Z" fill="#07132d" stroke="#0066cc"/>
            <path d="M156 165 178 137 197 145 218 109 240 103" stroke="#00c8ff" strokeWidth="3"/>
            <path d="M205 220 285 186 354 218 274 255Z" fill="#1c75aa" stroke="#68d7ff"/>
            <path d="M205 220V259L274 294V255Z" fill="#0b3e70" stroke="#2782b8"/>
            <path d="M274 255 354 218V258L274 294Z" fill="#0a254d" stroke="#2782b8"/>
            <text x="324" y="192" fill="#cef4ff" fontSize="47" fontWeight="500">H₂</text>
          </svg>
          <div className={s.startup}><span>Startup başvuruları</span><strong>Ücretsiz değerlendirme</strong></div>
        </div>
        <div className={s.content}><p className={s.audience}>Firmalar ve girişimler için</p><h3>Sergi alanında yer alın.</h3><p>Hidrojen alanındaki ürün, teknoloji ve prototiplerinizi araştırmacılar ve sektör temsilcileriyle buluşturun.</p><div className={s.fact}><span>KOBİ ve büyük firma</span><strong>Kapsama göre teklif</strong></div><div className={s.actions}><a className={s.primary} href="/stand-basvurusu">Stand başvurusu <span aria-hidden="true">↗</span></a><a href="/sponsorluk-basvurusu">Sponsorluk seçenekleri <span aria-hidden="true">↗</span></a></div></div>
      </article>
    </div>
  </section>;
}
