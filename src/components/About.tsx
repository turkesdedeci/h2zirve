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
  { label: "Tarih", value: "15–16 Ekim 2026" },
  { label: "Yer", value: "Ankara, Türkiye" },
  { label: "Format", value: "Kongre + Strateji Forumu" },
  { label: "Dil", value: "Türkçe / İngilizce" },
  { label: "Bileşenler", value: "Keynote · Paneller · Poster · Sergi" },
];

export default function About() {
  return (
    <section id="about" className="bg-[#06091A] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-[#00C8FF] font-semibold text-sm uppercase tracking-widest">
            Kongre Hakkında
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3">
            Neden Türkiye Hidrojen Zirvesi 2026?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left: text */}
          <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
            <p>
              Küresel enerji dönüşümünün hız kazandığı günümüzde hidrojen;
              sürdürülebilir enerji sistemlerinin kurulması, karbon emisyonlarının
              azaltılması, sanayinin dönüşümü ve yeni nesil temiz enerji
              çözümlerinin geliştirilmesi açısından{" "}
              <span className="text-white font-medium">stratejik bir alan</span>{" "}
              haline gelmiştir.
            </p>
            <p>
              Ankara Yıldırım Beyazıt Üniversitesi ve TESPAM Hidrojen Araştırma
              Merkezi iş birliğiyle düzenlenen Türkiye Hidrojen Zirvesi 2026; araştırmacıları,
              kamu kurumlarını, özel sektör temsilcilerini, yatırımcıları,
              teknoloji geliştiricileri ve politika yapıcıları Ankara&apos;da
              buluşturacaktır.
            </p>
            <p>
              Etkinlik, yalnızca akademik bildirilerin sunulduğu bir kongre
              değil; aynı zamanda{" "}
              <span className="text-white font-medium">
                stratejik paneller, yüksek düzey konuşmalar
              </span>{" "}
              ve sektör odaklı etkileşimlerle güçlendirilmiş bir buluşma zemini
              olarak tasarlanmıştır.
            </p>

            <div className="pt-4">
              <h3 className="text-white font-bold text-xl mb-5">
                Temel Hedefler
              </h3>
              <ul className="space-y-3">
                {objectives.map((obj) => (
                  <li key={obj} className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#00C8FF] flex-shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: cards */}
          <div className="space-y-6">
            {/* Event info card */}
            <div className="bg-[#0D1530] border border-[#1A2845] rounded-2xl p-7">
              <h3 className="text-white font-bold text-xl pb-4 border-b border-[#1A2845] mb-5">
                Etkinlik Bilgileri
              </h3>
              <div className="space-y-4">
                {details.map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-start gap-4">
                    <span className="text-slate-500 font-medium text-sm">
                      {label}
                    </span>
                    <span className="text-white font-semibold text-sm text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience card */}
            <div className="bg-[#0D1530] border border-[#1A2845] rounded-2xl p-7">
              <h3 className="text-white font-bold text-xl mb-5">
                Kimler Katılacak?
              </h3>
              <div className="space-y-2.5">
                {audience.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-[#00D084] font-bold text-sm">✓</span>
                    <span className="text-slate-400 text-sm">{item}</span>
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
