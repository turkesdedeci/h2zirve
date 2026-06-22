"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const navItems = [
  { label: "Hakkında", href: "#about" },
  { label: "Program", href: "#program" },
  { label: "Konuşmacılar", href: "#speakers" },
  { label: "Firmalar", href: "#exhibitors" },
  { label: "Poster Çağrısı", href: "#cfp" },
  { label: "Sponsorluk", href: "#sponsors" },
  { label: "İletişim", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        "a, button"
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-h2-bg/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-h2-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center" aria-label="Ana sayfa">
            <Image
              src="/logos/header.png"
              alt="Türkiye Hidrojen Zirvesi 2026"
              width={200}
              height={52}
              className="object-contain"
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7" aria-label="Ana menü">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-h2-ink-2 hover:text-h2-ink-1 text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-h2-cyan after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-h2-md bg-h2-blue px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-h2-blue-bright hover:shadow-md hover:shadow-h2-blue/25"
            >
              Kayıt Ol
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={triggerRef}
            className="md:hidden flex flex-col justify-center gap-1.5 p-2 text-white"
            onClick={() => setMenuOpen(true)}
            aria-label="Menüyü aç"
            aria-expanded={menuOpen}
          >
            <span className="block w-6 h-0.5 bg-white transition-all duration-300" />
            <span className="block w-6 h-0.5 bg-white transition-all duration-300" />
            <span className="block w-6 h-0.5 bg-white transition-all duration-300" />
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menüsü"
        className={`md:hidden fixed inset-0 z-[60] bg-h2-bg transition-opacity duration-200 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`flex h-full flex-col px-6 pt-6 pb-10 transition-transform duration-200 ${
            menuOpen ? "translate-y-0" : "-translate-y-2"
          }`}
        >
          <div className="flex items-center justify-between">
            <Image
              src="/logos/header.png"
              alt="Türkiye Hidrojen Zirvesi 2026"
              width={160}
              height={42}
              className="object-contain"
            />
            <button
              onClick={closeMenu}
              aria-label="Menüyü kapat"
              className="flex h-11 w-11 items-center justify-center rounded-h2-md text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-12 flex flex-1 flex-col justify-center gap-2">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={closeMenu}
                className="group flex items-baseline gap-4 border-b border-h2-border-soft py-4 font-display text-h2-h2 font-semibold text-h2-ink-1 transition-colors hover:text-h2-cyan"
              >
                <span className="font-sans text-h2-small font-medium text-h2-ink-3">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={closeMenu}
            className="block rounded-h2-md bg-h2-blue px-4 py-3.5 text-center font-semibold text-white"
          >
            Kayıt Ol
          </a>
        </div>
      </div>
    </nav>
  );
}
