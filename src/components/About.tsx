const objectives = [
  "Hidrojen alanındaki güncel akademik ve teknik bilgiyi paylaşmak",
  "Kamu-sanayi-akademi iş birliğini güçlendirmek",
  "Türkiye'nin hidrojen vizyonuna katkı sağlayacak stratejik tartışma ortamı oluşturmak",
  "Yeni projeler, ortaklıklar ve yatırım temasları için bir etkileşim zemini kurmak",
];

const audience = [
  "Akademisyenler ve araştırmacılar",
  "Kamu kurumları ve politika yapıcılar",
  "Enerji, sanayi ve teknoloji şirketleri",
  "Yatırımcılar ve finans kuruluşları",
  "Ar-Ge merkezleri ve girişimler",
  "Lisansüstü öğrenciler",
  "Uluslararası uzmanlar ve paydaşlar",
];

const details = [
  { label: "Tarih", value: "22–23 Ekim 2026" },
  { label: "Yer", value: "Ankara, Türkiye" },
  { label: "Format", value: "Kongre + Strateji Forumu" },
  { label: "Dil", value: "Türkçe / İngilizce" },
  { label: "Bileşenler", value: "Keynote · Paneller · Poster · Sergi" },
];

export default function About() {
  return (
    <section id="about" className="bg-h2-bg py-16 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="mb-16 max-w-2xl">
          <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-cyan">
            Kongre Hakkında
          </span>
          <h2 className="mt-3 font-display text-h2-h1 font-bold leading-tight text-h2-ink-1">
            Neden Türkiye Hidrojen Zirvesi 2026?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left: text */}
          <div className="space-y-6 text-h2-body-lg leading-relaxed text-h2-ink-2">
            <p>
              Küresel enerji dönüşümünün hız kazandığı günümüzde hidrojen;
              sürdürülebilir enerji sistemlerinin kurulması, karbon emisyonlarının
              azaltılması, sanayinin dönüşümü ve yeni nesil temiz enerji
              çözümlerinin geliştirilmesi açısından{" "}
              <span className="font-medium text-h2-ink-1">stratejik bir alan</span>{" "}
              haline gelmiştir.
            </p>
            <p>
              TESPAM tarafından, Ankara Yıldırım Beyazıt Üniversitesi ev
              sahipliğinde düzenlenen Türkiye Hidrojen Zirvesi 2026; araştırmacıları,
              kamu kurumlarını, özel sektör temsilcilerini, yatırımcıları,
              teknoloji geliştiricileri ve politika yapıcıları Ankara&apos;da
              buluşturacaktır.
            </p>
            <p>
              Etkinlik, yalnızca akademik bildirilerin sunulduğu bir kongre
              değil; aynı zamanda{" "}
              <span className="font-medium text-h2-ink-1">
                stratejik paneller, yüksek düzey konuşmalar
              </span>{" "}
              ve sektör odaklı etkileşimlerle güçlendirilmiş bir buluşma zemini
              olarak tasarlanmıştır.
            </p>

            <div className="pt-4">
              <h3 className="font-display text-h2-h3 font-semibold text-h2-ink-1 mb-5">
                Temel Hedefler
              </h3>
              <ul className="space-y-3">
                {objectives.map((obj, i) => (
                  <li key={obj} className="flex items-start gap-3">
                    <span className="mt-0.5 font-display text-h2-small font-semibold text-h2-cyan flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-h2-body">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: cards */}
          <div className="space-y-6">
            {/* Event info card */}
            <div className="rounded-h2-lg border border-h2-border bg-h2-surface-2 p-7">
              <h3 className="text-h2-h3 font-semibold text-h2-ink-1 pb-4 border-b border-h2-border mb-5">
                Etkinlik Bilgileri
              </h3>
              <div className="space-y-4">
                {details.map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-start gap-4">
                    <span className="text-h2-small font-medium text-h2-ink-3">
                      {label}
                    </span>
                    <span className="text-h2-small font-semibold text-h2-ink-1 text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience card */}
            <div className="rounded-h2-lg border border-h2-border bg-h2-surface-2 p-7">
              <h3 className="text-h2-h3 font-semibold text-h2-ink-1 mb-5">
                Kimler Katılacak?
              </h3>
              <div className="space-y-2.5">
                {audience.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-h2-small font-bold text-h2-green">✓</span>
                    <span className="text-h2-small text-h2-ink-2">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
