const topics = [
  "Hidrojen Üretim Teknolojileri",
  "Elektroliz ve Yenilikçi Üretim Yöntemleri",
  "Depolama ve Taşıma",
  "Yakıt Pilleri",
  "Enerji Sistemlerinde Hidrojen Kullanımı",
  "Ulaşım ve Mobilite",
  "Sanayide Hidrojen Uygulamaları",
  "Güvenlik ve Standartlar",
  "Maliyet Analizi ve Ticarileşme",
  "Finansman, Teşvik ve Yatırım Modelleri",
  "Politika, Mevzuat ve Strateji Geliştirme",
  "Ar-Ge, İnovasyon ve Teknoloji Yönetimi",
  "Savunma ve Sanayi Uygulamaları",
  "Uluslararası İş Birlikleri",
];

const dates = [
  { label: "Özet Gönderim Son Tarihi", value: "Yakında Duyurulacak" },
  { label: "Kabul Bildirimi", value: "Yakında Duyurulacak" },
  { label: "Tam Metin Son Tarihi", value: "Yakında Duyurulacak" },
  { label: "Kongre Tarihleri", value: "15–16 Ekim 2026", highlight: true },
];

const steps = [
  { n: "01", text: "Özet gönderin (Abstract Submission)" },
  { n: "02", text: "Bilimsel kurul değerlendirmesi" },
  { n: "03", text: "Kabul edilen çalışmalar için tam metin gönderim" },
  { n: "04", text: "Kongrede sunum yapın" },
];

export default function CallForPapers() {
  return (
    <section id="cfp" className="bg-[#060B18] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-[#00D084] font-semibold text-sm uppercase tracking-widest">
            Akademik Katkı
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3">
            Bildiri Çağrısı
          </h2>
          <p className="text-slate-400 mt-5 max-w-3xl mx-auto text-lg leading-relaxed">
            Türkiye Hidrojen Zirvesi 2026 kapsamında araştırmacıları, akademisyenleri, uzmanları
            ve lisansüstü öğrencileri özgün çalışmalarını sunmaya davet ediyoruz.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Left: topics + publication */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6">
              Konu Başlıkları
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {topics.map((t) => (
                <span
                  key={t}
                  className="bg-[#0D1530] border border-[#1A2845] hover:border-[#00D084]/40 hover:text-white text-slate-400 text-sm px-4 py-2 rounded-full transition-all cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Publication opportunity */}
            <div className="mt-10 bg-gradient-to-br from-[#00D084]/10 to-transparent border border-[#00D084]/20 rounded-2xl p-7">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00D084]/15 border border-[#00D084]/25 flex items-center justify-center flex-shrink-0 text-xl">
                  📚
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">
                    Yayın İmkânı
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Kongrede sunulan çalışmalar arasından seçilecek ve
                    genişletilmiş tam metinler, kongre ile iş birliği içinde olan{" "}
                    <span className="text-[#00D084] font-semibold">
                      Q1 kategorisindeki uluslararası bir dergide
                    </span>{" "}
                    değerlendirilmek üzere davet edilecektir. Dergide yayımlanma
                    kararı, derginin bilimsel değerlendirme süreci sonucunda
                    kesinleşecektir.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: dates + process */}
          <div className="space-y-8">
            {/* Important dates */}
            <div>
              <h3 className="text-white font-bold text-xl mb-5">
                Önemli Tarihler
              </h3>
              <div className="space-y-2.5">
                {dates.map(({ label, value, highlight }) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between p-4 rounded-xl border ${
                      highlight
                        ? "bg-[#0066CC]/10 border-[#0066CC]/35"
                        : "bg-[#0D1530] border-[#1A2845]"
                    }`}
                  >
                    <span className="text-slate-400 text-sm">{label}</span>
                    <span
                      className={`font-bold text-sm ${
                        highlight ? "text-[#00C8FF]" : "text-slate-500"
                      }`}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submission process */}
            <div className="bg-[#0D1530] border border-[#1A2845] rounded-2xl p-7">
              <h3 className="text-white font-bold text-xl mb-6">
                Gönderim Süreci
              </h3>
              <div className="space-y-5">
                {steps.map(({ n, text }) => (
                  <div key={n} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#0066CC]/20 border border-[#0066CC]/35 flex items-center justify-center text-[#00C8FF] text-xs font-bold flex-shrink-0">
                      {n}
                    </div>
                    <span className="text-slate-400 text-sm">{text}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="mt-8 w-full block text-center bg-[#00D084] hover:bg-[#00b872] text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-[#00D084]/20"
              >
                Bildiri Gönder
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
