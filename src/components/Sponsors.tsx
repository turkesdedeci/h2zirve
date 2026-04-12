const tiers = [
  {
    name: "Ana Sponsor",
    color: "text-yellow-300",
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/5",
    slots: 1,
    size: "h-20 w-52",
  },
  {
    name: "Platin Sponsor",
    color: "text-slate-200",
    border: "border-slate-400/25",
    bg: "bg-slate-400/4",
    slots: 2,
    size: "h-16 w-44",
  },
  {
    name: "Altın Sponsor",
    color: "text-amber-400",
    border: "border-amber-500/25",
    bg: "bg-amber-500/4",
    slots: 3,
    size: "h-14 w-36",
  },
  {
    name: "Gümüş Sponsor",
    color: "text-slate-400",
    border: "border-slate-500/20",
    bg: "bg-transparent",
    slots: 4,
    size: "h-12 w-32",
  },
  {
    name: "Destek Sponsoru",
    color: "text-slate-500",
    border: "border-slate-600/20",
    bg: "bg-transparent",
    slots: 5,
    size: "h-10 w-28",
  },
];

const benefits = [
  "Logo görünürlüğü",
  "Sahne / salon görünürlüğü",
  "Stant alanı",
  "Konuşmacı öneri hakkı",
  "Gala davet kontenjanı",
  "Sosyal medya görünürlüğü",
  "Basılı materyallerde yer alma",
  "Web sitesinde görünürlük",
];

const special = [
  "Gala Yemeği Sponsoru",
  "Kahve Arası Sponsoru",
  "Yaka Kartı & Lanyard Sponsoru",
  "Kongre Çantası Sponsoru",
  "Canlı Yayın Sponsoru",
  "Bildiri Kitabı Sponsoru",
  "Öğrenci Destek Sponsoru",
  "Teknik Gezi Sponsoru",
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="bg-[#06091A] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-[#00C8FF] font-semibold text-sm uppercase tracking-widest">
            Kurumsal Destek
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3">
            Sponsorluk
          </h2>
          <p className="text-slate-400 mt-5 max-w-2xl mx-auto leading-relaxed">
            TESPAM-H2-2026, sponsor kurumlara yalnızca görünürlük değil; hedef
            odaklı erişim, uzman ağlarına temas ve karar verici aktörlerle aynı
            platformda yer alma imkânı sunar.
          </p>
        </div>

        {/* Sponsor tiers */}
        <div className="space-y-5 mb-14">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`${tier.bg} border ${tier.border} rounded-2xl p-6`}
            >
              <p className={`font-bold text-sm uppercase tracking-widest mb-5 ${tier.color}`}>
                {tier.name}
              </p>
              <div className="flex flex-wrap gap-4">
                {Array.from({ length: tier.slots }).map((_, i) => (
                  <div
                    key={i}
                    className={`${tier.size} bg-white/4 border border-white/8 rounded-xl flex items-center justify-center text-slate-700 text-xs font-medium`}
                  >
                    Logo
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits + special side by side */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Why sponsor */}
          <div className="bg-gradient-to-br from-[#0066CC]/10 to-transparent border border-[#0066CC]/20 rounded-2xl p-7">
            <h3 className="text-white font-bold text-xl mb-5">
              Neden Sponsor Olmalısınız?
            </h3>
            <div className="space-y-3">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <span className="text-[#00C8FF] font-bold text-sm">✓</span>
                  <span className="text-slate-400 text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special sponsorships */}
          <div className="bg-[#0D1530] border border-[#1A2845] rounded-2xl p-7">
            <h3 className="text-white font-bold text-xl mb-5">
              Özel Sponsorluk Fırsatları
            </h3>
            <div className="space-y-3">
              {special.map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D084] flex-shrink-0" />
                  <span className="text-slate-400 text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-block bg-[#0066CC] hover:bg-[#0055bb] text-white font-semibold px-12 py-4 rounded-xl text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#0066CC]/25"
          >
            Sponsor Olmak İçin İletişime Geçin
          </a>
        </div>
      </div>
    </section>
  );
}
