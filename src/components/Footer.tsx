import Image from "next/image";

const links = [
  { label: "Hakkında", href: "#about" },
  { label: "Program", href: "#program" },
  { label: "Konuşmacılar", href: "#speakers" },
  { label: "Katılımcı Firmalar", href: "#exhibitors" },
  { label: "Poster Çağrısı", href: "#cfp" },
  { label: "Sponsorluk", href: "#sponsors" },
  { label: "İletişim", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#03050E] border-t border-h2-border py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="/logos/turkiye-hidrojen-zirvesi-logo-v4.png"
              alt="Türkiye Hidrojen Zirvesi 2026"
              width={230}
              height={120}
              className="mb-5 h-auto w-56 object-contain sm:w-64"
            />
            <p className="text-h2-ink-3 text-h2-small leading-relaxed max-w-sm">
              Türkiye Hidrojen Zirvesi 2026 (TESPAM-H2-2026)
              <br />
              22–23 Ekim 2026 · Ankara, Türkiye
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-h2-ink-1 font-semibold text-h2-small mb-4 uppercase tracking-wider">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-2.5">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-h2-ink-3 hover:text-h2-ink-1 text-h2-small transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Organizer and host */}
          <div>
            <h4 className="text-h2-ink-1 font-semibold text-h2-small mb-4 uppercase tracking-wider">
              Organizasyon
            </h4>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/logos/tespam.png"
                    alt="TESPAM"
                    width={44}
                    height={44}
                    className="object-contain opacity-60"
                  />
                </div>
                <p className="text-h2-ink-disabled text-h2-micro leading-relaxed">
                  <span className="text-h2-cyan font-semibold">Ana düzenleyici</span>
                  <br />Türkiye Enerji Stratejileri &amp; Politikaları Araştırma Merkezi
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/logos/aybu.png"
                    alt="Ankara Yıldırım Beyazıt Üniversitesi"
                    width={44}
                    height={44}
                    className="object-contain opacity-60"
                  />
                </div>
                <p className="text-h2-ink-disabled text-h2-micro leading-relaxed">
                  <span className="text-h2-ink-3 font-semibold">Ev sahibi üniversite</span>
                  <br />Ankara Yıldırım Beyazıt Üniversitesi
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-h2-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-h2-ink-disabled text-h2-small">
            © 2026 Türkiye Hidrojen Zirvesi. Tüm hakları saklıdır.
          </p>
          <p className="text-h2-ink-disabled text-h2-micro">
            TESPAM tarafından, AYBÜ ev sahipliğinde
          </p>
        </div>
      </div>
    </footer>
  );
}
