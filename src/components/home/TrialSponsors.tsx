import Image from "next/image";
import s from "./sponsors.module.css";

const tiers = [
  { name: "Platin sponsor", tone: "platinum", logos: [{ name: "Hydrogenix", src: "/logos/hydrogenix.png", href: "https://www.hydrogenix.com.tr/", wide: true }, { name: "Roketsan", src: "/logos/roketsan.png", href: "https://www.roketsan.com.tr/", wide: true }] },
  { name: "Altın sponsor", tone: "gold", logos: [{ name: "Lentatek", src: "/logos/lentatek.png", href: "https://www.lentatek.com/tr", wide: true }] },
  { name: "Gümüş sponsor", tone: "silver", logos: [{ name: "Hidronerji", src: "/logos/hidronerji.png", href: "http://www.hidronerji.com.tr/", wide: false }, { name: "KUHyTech", src: "/logos/kuhytech.png", href: "https://kuhytech.ku.edu.tr/", wide: true }, { name: "IAHE", src: "/logos/iahe.png", href: "https://www.iahe.org/", wide: true }, { name: "International Journal of Hydrogen Energy", src: "/logos/ijhe.png", href: "https://www.sciencedirect.com/journal/international-journal-of-hydrogen-energy", wide: false }] },
  { name: "Destek sponsoru", tone: "support", logos: [{ name: "HORIBA", src: "/logos/horiba.svg", href: "https://www.horiba.com/", wide: true }, { name: "HaikuTech", src: "/logos/hakutech.png", href: "https://www.haikutech.com/", wide: true }, { name: "Magnum Mühendislik", src: "/logos/magnum.png", href: "", wide: true }, { name: "Debak", src: "/logos/debak.jpg", href: "https://debak.com.tr/", wide: true }] },
];

const exhibitors: { name: string; logo?: string; dark?: boolean }[] = [
  { name: "Bataryasan Enerji San. ve Tic. A.Ş.", logo: "/logos/bataryasan.png" },
  { name: "AYBÜ Yenilenebilir Enerji Topluluğu", logo: "/logos/aybu-yenilenebilir-enerji.png" },
  { name: "TÜBİTAK MAM", logo: "/logos/tubitak.png" },
  { name: "Horiba", logo: "/logos/horiba.svg" },
  { name: "Hydrogenix", logo: "/logos/hydrogenix.png" },
  { name: "Hidronerji Ltd. Şti.", logo: "/logos/hidronerji.png" },
  { name: "BSR Proje", logo: "/logos/bsr-proje.png", dark: true },
  { name: "Eskişehir Shell Eco-Marathon Takımı", logo: "/logos/hidroana.png", dark: true },
  { name: "Hydrolyx Enerji", logo: "/logos/hydrolyx.png" },
  { name: "AYBÜ HEZARFEN", logo: "/logos/aybu.png" },
  { name: "Koç Üniversitesi (KUHyTech)", logo: "/logos/kuhytech.png" },
  { name: "Armador Enerji & Yazılım", logo: "/logos/armador.png" },
  { name: "Phoenix Enerji A.Ş.", logo: "/logos/phoenix.png" },
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
    <div className={s.exhibitors}><h3><i aria-hidden="true" />Stand katılımcıları</h3><ul>{exhibitors.map(ex => <li key={ex.name} data-dark={ex.dark || undefined}>{ex.logo && <Image src={ex.logo} alt="" width={96} height={28} unoptimized={ex.logo.endsWith(".svg")} />}{ex.name}</li>)}</ul></div>
    <div className={s.join}><div><p>Türkiye Hidrojen Zirvesi 2026</p><h3>Markanız da burada yer alsın.</h3></div><a href="/sponsorluk-basvurusu">Sponsorluk başvurusu <span aria-hidden="true">↗</span></a></div>
  </section>;
}
