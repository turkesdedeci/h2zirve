import H2Molecule from "./H2Molecule";

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
              Türkiye Hidrojen Zirvesi, Ankara Yıldırım Beyazıt Üniversitesi
              (AYBÜ) ev sahipliği ve liderliğinde, Hidrojen Teknolojileri ve
              Enerji Uygulama ve Araştırma Merkezi (H2TEAM) koordinasyonunda
              ve Türkiye Enerji Stratejileri ve Politikaları Araştırma Merkezi
              (TESPAM) iş birliğiyle düzenlenmektedir; araştırmacıları,
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

          {/* Right: H₂ Molecule Animation */}
          <div className="flex justify-center items-center rounded-h2-lg border border-h2-border-soft overflow-hidden">
            <H2Molecule />
          </div>
        </div>
      </div>
    </section>
  );
}
