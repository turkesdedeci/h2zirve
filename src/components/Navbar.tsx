"use client";

import { useState, useEffect } from "react";

const navItems = [
  { label: "Hakkında", href: "#about" },
  { label: "Program", href: "#program" },
  { label: "Konuşmacılar", href: "#speakers" },
  { label: "Bildiri Çağrısı", href: "#cfp" },
  { label: "Sponsorluk", href: "#sponsors" },
  { label: "İletişim", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#06091A]/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-[#1A2845]"
          : "bg-[#06091A]/50 backdrop-blur-sm border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1 group">
            <span className="text-white font-extrabold text-lg tracking-tight">
              Türkiye Hidrojen
            </span>
            <span className="text-[#00C8FF] font-extrabold text-lg ml-1">Zirvesi</span>
            <span className="text-[#00D084] font-extrabold text-lg ml-1">2026</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-[#0066CC] hover:bg-[#0052a3] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-[#0066CC]/30"
            >
              Kayıt Ol
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 p-2 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menü"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#06091A]/98 backdrop-blur-md border-t border-[#1A2845] px-4 py-5 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-slate-300 hover:text-white font-medium text-base transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[#0066CC] text-white font-semibold px-4 py-3 rounded-xl text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Kayıt Ol
          </a>
        </div>
      )}
    </nav>
  );
}
