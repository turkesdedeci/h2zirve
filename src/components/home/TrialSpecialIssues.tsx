import Image from "next/image";
import s from "./specialIssues.module.css";

const ENERGIES_URL = "https://www.mdpi.com/si/291850";

const others = [
  { name: "International Journal of Hydrogen Energy", note: "SCI" },
  { name: "Energy Studies", note: "TR Dizin" },
  { name: "International Journal of Energy Horizon", note: "DergiPark" },
];

export default function TrialSpecialIssues() {
  return (
    <section id="ozel-sayilar" className={s.section} aria-labelledby="ozel-sayilar-baslik">
      <header className={s.heading}>
        <p className={s.eyebrow}>Özel sayılar</p>
        <h2 id="ozel-sayilar-baslik">
          Seçilen çalışmalar<br />
          <span>özel sayılara davet edilir.</span>
        </h2>
      </header>

      <div className={s.grid}>
        <article className={s.feature}>
          <a className={s.banner} href={ENERGIES_URL} target="_blank" rel="noopener noreferrer" aria-label="Energies özel sayı sayfası (yeni sekme)">
            <Image
              src="/special-issues/energies-banner.jpg"
              alt="Energies (MDPI) özel sayısı: Advances in Hydrogen Technologies: Production, Fuel Cells, Systems and Applications. Konuk editörler Prof. Dr. Selahattin Çelik ve Prof. Dr. Kamil Arslan. Son tarih 20 Nisan 2027."
              width={1200}
              height={630}
              sizes="(max-width: 900px) 100vw, 700px"
            />
          </a>
          <div className={s.copy}>
            <p className={s.label}><span aria-hidden="true">◆</span> Energies (MDPI) özel sayısı</p>
            <h3>Advances in Hydrogen Technologies: Production, Fuel Cells, Systems and Applications</h3>
            <dl className={s.meta}>
              <div><dt>Konuk editörler</dt><dd>Prof. Dr. Selahattin Çelik<br />Prof. Dr. Kamil Arslan</dd></div>
              <div><dt>Son gönderim tarihi</dt><dd>20 Nisan 2027</dd></div>
            </dl>
            <a className={s.cta} href={ENERGIES_URL} target="_blank" rel="noopener noreferrer">
              Özel sayı sayfası <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>

        <div className={s.others}>
          <p>
            Zirvede sunulan posterlerden seçilenler, genişletilmiş makale olarak aşağıdaki dergilerin özel sayılarında
            değerlendirilmek üzere davet edilir.
          </p>
          {others.map((journal) => (
            <div className={s.card} key={journal.name}>
              <b>{journal.name}</b>
              <span>{journal.note}</span>
            </div>
          ))}
          <a className={s.more} href="/poster-cagrisi">
            Poster çağrısı ve şablonlar <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
