"use client";

import { useState } from "react";

type SessionType =
  | "registration"
  | "opening"
  | "break"
  | "keynote"
  | "panel"
  | "lunch"
  | "poster"
  | "gala"
  | "prayer"
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
    time: "09:00 – 10:00",
    type: "registration",
    title: "Kayıt & Karşılama",
    speakers: ["Kayıt işlemleri", "Yaka kartı dağıtımı", "Sergi alanı açılışı"],
  },
  {
    time: "10:00 – 10:50",
    type: "opening",
    title: "Açılış Oturumu",
    speakers: [
      "Prof. Dr. Selahattin Çelik – AYBÜ H2TEAM (10 dk)",
      "Oğuzhan Akyener – TESPAM Başkanı (10 dk)",
      "Prof. Dr. Ali Cengiz Köseoğlu – AYBÜ Rektörü (15 dk)",
      "Enerji ve Tabii Kaynaklar Bakanı (tensipleri ile) / Bakan Yardımcısı / TENMAK Başkanı (15 dk)",
    ],
  },
  { time: "10:50 – 11:05", type: "break", title: "Kahve Arası" },
  {
    time: "11:05 – 11:50",
    type: "keynote",
    title: "Keynote Konuşma",
    speakers: ["Dr. Ayfer Veziroğlu"],
  },
  { time: "12:00 – 13:15", type: "lunch", title: "Öğle Yemeği & Sergi" },
  {
    time: "13:15 – 14:30",
    type: "panel",
    title: "Panel 1 — Türkiye Hidrojen Yol Haritası 2035",
    subtitle: "Politika, Regülasyon ve Yatırım Perspektifi",
    moderator: "Prof. Dr. Erol Arcaklıoğlu",
    speakers: [
      "Enerji ve Tabii Kaynaklar Bakanlığı / TENMAK",
      "Sanayi ve Teknoloji Bakanlığı / TÜBİTAK",
      "Çevre, Şehircilik ve İklim Değişikliği Bakanlığı",
      "EPDK",
      "Dr. Paulia Seyfert – Almanya Enerji Bakanlığı",
    ],
  },
  { time: "14:30 – 15:00", type: "break", title: "Kahve Arası" },
  {
    time: "15:00 – 16:15",
    type: "panel",
    title: "Panel 2 — Savunma Sanayinde Hidrojen Teknolojileri",
    moderator: "Prof. Dr. Selahattin Çelik",
    speakers: [
      "Savunma Sanayii Başkanlığı (SSB)",
      "ROKETSAN",
      "ASELSAN",
      "Prof. Dr. Mustafa İlbaş – ASFAT",
      "İbrahim Pamuk – LENTATEK",
    ],
  },
  {
    time: "16:15 – 17:30",
    type: "panel",
    title: "Panel 3 — Yeşil Hidrojen Üretimi ve Endüstriyel Uygulamalar",
    moderator: "Prof. Dr. Hasan Özcan",
    speakers: [
      "Yeşil Hidrojen Üreticileri Derneği",
      "TÜPRAŞ",
      "Yenilenebilir enerji firması (GES/RES)",
      "Elektrolizör teknolojisi firması",
      "TÜBİTAK MAM",
    ],
  },
  {
    time: "17:30 – 18:30",
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
    time: "09:00 – 09:30",
    type: "registration",
    title: "Karşılama & Sabah Kahvesi",
  },
  {
    time: "09:30 – 10:15",
    type: "keynote",
    title: "Keynote Konuşma",
    speakers: ["Prof. Dr. İbrahim Dinçer"],
  },
  { time: "10:15 – 10:45", type: "break", title: "Kahve Arası & Sergi" },
  {
    time: "10:45 – 11:45",
    type: "panel",
    title: "Panel 4 — Sanayide Hidrojen Kullanımı",
    moderator: "Prof. Dr. Bülent Yeşilata",
  },
  { time: "11:45 – 12:45", type: "lunch", title: "Öğle Yemeği" },
  { time: "12:45 – 13:45", type: "prayer", title: "Cuma Namazı Arası" },
  {
    time: "13:45 – 15:15",
    type: "panel",
    title: "Panel 5 — Hidrojen Ekonomisi, Ar-Ge ve Ticarileşme",
    speakers: [
      "Kalkınma bankası / yatırım fonu",
      "TÜBİTAK",
      "Üniversite temsilcisi",
      "Sanayi Ar-Ge merkezi",
      "Teknoloji / startup firması",
    ],
  },
  { time: "15:15 – 15:45", type: "break", title: "Kahve Arası" },
  {
    time: "15:45 – 16:45",
    type: "poster",
    title: "Poster Sunumları & Sergi",
    speakers: [
      "Poster sahipleri ile birebir etkileşim",
      "Firma standlarının aktif ziyareti",
    ],
  },
  { time: "16:45 – 17:15", type: "closing", title: "Poster Ödülleri & Kapanış" },
  {
    time: "17:30 – 19:00",
    type: "visit",
    title: "Opsiyonel Teknik Ziyaret",
    subtitle: "AYBÜ H2TEAM Laboratuvar Ziyareti",
    speakers: [
      "Katılım isteğe bağlıdır",
      "Farklı lokasyonda gerçekleştirilecektir",
      "Ulaşım organizasyonu ayrıca duyurulacaktır",
    ],
  },
];

const cfg: Record<
  SessionType,
  { label: string; accent: string; badge: string; border: string; bg: string }
> = {
  registration: {
    label: "Karşılama",
    accent: "bg-slate-500",
    badge: "text-slate-300 bg-slate-500/10 border-slate-500/20",
    border: "border-[#263755]",
    bg: "bg-[#0D1530]",
  },
  opening: {
    label: "Açılış",
    accent: "bg-[#00C8FF]",
    badge: "text-[#75E1FF] bg-[#00C8FF]/10 border-[#00C8FF]/20",
    border: "border-[#00C8FF]/30",
    bg: "bg-[#0B1830]",
  },
  break: {
    label: "Ara",
    accent: "bg-amber-400",
    badge: "text-amber-300 bg-amber-400/10 border-amber-400/20",
    border: "border-amber-400/20",
    bg: "bg-amber-400/[0.04]",
  },
  keynote: {
    label: "Keynote",
    accent: "bg-[#00D084]",
    badge: "text-[#69F0BD] bg-[#00D084]/10 border-[#00D084]/25",
    border: "border-[#00D084]/35",
    bg: "bg-[#09221F]",
  },
  panel: {
    label: "Panel",
    accent: "bg-[#3B82F6]",
    badge: "text-[#8FC0FF] bg-[#3B82F6]/10 border-[#3B82F6]/25",
    border: "border-[#3B82F6]/30",
    bg: "bg-[#0B1730]",
  },
  lunch: {
    label: "Mola",
    accent: "bg-orange-400",
    badge: "text-orange-300 bg-orange-400/10 border-orange-400/20",
    border: "border-orange-400/20",
    bg: "bg-orange-400/[0.04]",
  },
  poster: {
    label: "Sergi",
    accent: "bg-violet-400",
    badge: "text-violet-300 bg-violet-400/10 border-violet-400/20",
    border: "border-violet-400/25",
    bg: "bg-violet-400/[0.05]",
  },
  gala: {
    label: "Sosyal Program",
    accent: "bg-pink-400",
    badge: "text-pink-300 bg-pink-400/10 border-pink-400/20",
    border: "border-pink-400/25",
    bg: "bg-pink-400/[0.05]",
  },
  prayer: {
    label: "Ara",
    accent: "bg-teal-400",
    badge: "text-teal-300 bg-teal-400/10 border-teal-400/20",
    border: "border-teal-400/20",
    bg: "bg-teal-400/[0.04]",
  },
  closing: {
    label: "Kapanış",
    accent: "bg-[#00C8FF]",
    badge: "text-[#75E1FF] bg-[#00C8FF]/10 border-[#00C8FF]/20",
    border: "border-[#00C8FF]/30",
    bg: "bg-[#0B1830]",
  },
  visit: {
    label: "Teknik Ziyaret",
    accent: "bg-indigo-400",
    badge: "text-indigo-300 bg-indigo-400/10 border-indigo-400/20",
    border: "border-indigo-400/25",
    bg: "bg-indigo-400/[0.05]",
  },
};

export default function Program() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const sessions = activeDay === 1 ? day1 : day2;

  return (
    <section id="program" className="relative overflow-hidden bg-h2-bg py-16 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[52rem] -translate-x-1/2 bg-h2-blue/10 blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-cyan">
            Etkinlik Takvimi
          </span>
          <h2 className="mt-3 font-display text-h2-h1 font-bold text-h2-ink-1">
            İki günlük program
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-h2-body leading-relaxed text-h2-ink-2">
            Oturum saatlerini, moderatörleri ve konuşmacıları gün bazında inceleyin.
          </p>
        </div>

        <div className="mx-auto mb-10 grid max-w-2xl grid-cols-2 gap-3 rounded-h2-lg border border-h2-border bg-h2-surface-1 p-2">
          {([1, 2] as const).map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`rounded-h2-md px-4 py-4 text-left transition-all ${
                activeDay === day
                  ? "bg-h2-blue text-white shadow-md shadow-h2-blue/15"
                  : "text-h2-ink-2 hover:bg-white/5 hover:text-h2-ink-1"
              }`}
              aria-pressed={activeDay === day}
            >
              <div className="text-h2-body font-bold">{day}. Gün</div>
              <div className="mt-1 text-h2-micro opacity-75">
                {day === 1 ? "22 Ekim • Perşembe" : "23 Ekim • Cuma"}
              </div>
            </button>
          ))}
        </div>

        <div className="mb-7 flex items-center gap-4">
          <span className="whitespace-nowrap font-display text-h2-small font-bold uppercase tracking-[0.16em] text-h2-cyan">
            {activeDay === 1
              ? "1. GÜN — STRATEJİ & ENDÜSTRİ"
              : "2. GÜN — TEKNOLOJİ, EKONOMİ & UYGULAMA"}
          </span>
          <span className="h-px w-full bg-gradient-to-r from-h2-border to-transparent" />
        </div>

        <div className="space-y-4">
          {sessions.map((s, i) => {
            const c = cfg[s.type];
            const compact = ["break", "lunch", "prayer"].includes(s.type);
            return (
              <article
                key={i}
                className={`group relative overflow-hidden rounded-h2-lg border ${c.border} ${c.bg} transition-all hover:border-opacity-80 hover:shadow-lg hover:shadow-black/20`}
              >
                <span className={`absolute inset-y-0 left-0 w-1 ${c.accent}`} />
                <div className="grid sm:grid-cols-[10rem_1fr]">
                  <div className={`flex items-center gap-3 border-b border-white/5 px-6 py-4 sm:block sm:border-b-0 sm:border-r sm:border-white/5 ${compact ? "sm:py-5" : "sm:py-7"}`}>
                    <p className="font-mono text-base font-bold tracking-tight text-h2-ink-1 sm:text-lg">
                      {s.time}
                    </p>
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest sm:mt-3 ${c.badge}`}>
                      {c.label}
                    </span>
                  </div>

                  <div className={compact ? "px-6 py-5" : "px-6 py-6 sm:px-8 sm:py-7"}>
                    <h3 className={`font-display ${compact ? "text-base" : "text-xl sm:text-2xl"} font-bold leading-snug text-h2-ink-1`}>
                      {s.title}
                    </h3>
                    {s.subtitle && (
                      <p className="mt-2 text-h2-small leading-relaxed text-h2-ink-2 sm:text-h2-body">
                        {s.subtitle}
                      </p>
                    )}
                    {s.moderator && (
                      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-h2-md border border-white/8 bg-black/15 px-4 py-3 text-h2-small">
                        <span className="font-semibold uppercase tracking-wider text-h2-cyan text-[10px]">
                          Moderatör
                        </span>
                        <span className="font-semibold text-h2-ink-1">{s.moderator}</span>
                      </div>
                    )}
                    {s.speakers && s.speakers.length > 0 && (
                      <ul className={`mt-5 grid gap-x-8 gap-y-3 ${s.speakers.length > 3 ? "md:grid-cols-2" : ""}`}>
                        {s.speakers.map((sp) => (
                          <li
                            key={sp}
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
