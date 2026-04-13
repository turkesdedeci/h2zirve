import Image from "next/image";
import CountdownTimer from "./CountdownTimer";
import HeroSlider from "./HeroSlider";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#06091A]"
    >
      {/* Background slider */}
      <HeroSlider />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
        {/* Date badge */}
        <div className="inline-flex items-center bg-[#0066CC]/20 border border-[#0066CC]/40 rounded-full px-5 py-2 mb-10">
          <span className="text-[#00C8FF] text-sm font-semibold tracking-wide">
            15–16 Ekim 2026 &nbsp;|&nbsp; Ankara, Türkiye
          </span>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logos/orta.png"
            alt="Türkiye Hidrojen Zirvesi 2026"
            width={420}
            height={140}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        <p className="text-[#00D084] font-bold text-xl sm:text-2xl mb-3 tracking-[0.2em] uppercase">
          TESPAM-H2-2026
        </p>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          Türkiye&apos;de Hidrojen Ekosisteminin İnşası:{" "}
          <span className="text-slate-300">Teknoloji, Strateji ve Uygulama</span>
        </p>

        {/* Countdown */}
        <div className="flex flex-col items-center gap-3 mb-12">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest">
            Kongreye Kalan Süre
          </p>
          <CountdownTimer />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="bg-[#0066CC] hover:bg-[#0055bb] text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#0066CC]/30"
          >
            Kayıt Ol
          </a>
          <a
            href="/poster-basvurusu"
            className="bg-white/8 hover:bg-white/15 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all hover:scale-105 backdrop-blur-sm"
          >
            Poster Başvurusu
          </a>
        </div>

        {/* Organizers */}
        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col items-center gap-5">
          <span className="text-slate-500 text-xs uppercase tracking-widest font-semibold">
            Düzenleyenler
          </span>
          <div className="flex items-center justify-center gap-10">
            <Image
              src="/logos/tespam.png"
              alt="TESPAM"
              width={90}
              height={90}
              className="object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
            <span className="text-slate-700 text-2xl font-light">×</span>
            <Image
              src="/logos/h2team.png"
              alt="AYBÜ H2TEAM"
              width={130}
              height={46}
              className="object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator — sayfanın en altında */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce z-10">
        <svg
          className="w-5 h-5 text-slate-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
