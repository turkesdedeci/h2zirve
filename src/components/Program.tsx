"use client";

import { useState } from "react";
import Link from "next/link";

type SessionType =
  | "registration"
  | "opening"
  | "break"
  | "keynote"
  | "panel"
  | "lunch"
  | "poster"
  | "gala"
  | "closing"
  | "visit";

interface Session {
  time: string;
  type: SessionType;
  title: string;
  subtitle?: string;
  moderator?: string;
  speakers?: string[];
}

const day1: Session[] = [
  {
    time: "09:00 - 10:00",
    type: "registration",
    title: "Kayıt & Karşılama",
  },
  {
    time: "10:00 - 11:00",
    type: "opening",
    title: "Açılış Oturumu",
    speakers: [
      "Prof. Dr. Selahattin Çelik - AYBÜ H2TEAM (10 dk)",
      "Oğuzhan Akyener - TESPAM Başkanı (10 dk)",
      "Prof. Dr. Ali Cengiz Köseoğlu - AYBÜ Rektörü (15 dk)",
      "TBA | Enerji Bakanı / Bakan Yardımcısı / TENMAK Başkanı (15 dk)",
    ],
  },
  { time: "11:00 - 11:15", type: "break", title: "Kahve Arası" },
  {
    time: "11:15 - 12:00",
    type: "keynote",
    title: "Keynote Konuşmacı: Prof. Dr. İbrahim Dinçer",
  },
  { time: "12:00 - 13:15", type: "lunch", title: "Öğle Yemeği & Sergi" },
  {
    time: "13:15 - 14:00",
    type: "keynote",
    title: "Keynote Konuşmacı: Dr. Ayfer Veziroğlu",
  },
  { time: "14:00 - 14:15", type: "break", title: "Kahve Arası" },
  {
    time: "14:15 - 16:00",
    type: "panel",
    title: "Panel 1: Türkiye Hidrojen Yol Haritası 2035",
    moderator: "Prof. Dr. Erol Arcaklıoğlu | YÖK Yürütme Kurulu Üyesi",
    speakers: [
      "Prof. Dr. İbrahim Dinçer | Ontario Tech University",
      "Prof. Dr. İlker Murat Ar | Sanayi ve Teknoloji Bakanlığı Sanayi Genel Müdürü",
      "Dr. Betül Erdör Türk | TÜBİTAK Hidrojen ve Yakıt Pili Teknolojileri Araştırma Grubu Lideri",
      "Dr. Ömer Faruk Tunçbilek | TENMAK-TEMEN Başkanı",
      "Gürsel Erul | Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Çevre Yönetimi Genel Müdür Yardımcısı",
    ],
  },
  { time: "16:00 - 16:15", type: "break", title: "Kahve Arası" },
  {
    time: "16:15 - 17:45",
    type: "panel",
    title: "Panel 2: Savunma Sanayinde Hidrojen Teknolojileri",
    moderator: "Prof. Dr. Selahattin Çelik | H2 TEAM Müdürü",
    speakers: [
      "Prof. Dr. Mustafa İlbaş | ASFAT Genel Müdürü",
      "Dr. Uğur Kayasal | ROKETSAN Yeni Nesil Güç Sistemleri Müdürü",
      "Deniz Demirci | Savunma Sanayii Başkanlığı (SSB) Gelişmiş Malzemeler ve Enerji Programı Yöneticisi",
      "Kadir Gökhan Güler | General Electric Aerospace Senior Engineering Manager",
      "Ömer Erdemir | LENTATEK A.Ş. Hidrojen ve Yakıt Pili Teknolojileri Teknik Lideri",
    ],
  },
  {
    time: "17:45 - 18:30",
    type: "poster",
    title: "Poster Sunumları & Sergi Ziyareti",
    speakers: [
      "Poster sahipleri ile birebir etkileşim",
      "Firma standlarının aktif ziyareti",
      "Networking",
    ],
  },
  { time: "19:00", type: "gala", title: "Gala Yemeği & Networking" },
];

const day2: Session[] = [
  {
    time: "09:00 - 09:30",
    type: "registration",
    title: "Karşılama & Sabah Kahvesi",
  },
  {
    time: "09:30 - 10:15",
    type: "panel",
    title: "Panel 3: Yeşil Hidrojen Üretimi ve Endüstriyel Uygulamalar",
    moderator: "Prof. Dr. Hasan Özcan | H2 TEAM Müdür Yardımcısı",
    speakers: [
      "Prof. Dr. Can Erkey | Koç Üniversitesi Hidrojen Teknolojileri Merkezi (KUHyTech) Direktörü",
      "Prof. Dr. Selmiye Alkan Gürsel | Sabancı Üniversitesi (HYSouthMarmara)",
      "Yusuf Günay | Yeşil Hidrojen Üreticileri Derneği Başkanı",
      "Dr. Çiğdem Karadağ | TÜBİTAK MAM",
      "Prof. Dr. Yüksel Kaplan | Niğde Ömer Halisdemir Üniversitesi",
    ],
  },
  { time: "10:15 - 10:45", type: "break", title: "Kahve Arası & Sergi" },
  {
    time: "10:45 - 11:45",
    type: "panel",
    title: "Panel 4: Sanayide Hidrojen Kullanımı",
    moderator: "Doç. Dr. Canan Acar | Twente Üniversitesi",
    speakers: [
      "Süleyman Furkan Özdil | Ereğli Erdemir Demir Çelik",
      "TBA",
      "TBA",
      "TBA",
      "TBA",
    ],
  },
  { time: "11:45 - 13:15", type: "lunch", title: "Öğle Yemeği & Sergi" },
  {
    time: "13:15 - 14:30",
    type: "panel",
    title: "Panel 5: Hidrojen Ekonomisi, Ar-Ge ve Ticarileşme",
    moderator: "TBA",
    speakers: [
      "Dr. Paulina Seyfert | Almanya Enerji Bakanlığı",
      "Ongun Yoldemir | Jeoloji Mühendisi - Türkiye Beyaz Hidrojen Kuyuları",
      "TBA",
      "TBA",
    ],
  },
  { time: "14:30 - 14:45", type: "break", title: "Kahve Arası" },
  {
    time: "14:45 - 15:45",
    type: "poster",
    title: "Poster Sunumları & Sergi",
  },
  {
    time: "16:00 - 16:30",
    type: "closing",
    title: "Poster Ödülleri & Kapanış",
  },
  {
    time: "17:30 - 18:30",
    type: "visit",
    title: "Teknik Ziyaret: AYBÜ H2TEAM Laboratuvar Ziyareti",
  },
];

const cfg: Record<
  SessionType,
  { label: string; accent: string; badge: string }
> = {
  registration: {
    label: "Karşılama",
    accent: "bg-slate-500",
    badge: "text-slate-300 bg-slate-500/10 border-slate-500/20",
  },
  opening: {
    label: "Açılış",
    accent: "bg-h2-blue-bright",
    badge: "border-h2-blue/30 bg-h2-blue/10 text-blue-200",
  },
  break: {
    label: "Ara",
    accent: "bg-h2-amber",
    badge: "border-h2-amber/25 bg-h2-amber/8 text-amber-200",
  },
  keynote: {
    label: "Keynote",
    accent: "bg-h2-green",
    badge: "border-h2-green/30 bg-h2-green/10 text-emerald-200",
  },
  panel: {
    label: "Panel",
    accent: "bg-h2-blue-bright",
    badge: "border-h2-blue/30 bg-h2-blue/10 text-blue-200",
  },
  lunch: {
    label: "Mola",
    accent: "bg-h2-amber",
    badge: "border-h2-amber/25 bg-h2-amber/8 text-amber-200",
  },
  poster: {
    label: "Poster",
    accent: "bg-h2-blue-bright",
    badge: "border-h2-blue/30 bg-h2-blue/10 text-blue-200",
  },
  gala: {
    label: "Sosyal Program",
    accent: "bg-h2-amber",
    badge: "border-h2-amber/25 bg-h2-amber/8 text-amber-200",
  },
  closing: {
    label: "Kapanış",
    accent: "bg-h2-blue-bright",
    badge: "border-h2-blue/30 bg-h2-blue/10 text-blue-200",
  },
  visit: {
    label: "Teknik Ziyaret",
    accent: "bg-h2-blue-bright",
    badge: "border-h2-blue/30 bg-h2-blue/10 text-blue-200",
  },
};

const previewDays = [
  {
    day: "1. Gün",
    date: "22 Ekim 2026 · Perşembe",
    theme: "Strateji & Endüstri",
    sessions: day1.filter((session) => ["keynote", "panel"].includes(session.type)),
  },
  {
    day: "2. Gün",
    date: "23 Ekim 2026 · Cuma",
    theme: "Teknoloji, Ekonomi & Uygulama",
    sessions: day2.filter((session) => ["keynote", "panel"].includes(session.type)).slice(0, 4),
  },
];

function ProgramPreview() {
  return (
    <section id="program" className="bg-h2-surface-1 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-cyan">
              Etkinlik Takvimi
            </span>
            <h2 className="mt-3 font-display text-h2-h1 font-bold text-h2-ink-1">
              İki günlük programdan öne çıkanlar
            </h2>
            <p className="mt-4 max-w-2xl text-h2-body leading-relaxed text-h2-ink-2">
              Keynote konuşmaları ve tematik panellerle şekillenen programın öne çıkan
              oturumlarını inceleyin.
            </p>
          </div>
          <Link
            href="/program"
            className="w-fit border-b border-h2-cyan pb-1 text-h2-small font-semibold text-h2-ink-1 transition-colors hover:text-h2-cyan"
          >
            Tam Programı İncele
          </Link>
        </div>

        <div className="grid border-y border-h2-border lg:grid-cols-2 lg:divide-x lg:divide-h2-border">
          {previewDays.map((item) => (
            <article
              key={item.day}
              className="border-b border-h2-border py-8 last:border-b-0 lg:border-b-0 lg:px-10 lg:first:pl-0 lg:last:pr-0"
            >
              <div className="flex items-baseline justify-between gap-5">
                <div>
                  <p className="font-display text-h2-h3 font-bold text-h2-ink-1">{item.day}</p>
                  <p className="mt-1 text-h2-small text-h2-cyan">{item.theme}</p>
                </div>
                <p className="text-right text-h2-micro font-semibold uppercase tracking-wider text-h2-ink-3">
                  {item.date}
                </p>
              </div>
              <div className="mt-7 divide-y divide-h2-border-soft">
                {item.sessions.map((session) => (
                  <div key={`${item.day}-${session.time}-${session.title}`} className="grid grid-cols-[5.75rem_1fr] gap-4 py-4 first:pt-0">
                    <p className="font-mono text-h2-small font-semibold text-h2-ink-3">{session.time}</p>
                    <div>
                      <p className="text-h2-small font-semibold leading-relaxed text-h2-ink-1">{session.title}</p>
                      <p className={`mt-1 text-[11px] font-bold uppercase tracking-wider ${session.type === "keynote" ? "text-h2-green" : "text-h2-cyan"}`}>
                        {cfg[session.type].label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Program({
  preview = false,
  standalone = false,
}: {
  preview?: boolean;
  standalone?: boolean;
}) {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const sessions = activeDay === 1 ? day1 : day2;
  const Heading = standalone ? "h1" : "h2";

  if (preview) return <ProgramPreview />;

  return (
    <section id="program" className="relative overflow-hidden bg-h2-surface-1 py-16 sm:py-28">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-cyan">
            Etkinlik Takvimi
          </span>
          <Heading className="mt-3 font-display text-h2-h1 font-bold text-h2-ink-1">
            İki günlük program
          </Heading>
          <p className="mx-auto mt-4 max-w-2xl text-h2-body leading-relaxed text-h2-ink-2">
            30.06.2026 tarihli taslak programı, oturum saatleri, moderatörler ve konuşmacılarla
            birlikte gün bazında inceleyin.
          </p>
        </div>

        <div className="mx-auto mb-10 grid max-w-2xl grid-cols-2 border-b border-h2-border">
          {([1, 2] as const).map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`relative px-4 py-4 text-left transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:transition-transform ${
                activeDay === day
                  ? "text-white after:scale-x-100 after:bg-h2-cyan"
                  : "text-h2-ink-2 after:scale-x-0 after:bg-h2-border hover:text-h2-ink-1 hover:after:scale-x-100"
              }`}
              aria-pressed={activeDay === day}
            >
              <div className="text-h2-body font-bold">{day}. Gün</div>
              <div className="mt-1 text-h2-micro opacity-75">
                {day === 1 ? "22 Ekim 2026 - Perşembe" : "23 Ekim 2026 - Cuma"}
              </div>
            </button>
          ))}
        </div>

        <div className="mb-7 flex items-center gap-4">
          <span className="whitespace-nowrap font-display text-h2-small font-bold uppercase tracking-[0.16em] text-h2-cyan">
            {activeDay === 1
              ? "1. Gün - Strateji & Endüstri"
              : "2. Gün - Teknoloji, Ekonomi & Uygulama"}
          </span>
          <span className="h-px w-full bg-gradient-to-r from-h2-border to-transparent" />
        </div>

        <div className="space-y-4">
          {sessions.map((s, i) => {
            const c = cfg[s.type];
            const compact = ["break", "lunch"].includes(s.type);

            return (
              <article
                key={`${s.time}-${i}`}
                className="group relative overflow-hidden rounded-h2-md border border-h2-border bg-h2-surface-2 transition-[border-color,box-shadow] hover:border-h2-border/80 hover:shadow-lg hover:shadow-black/20"
              >
                <span className={`absolute inset-y-0 left-0 w-1 ${c.accent}`} />
                <div className="grid sm:grid-cols-[10rem_1fr]">
                  <div
                    className={`flex items-center gap-3 border-b border-white/5 px-5 py-4 sm:block sm:border-b-0 sm:border-r sm:border-white/5 sm:px-6 ${
                      compact ? "sm:py-5" : "sm:py-7"
                    }`}
                  >
                    <p className="font-mono text-base font-bold tracking-tight text-h2-ink-1 sm:text-lg">
                      {s.time}
                    </p>
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider sm:mt-3 ${c.badge}`}
                    >
                      {c.label}
                    </span>
                  </div>

                  <div className={compact ? "px-5 py-5 sm:px-6" : "px-5 py-6 sm:px-8 sm:py-7"}>
                    <h3
                      className={`font-display ${
                        compact ? "text-base" : "text-xl sm:text-2xl"
                      } font-bold leading-snug text-h2-ink-1`}
                    >
                      {s.title}
                    </h3>
                    {s.subtitle && (
                      <p className="mt-2 text-h2-small leading-relaxed text-h2-ink-2 sm:text-h2-body">
                        {s.subtitle}
                      </p>
                    )}
                    {s.moderator && (
                      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-h2-md border border-white/8 bg-black/15 px-4 py-3 text-h2-small">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-h2-cyan">
                          Moderatör
                        </span>
                        <span className="font-semibold text-h2-ink-1">{s.moderator}</span>
                      </div>
                    )}
                    {s.speakers && s.speakers.length > 0 && (
                      <ul
                        className={`mt-5 grid gap-x-8 gap-y-3 ${
                          s.speakers.length > 3 ? "md:grid-cols-2" : ""
                        }`}
                      >
                        {s.speakers.map((sp, spIndex) => (
                          <li
                            key={`${sp}-${spIndex}`}
                            className="flex items-start gap-3 text-h2-small leading-relaxed text-h2-ink-2"
                          >
                            <span className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${c.accent}`} />
                            <span>{sp}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
