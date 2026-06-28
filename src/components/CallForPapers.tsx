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

const dates = [
  { label: "Son Başvuru (Özet)", value: "1 Eylül 2026", highlight: true },
  { label: "Kabul Bildirimi", value: "10 Eylül 2026" },
  { label: "Poster Yükleme", value: "20 Eylül 2026" },
  { label: "Zirve Tarihleri", value: "22-23 Ekim 2026" },
];

const awards = [
  { title: "Prof. Dr. T. Nejat Veziroğlu Özel Ödülü", amount: "1500 $" },
  { title: "1.lik Ödülü", amount: "1000 $" },
  { title: "2.lik Ödülü", amount: "500 $" },
];

const journals = [
  "International Journal of Hydrogen Energy (SCI)",
  "Energy Studies (TR Dizin)",
  "International Journal of Energy Horizon (DergiPark)",
];

const formatRules = [
  "A1 dikey poster formatı",
  "Türkçe veya İngilizce sunum",
  "Minimum 28 pt okunabilir yazı boyutu",
  "Başlık, yazarlar, kurum, anahtar kelimeler, amaç, yöntem, sonuç ve önem bilgisi",
];

export default function CallForPapers() {
  return (
    <section id="cfp" className="bg-h2-surface-1 py-16 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-green">
              Akademik ve Endüstriyel Katkı
            </span>
            <h2 className="mt-3 font-display text-h2-h2 font-bold text-h2-ink-1 sm:text-h2-h1">
              Poster Çağrısı
            </h2>
            <p className="mt-5 max-w-3xl text-h2-body-lg leading-relaxed text-h2-ink-2">
              Hidrojen teknolojileri alanında yürüttüğünüz akademik veya
              endüstriyel çalışmaları, Türkiye&apos;nin hidrojen ekosistemini
              bir araya getiren bu önemli platformda paylaşmaya davet ediyoruz.
            </p>
          </div>

          <div className="rounded-h2-lg border border-h2-border bg-h2-bg/55 p-6">
            <p className="text-h2-micro font-semibold uppercase tracking-widest text-h2-cyan">
              Yer ve Tarih
            </p>
            <p className="mt-3 font-display text-h2-h3 font-semibold text-h2-ink-1">
              Ankara Yıldırım Beyazıt Üniversitesi, Etlik Kongre Salonu
            </p>
            <p className="mt-2 text-h2-small text-h2-ink-2">
              22-23 Ekim 2026
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6 lg:col-span-2">
            <h3 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
              Kapsam
            </h3>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-h2-border bg-h2-bg/40 px-4 py-2 text-h2-small text-h2-ink-2 transition-colors hover:border-h2-green/45 hover:text-h2-ink-1"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-h2-lg border border-h2-green/25 bg-h2-green/8 p-6 lg:col-span-2">
            <h3 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
              Ödüller
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {awards.map((award) => (
                <div
                  key={award.title}
                  className="rounded-h2-md border border-h2-green/20 bg-h2-bg/35 p-4"
                >
                  <p className="text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3">
                    {award.title}
                  </p>
                  <p className="mt-3 font-display text-h2-h3 font-bold text-h2-green">
                    {award.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6 lg:col-span-2">
            <h3 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
              Önemli Tarihler
            </h3>
            <div className="mt-5 space-y-2.5">
              {dates.map(({ label, value, highlight }) => (
                <div
                  key={label}
                  className={`flex items-center justify-between gap-4 rounded-h2-md border p-4 ${
                    highlight
                      ? "border-h2-green/35 bg-h2-green/10"
                      : "border-h2-border bg-h2-bg/35"
                  }`}
                >
                  <span className="text-h2-small text-h2-ink-2">{label}</span>
                  <span
                    className={`text-right text-h2-small font-semibold ${
                      highlight ? "text-h2-green" : "text-h2-ink-1"
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6 lg:col-span-2">
            <h3 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
              Poster Formatı
            </h3>
            <ul className="mt-5 space-y-3">
              {formatRules.map((rule) => (
                <li key={rule} className="flex gap-3 text-h2-small text-h2-ink-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-h2-cyan" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-h2-lg border border-h2-blue/25 bg-h2-blue/8 p-6 lg:col-span-2">
            <h3 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
              Özel Sayı Daveti
            </h3>
            <p className="mt-3 text-h2-small leading-relaxed text-h2-ink-2">
              Seçilen posterler, genişletilmiş makale olarak aşağıdaki
              dergilerin özel sayılarında değerlendirilmek üzere davet
              edilecektir.
            </p>
            <ul className="mt-5 space-y-3">
              {journals.map((journal) => (
                <li key={journal} className="flex gap-3 text-h2-small text-h2-ink-2">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-h2-blue-bright" />
                  <span>{journal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-h2-lg border border-h2-border bg-h2-surface-2 p-6 lg:col-span-2">
            <h3 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
              Şablonlar
            </h3>
            <p className="mt-3 text-h2-small leading-relaxed text-h2-ink-2">
              Başvuru öncesinde genişletilmiş özet şablonunu, kabul sonrası
              poster hazırlığı için A1 poster şablonunu kullanabilirsiniz.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="/templates/poster-extended-abstract.docx"
                className="rounded-h2-md bg-h2-blue px-5 py-3 text-center text-h2-small font-semibold text-white transition-all hover:bg-h2-blue-bright"
              >
                Özet Şablonu İndir
              </a>
              <a
                href="/templates/hidrojen-zirvesi-a1-poster-sablonu.pdf"
                className="rounded-h2-md border border-h2-border px-5 py-3 text-center text-h2-small font-semibold text-h2-ink-1 transition-all hover:border-h2-cyan/45"
              >
                Poster Şablonu İndir
              </a>
            </div>
          </div>

          <div className="rounded-h2-lg border border-h2-green/25 bg-h2-green/8 p-6 lg:col-span-2">
            <h3 className="font-display text-h2-h3 font-semibold text-h2-ink-1">
              Başvuru
            </h3>
            <p className="mt-3 text-h2-small leading-relaxed text-h2-ink-2">
              Poster özeti başvuruları 1 Eylül 2026 tarihine kadar alınacaktır.
              Poster dosyası yükleme süreci kabul bildirimi sonrasında aktif
              olacaktır.
            </p>
            <a
              href="/poster-basvurusu"
              className="mt-6 block w-full rounded-h2-md bg-h2-green px-5 py-3.5 text-center font-semibold text-white transition-all hover:bg-h2-green/85 hover:shadow-lg hover:shadow-h2-green/20"
            >
              Poster Özeti Başvurusu Yap
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
