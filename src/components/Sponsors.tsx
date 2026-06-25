const tiers = [
  { name: "Ana Sponsor", color: "text-h2-amber", slots: 1, size: "h-20 w-52" },
  { name: "Platin Sponsor", color: "text-h2-ink-1", slots: 2, size: "h-16 w-44" },
  { name: "Altın Sponsor", color: "text-h2-amber/80", slots: 3, size: "h-14 w-36" },
  { name: "Gümüş Sponsor", color: "text-h2-ink-3", slots: 4, size: "h-12 w-32" },
  { name: "Destek Sponsoru", color: "text-h2-ink-disabled", slots: 5, size: "h-10 w-28" },
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
    <section id="sponsors" className="bg-h2-bg py-16 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-cyan">
            Kurumsal Destek
          </span>
          <h2 className="font-display text-h2-h1 font-bold text-h2-ink-1 mt-3">
            Sponsorluk
          </h2>
          <p className="text-h2-ink-2 mt-5 max-w-2xl mx-auto text-h2-body-lg leading-relaxed">
            Türkiye Hidrojen Zirvesi 2026, sponsor kurumları; akademisyenler, kamu
            kurumları, enerji şirketleri ve yatırımcılardan oluşan paydaş
            kitlesiyle aynı çatı altında buluşturur.
          </p>
        </div>

        {/* Sponsor tiers — Linear List Row pattern, no boxed tier containers */}
        <div className="space-y-10 mb-16">
          {tiers.map((tier) => (
            <div key={tier.name}>
              <div className="mb-5 flex items-center gap-4">
                <span className={`whitespace-nowrap font-display text-h2-small font-bold uppercase tracking-[0.18em] ${tier.color}`}>
                  {tier.name}
                </span>
                <span className="h-px w-full bg-h2-border" />
              </div>
              <div className="flex flex-wrap gap-4">
                {Array.from({ length: tier.slots }).map((_, i) => (
                  <div
                    key={i}
                    className={`${tier.size} flex items-center justify-center rounded-h2-md border border-dashed border-h2-border text-center text-h2-micro font-medium leading-tight text-h2-ink-disabled px-2`}
                  >
                    Sponsor logonuz
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits + special side by side */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Why sponsor */}
          <div className="bg-gradient-to-br from-h2-blue/10 to-transparent border border-h2-blue/20 rounded-h2-lg p-7">
            <h3 className="font-display text-h2-h3 font-semibold text-h2-ink-1 mb-5">
              Neden Sponsor Olmalısınız?
            </h3>
            <div className="space-y-3">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <span className="text-h2-cyan font-bold text-h2-small">✓</span>
                  <span className="text-h2-ink-2 text-h2-small">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Special sponsorships */}
          <div className="bg-h2-surface-2 border border-h2-border rounded-h2-lg p-7">
            <h3 className="font-display text-h2-h3 font-semibold text-h2-ink-1 mb-5">
              Özel Sponsorluk Fırsatları
            </h3>
            <div className="space-y-3">
              {special.map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-h2-green flex-shrink-0" />
                  <span className="text-h2-ink-2 text-h2-small">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/sponsorluk-basvurusu"
            className="inline-block bg-h2-blue hover:bg-h2-blue-bright text-white font-semibold px-12 py-4 rounded-h2-md text-base transition-all hover:shadow-lg hover:shadow-h2-blue/25"
          >
            Sponsorluk Başvurusu Yap
          </a>
          <p className="mx-auto mt-4 max-w-xl text-h2-small leading-relaxed text-h2-ink-3">
            Başvurunuz alındıktan sonra sponsorluk tipi, görünürlük beklentisi
            ve bütçe aralığına göre ekip sizinle iletişime geçecektir.
          </p>
        </div>
      </div>
    </section>
  );
}
