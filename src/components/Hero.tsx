import Image from "next/image";
import CountdownTimer from "./CountdownTimer";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#06091A]"
    >
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-[#0066CC]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/5 w-[400px] h-[400px] bg-[#00C8FF]/10 rounded-full blur-[100px]" />
        <div className="absolute top-2/3 left-1/2 w-[300px] h-[300px] bg-[#00D084]/10 rounded-full blur-[80px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
        {/* Date badge */}
        <div className="inline-flex items-center gap-2 bg-[#0066CC]/20 border border-[#0066CC]/40 rounded-full px-5 py-2 mb-10">
          <span className="w-2 h-2 rounded-full bg-[#00C8FF] animate-pulse" />
          <span className="text-[#00C8FF] text-sm font-semibold tracking-wide">
            15–16 Ekim 2026 &nbsp;|&nbsp; Ankara, Türkiye
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-5">
          Türkiye Hidrojen
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C8FF] via-[#0099DD] to-[#0066CC]">
            Zirvesi 2026
          </span>
        </h1>

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
            href="#cfp"
            className="bg-white/8 hover:bg-white/15 border border-white/20 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-all hover:scale-105 backdrop-blur-sm"
          >
            Bildiri Gönder
          </a>
        </div>

        {/* Organizers */}
        <div className="mt-16 pt-8 border-t border-white/8 flex flex-col items-center gap-4">
          <span className="text-slate-600 text-xs uppercase tracking-widest font-semibold">
            Düzenleyenler
          </span>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <Image
              src="/logos/tespam.png"
              alt="TESPAM"
              width={110}
              height={55}
              className="object-contain opacity-75 hover:opacity-100 transition-opacity"
            />
            <span className="text-slate-700 hidden sm:block text-2xl font-light">×</span>
            <Image
              src="/logos/h2team.png"
              alt="AYBÜ H2TEAM"
              width={140}
              height={50}
              className="object-contain opacity-75 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-slate-600 text-xs font-medium">Keşfet</span>
        <svg
          className="w-5 h-5 text-slate-600"
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
