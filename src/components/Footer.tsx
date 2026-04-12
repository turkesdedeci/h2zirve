import Image from "next/image";

const links = [
  { label: "Hakkında", href: "#about" },
  { label: "Program", href: "#program" },
  { label: "Konuşmacılar", href: "#speakers" },
  { label: "Bildiri Çağrısı", href: "#cfp" },
  { label: "Sponsorluk", href: "#sponsors" },
  { label: "İletişim", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#03050E] border-t border-[#1A2845] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="text-white font-extrabold text-xl mb-3 leading-tight">
              Türkiye Hidrojen{" "}
              <span className="text-[#00C8FF]">Zirvesi</span>{" "}
              <span className="text-[#00D084]">2026</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Türkiye Hidrojen Zirvesi 2026 (TESPAM-H2-2026)
              <br />
              15–16 Ekim 2026 · Ankara, Türkiye
            </p>
            <p className="text-slate-700 text-xs mt-3 italic">
              Türkiye&apos;de Hidrojen Ekosisteminin İnşası: Teknoloji, Strateji ve
              Uygulama
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-2.5">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-slate-500 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Organizers */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Düzenleyenler
            </h4>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Image
                  src="/logos/tespam.png"
                  alt="TESPAM"
                  width={48}
                  height={48}
                  className="object-contain opacity-70"
                />
                <p className="text-slate-600 text-xs leading-relaxed">
                  Türkiye Enerji Stratejileri &amp;
                  <br />Politikaları Araştırma Merkezi
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src="/logos/h2team.png"
                  alt="AYBÜ H2TEAM"
                  width={80}
                  height={30}
                  className="object-contain opacity-70"
                />
                <p className="text-slate-600 text-xs leading-relaxed">
                  AYBÜ Hidrojen
                  <br />Araştırma Merkezi
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1A2845] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-700 text-sm">
            © 2026 Türkiye Hidrojen Zirvesi. Tüm hakları saklıdır.
          </p>
          <p className="text-slate-800 text-xs">
            TESPAM &amp; AYBÜ Hidrojen Araştırma Merkezi iş birliğiyle
          </p>
        </div>
      </div>
    </footer>
  );
}
