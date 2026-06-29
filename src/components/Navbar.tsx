"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navGroups = [
  {
    label: "Zirve",
    links: [
      { label: "Hakkında", hash: "#about" },
      { label: "Program", hash: "#program" },
      { label: "Konuşmacılar", hash: "#speakers" },
      { label: "Firmalar", hash: "#exhibitors" },
      { label: "İletişim", hash: "#contact" },
    ],
  },
  {
    label: "Akademik",
    links: [
      { label: "Poster Çağrısı", hash: "#cfp" },
      { label: "Poster Özeti Gönder", href: "/poster-basvurusu" },
    ],
  },
];

const applicationLinks = [
  { label: "Kayıt Ol", href: "/kayit", tone: "green" },
  { label: "Stand Başvurusu", href: "/stand-basvurusu", tone: "blue" },
  { label: "Sponsorluk Başvurusu", href: "/sponsorluk-basvurusu", tone: "outline" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const isHome = pathname === "/";
  const solidNav = scrolled || !isHome;
  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);
  const navHref = (item: { href?: string; hash?: string }) =>
    item.href ?? sectionHref(item.hash ?? "#home");

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
        solidNav
          ? "bg-h2-bg/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-h2-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href={isHome ? "#home" : "/"} className="flex items-center" aria-label="Ana sayfa">
            <Image
              src="/logos/turkiye-hidrojen-zirvesi-logo-v4.png"
              alt="Türkiye Hidrojen Zirvesi 2026"
              width={126}
              height={66}
              className="h-12 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4" aria-label="Ana menü">
            {navGroups.map((group) => (
              <div key={group.label} className="group relative">
                <button
                  type="button"
                  className="relative text-sm font-medium text-h2-ink-2 transition-colors hover:text-h2-ink-1 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-h2-cyan after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {group.label}
                </button>
                <div className="invisible absolute left-0 top-full z-50 mt-3 w-56 translate-y-1 rounded-h2-md border border-h2-border bg-h2-bg/98 p-2 opacity-0 shadow-xl shadow-black/30 backdrop-blur-md transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {group.links.map((item) => (
                    <a
                      key={item.label}
                      href={navHref(item)}
                      className="block rounded-h2-md px-3 py-2.5 text-sm font-semibold text-h2-ink-2 transition-colors hover:bg-h2-cyan/10 hover:text-h2-ink-1"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <a
                href="/kayit"
                className="rounded-h2-md bg-h2-green px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-h2-green/85 hover:shadow-md hover:shadow-h2-green/25"
              >
                Kayıt Ol
              </a>
              <div className="group relative">
                <button
                  type="button"
                  className="rounded-h2-md border border-h2-border px-4 py-2 text-sm font-semibold text-h2-ink-1 transition-all hover:border-h2-cyan/45 hover:text-white"
                >
                  Başvurular
                </button>
                <div className="invisible absolute right-0 top-full z-50 mt-2 w-56 translate-y-1 rounded-h2-md border border-h2-border bg-h2-bg/98 p-2 opacity-0 shadow-xl shadow-black/30 backdrop-blur-md transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <a
                    href="/kayit"
                    className="block rounded-h2-md px-3 py-2.5 text-sm font-semibold text-h2-ink-2 transition-colors hover:bg-h2-green/15 hover:text-h2-ink-1"
                  >
                    Katılımcı Kaydı
                  </a>
                  <a
                    href="/stand-basvurusu"
                    className="block rounded-h2-md px-3 py-2.5 text-sm font-semibold text-h2-ink-2 transition-colors hover:bg-h2-blue/15 hover:text-h2-ink-1"
                  >
                    Stand Başvurusu
                  </a>
                  <a
                    href="/sponsorluk-basvurusu"
                    className="block rounded-h2-md px-3 py-2.5 text-sm font-semibold text-h2-ink-2 transition-colors hover:bg-h2-cyan/10 hover:text-h2-ink-1"
                  >
                    Sponsorluk Başvurusu
                  </a>
                </div>
              </div>
            </div>
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
              src="/logos/turkiye-hidrojen-zirvesi-logo-v4.png"
              alt="Türkiye Hidrojen Zirvesi 2026"
              width={116}
              height={61}
              className="h-12 w-auto object-contain"
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
            {navGroups.map((group, groupIndex) => (
              <div key={group.label}>
                <p className="mb-1 mt-4 text-h2-micro font-semibold uppercase tracking-[0.18em] text-h2-ink-3">
                  {group.label}
                </p>
                {group.links.map((item, itemIndex) => (
                  <a
                    key={item.label}
                    ref={groupIndex === 0 && itemIndex === 0 ? firstLinkRef : undefined}
                    href={navHref(item)}
                    onClick={closeMenu}
                    className="group flex items-baseline gap-4 border-b border-h2-border-soft py-3 font-display text-h2-h3 font-semibold text-h2-ink-1 transition-colors hover:text-h2-cyan"
                  >
                    <span className="font-sans text-h2-small font-medium text-h2-ink-3">
                      {String(groupIndex + 1)}.{String(itemIndex + 1)}
                    </span>
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div className="grid gap-3">
            {applicationLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={
                  item.tone === "green"
                    ? "block rounded-h2-md bg-h2-green px-4 py-3.5 text-center font-semibold text-white"
                    : item.tone === "blue"
                      ? "block rounded-h2-md bg-h2-blue px-4 py-3.5 text-center font-semibold text-white"
                      : "block rounded-h2-md border border-h2-border px-4 py-3.5 text-center font-semibold text-h2-ink-1"
                }
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
