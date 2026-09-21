import Image from "next/image";
import s from "./sponsors.module.css";

const tiers = [
  { name: "Platin sponsor", tone: "platinum", logos: [{ name: "Hydrogenix", src: "/logos/hydrogenix.png", href: "https://www.hydrogenix.com.tr/", wide: true }] },
  { name: "Altın sponsor", tone: "gold", logos: [{ name: "Lentatek", src: "/logos/lentatek.png", href: "https://www.lentatek.com/tr", wide: true }, { name: "Debak", src: "/logos/debak.jpg", href: "https://debak.com.tr/", wide: true }] },
  { name: "Gümüş sponsor", tone: "silver", logos: [{ name: "Hidronerji", src: "/logos/hidronerji.png", href: "http://www.hidronerji.com.tr/", wide: false }, { name: "KUHyTech", src: "/logos/kuhytech.png", href: "https://kuhytech.ku.edu.tr/", wide: true }] },
  { name: "Destek sponsoru", tone: "support", logos: [{ name: "Hidromek", src: "/logos/hidromek.png", href: "https://www.hidromek.com/", wide: true }, { name: "HORIBA", src: "/logos/horiba.svg", href: "https://www.horiba.com/", wide: true }, { name: "Baş Yapı", src: "/logos/besyapi.jpg", href: "https://besyapi.com/", wide: false }, { name: "HaikuTech", src: "/logos/hakutech.png", href: "https://www.haikutech.com/", wide: true }, { name: "Magnum Mühendislik", src: "/logos/magnum.png", href: "", wide: true }] },
];

export default function TrialSponsors() {
  return <section id="sponsors" className={s.section}>
    <header className={s.heading}><div><p className={s.eyebrow}>Kurumsal destek</p><h2>Zirvenin arkasındaki<br /><span>güçlü destek.</span></h2></div><a href="/sponsorluk-basvurusu">Sponsor olarak yer alın <span aria-hidden="true">↗</span></a></header>
    <article className={s.mainSponsor}>
      <a className={s.emblem} href="https://aybu.edu.tr/" target="_blank" rel="noopener noreferrer" aria-label="AYBÜ resmi sitesi (yeni sekme)"><span className={s.emblemRing} aria-hidden="true" /><Image src="/logos/aybu.png" alt="Ankara Yıldırım Beyazıt Üniversitesi amblemi" width={240} height={240} /></a>
      <div className={s.mainCopy}><p className={s.mainLabel}><span aria-hidden="true">◆</span> Ana sponsor</p><h3>Ankara Yıldırım<br />Beyazıt Üniversitesi</h3><p className={s.role}>Zirvenin ev sahipliği ve liderliği</p><span className={s.wordmark} aria-hidden="true">AYBÜ</span></div>
    </article>
    <div className={s.sponsorWall}>{tiers.map((tier) => <div className={s.tier} key={tier.name} data-tone={tier.tone}>
      <h3><i aria-hidden="true" />{tier.name}</h3>
      <div className={s.logos}>{tier.logos.map(logo => logo.href ? <a className={s.logo} key={logo.name} href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={`${logo.name} resmi sitesi (yeni sekme)`}><Image src={logo.src} alt={logo.name} width={280} height={120} unoptimized={logo.src.endsWith(".svg")} className={logo.wide ? s.wide : s.tall} /><span>{logo.name} <span aria-hidden="true">↗</span></span></a> : <div className={s.logo} key={logo.name} aria-label={logo.name}><Image src={logo.src} alt={logo.name} width={280} height={120} unoptimized={logo.src.endsWith(".svg")} className={logo.wide ? s.wide : s.tall} /><span>{logo.name}</span></div>)}</div>
    </div>)}</div>
    <div className={s.join}><div><p>Türkiye Hidrojen Zirvesi 2026</p><h3>Markanız da burada yer alsın.</h3></div><a href="/sponsorluk-basvurusu">Sponsorluk başvurusu <span aria-hidden="true">↗</span></a></div>
  </section>;
}
