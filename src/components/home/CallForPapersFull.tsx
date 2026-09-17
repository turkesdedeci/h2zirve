import s from "./cfp.module.css";

const topics = [
  "Hidrojen üretim teknolojileri",
  "Depolama ve taşıma teknolojileri",
  "Hidrojen dağıtım altyapısı",
  "Yakıt hücreleri (PEM, SOFC, SOEC)",
  "Endüstriyel uygulamalar",
  "Enerji sistemleri entegrasyonu",
  "Karbon azaltımı ve sürdürülebilirlik",
  "Hidrojen ekonomisi ve politikalar",
  "Güvenlik, standartlar ve regülasyonlar",
  "Mobilite ve ulaşım uygulamaları",
];

const facts = [
  { label: "Son Başvuru", value: "22 Eylül 2026", accent: true },
  { label: "En Yüksek Ödül", value: "1500 $" },
  { label: "Poster Formatı", value: "A2 dikey" },
  { label: "Sunum Dili", value: "TR / EN" },
];

const awards = [
  { title: "Prof. Dr. T. Nejat Veziroğlu Özel Ödülü", amount: "1500 $", top: true },
  { title: "İkincilik Ödülü", amount: "1000 $" },
  { title: "Üçüncülük Ödülü", amount: "500 $" },
];

const dates = [
  { value: "22 Eylül 2026", label: "Genişletilmiş özet başvurusu için son gün", accent: true },
  { value: "2 Ekim 2026", label: "Kabul bildirimlerinin yapılması" },
  { value: "12 Ekim 2026", label: "Kabul edilen poster dosyalarının yüklenmesi" },
  { value: "22–23 Ekim 2026", label: "Zirve ve poster sunumları" },
];

const formatRules = [
  "A2 dikey poster formatı",
  "Türkçe veya İngilizce sunum",
  "Minimum 28 pt okunabilir yazı boyutu",
  "Başlık, yazarlar, kurum, anahtar kelimeler, amaç, yöntem, sonuç ve önem bilgisi",
];

const journals = [
  "International Journal of Hydrogen Energy (SCI)",
  "Energy Studies (TR Dizin)",
  "International Journal of Energy Horizon (DergiPark)",
];

export default function CallForPapersFull() {
  return (
    <section id="cfp" className={s.cfp}>
      <header className={s.head}>
        <p className={s.eyebrow}>22–23 Ekim 2026 · AYBÜ Etlik Kongre Salonu</p>
        <h1>
          Poster çağrısı<span>.</span>
        </h1>
        <p className={s.lead}>
          Hidrojen teknolojileri alanında yürüttüğünüz akademik veya endüstriyel
          çalışmaları, Türkiye&apos;nin hidrojen ekosistemini bir araya getiren bu
          platformda paylaşmaya davet ediyoruz. Seçilen çalışmalar ödüllendirilir ve
          dergi özel sayılarına davet edilir.
        </p>
        <div className={s.headActions}>
          <a className={s.primary} href="/poster-basvurusu">
            Poster özeti başvurusu yap <span aria-hidden="true">↗</span>
          </a>
          <a className={s.ghost} href="/templates/poster-extended-abstract.docx">
            Özet şablonunu indir <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <dl className={s.facts}>
        {facts.map(({ label, value, accent }) => (
          <div key={label} className={s.fact} data-accent={Boolean(accent)}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <div className={s.section}>
        <div className={s.sectionHead}>
          <h2>Kapsam</h2>
          <p>
            Aşağıdaki başlıklar öncelikli kapsamı tanımlar; hidrojen ekosistemine
            katkı sunan diğer çalışmalar da değerlendirmeye alınır.
          </p>
        </div>
        <div className={s.topics}>
          {topics.map((topic, index) => (
            <div key={topic} className={s.topic}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {topic}
            </div>
          ))}
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionHead}>
          <h2>Ödüller</h2>
          <p>Değerlendirme kurulunun seçtiği çalışmalara takdim edilir.</p>
        </div>
        <div className={s.awards}>
          {awards.map(({ title, amount, top }) => (
            <div key={title} className={s.award} data-top={Boolean(top)}>
              <p>{title}</p>
              <strong>{amount}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className={s.section}>
        <div className={s.sectionHead}>
          <h2>Önemli tarihler</h2>
        </div>
        <dl className={s.timeline}>
          {dates.map(({ value, label, accent }) => (
            <div key={value} className={s.stage} data-accent={Boolean(accent)}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={s.section}>
        <div className={s.twoCol}>
          <div className={s.panel}>
            <h3>Poster formatı</h3>
            <p>Kabul edilen çalışmalar aşağıdaki kurallara göre hazırlanır.</p>
            <ul>
              {formatRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
            <div className={s.panelActions}>
              <a className={s.ghost} href="/templates/hidrojen-zirvesi-a2-poster-sablonu.pdf">
                Poster şablonu (PDF) <span aria-hidden="true">↓</span>
              </a>
              <a className={s.ghost} href="/templates/hidrojen-zirvesi-a2-poster-sablonu.pptx">
                Poster şablonu (PPTX) <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className={s.panel}>
            <h3>Özel sayı daveti</h3>
            <p>
              Seçilen posterler, genişletilmiş makale olarak aşağıdaki dergilerin
              özel sayılarında değerlendirilmek üzere davet edilir.
            </p>
            <ul>
              {journals.map((journal) => (
                <li key={journal}>{journal}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={s.apply}>
        <div>
          <h2>Başvurunuzu iletin</h2>
          <p>
            Poster özeti başvuruları 22 Eylül 2026 tarihine kadar alınır. Poster
            dosyası yükleme süreci, kabul bildirimi sonrasında açılır.
          </p>
        </div>
        <a className={s.primary} href="/poster-basvurusu">
          Poster özeti başvurusu yap <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
