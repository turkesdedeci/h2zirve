import Link from "next/link";

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
  { label: "Son Başvuru (Özet)", value: "15 Eylül 2026", highlight: true },
  { label: "Kabul Bildirimi", value: "25 Eylül 2026" },
  { label: "Poster Yükleme", value: "5 Ekim 2026" },
  { label: "Zirve Tarihleri", value: "22-23 Ekim 2026" },
];

const awards = [
  { title: "Prof. Dr. T. Nejat Veziroğlu Özel Ödülü", amount: "1500 $" },
  { title: "İkincilik Ödülü", amount: "1000 $" },
  { title: "Üçüncülük Ödülü", amount: "500 $" },
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

function CallForPapersPreview() {
  return (
    <section id="cfp" className="bg-h2-bg py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-green">
            Akademik ve Endüstriyel Katkı
          </span>
          <h2 className="mt-3 font-display text-h2-h1 font-bold text-h2-ink-1">
            Poster Çağrısı
          </h2>
          <p className="mt-5 max-w-2xl text-h2-body-lg leading-relaxed text-h2-ink-2">
            Hidrojen teknolojileri alanındaki akademik ve endüstriyel çalışmalarınızı
            zirvenin poster programında paylaşın.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href="/poster-basvurusu"
              className="rounded-h2-md bg-h2-green px-7 py-3.5 text-center font-semibold text-white transition-[background-color,box-shadow] hover:bg-h2-green/85 hover:shadow-lg hover:shadow-h2-green/15"
            >
              Poster Özeti Başvurusu Yap
            </Link>
            <Link
              href="/poster-cagrisi"
              className="border-b border-h2-border pb-1 text-h2-small font-semibold text-h2-ink-2 transition-colors hover:border-h2-cyan hover:text-h2-ink-1"
            >
              Ayrıntıları ve Kuralları İncele
            </Link>
          </div>
        </div>

        <dl className="divide-y divide-h2-border border-y border-h2-border">
          {[
            ["Son Başvuru", "15 Eylül 2026"],
            ["En Yüksek Ödül", "1500 $"],
            ["Poster Formatı", "A1 · Türkçe veya İngilizce"],
            ["Yayın İmkânı", "Seçilen çalışmalar için özel sayı daveti"],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[8rem_1fr] gap-5 py-4">
              <dt className="text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3">
                {label}
              </dt>
              <dd className="text-h2-small font-semibold leading-relaxed text-h2-ink-1">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default function CallForPapers({
  compact = false,
  standalone = false,
}: {
  compact?: boolean;
  standalone?: boolean;
}) {
  if (compact) return <CallForPapersPreview />;

  const Heading = standalone ? "h1" : "h2";

  return (
    <section id="cfp" className="bg-h2-bg py-16 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-green">
              Akademik ve Endüstriyel Katkı
            </span>
            <Heading className="mt-3 font-display text-h2-h2 font-bold text-h2-ink-1 sm:text-h2-h1">
              Poster Çağrısı
            </Heading>
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
            <div className="mt-5 grid gap-x-8 sm:grid-cols-2">
              {topics.map((topic, index) => (
                <div
                  key={topic}
                  className="flex items-start gap-3 border-t border-h2-border-soft py-3 text-h2-small text-h2-ink-2"
                >
                  <span className="font-display text-[11px] font-bold text-h2-green">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{topic}</span>
                </div>
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
            <div className="mt-5 divide-y divide-h2-border-soft border-y border-h2-border-soft">
              {dates.map(({ label, value, highlight }) => (
                <div
                  key={label}
                  className={`flex items-center justify-between gap-4 px-1 py-4 ${
                    highlight
                      ? "text-h2-green"
                      : ""
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
                className="rounded-h2-md bg-h2-blue px-5 py-3 text-center text-h2-small font-semibold text-white transition-colors hover:bg-h2-blue-bright"
              >
                Özet Şablonu İndir
              </a>
              <a
                href="/templates/hidrojen-zirvesi-a1-poster-sablonu.pdf"
                className="rounded-h2-md border border-h2-border px-5 py-3 text-center text-h2-small font-semibold text-h2-ink-1 transition-colors hover:border-h2-cyan/45"
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
              Poster özeti başvuruları 15 Eylül 2026 tarihine kadar alınacaktır.
              Poster dosyası yükleme süreci kabul bildirimi sonrasında aktif
              olacaktır.
            </p>
            <a
              href="/poster-basvurusu"
              className="mt-6 block w-full rounded-h2-md bg-h2-green px-5 py-3.5 text-center font-semibold text-white transition-[background-color,box-shadow] hover:bg-h2-green/85 hover:shadow-lg hover:shadow-h2-green/20"
            >
              Poster Özeti Başvurusu Yap
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
