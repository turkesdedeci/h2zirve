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
      "Enerji Bakanı / Bakan Yardımcısı / TENMAK Başkanı (15 dk)",
    ],
  },
  { time: "10:50 – 11:05", type: "break", title: "Kahve Arası" },
  {
    time: "11:05 – 11:50",
    type: "keynote",
    title: "Keynote Konuşma",
    speakers: ["Prof. Dr. Ayfer Veziroğlu"],
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
    ],
  },
  { time: "14:30 – 15:00", type: "break", title: "Kahve Arası" },
  {
    time: "15:00 – 16:15",
    type: "panel",
    title: "Panel 2 — Savunma Sanayinde Hidrojen Teknolojileri",
    moderator: "Prof. Dr. Selahattin Çelik (Öneri)",
    speakers: [
      "Savunma Sanayii Başkanlığı (SSB)",
      "ROKETSAN",
      "ASELSAN",
      "ASFAT",
      "LENTATEK",
    ],
  },
  {
    time: "16:15 – 17:30",
    type: "panel",
    title: "Panel 3 — Yeşil Hidrojen Üretimi ve Endüstriyel Uygulamalar",
    moderator: "Prof. Dr. Hasan Özcan (Öneri)",
    speakers: [
      "Yeşil Hidrojen Üreticileri Derneği",
      "TÜPRAŞ",
      "Yenilenebilir enerji firması (GES/RES)",
      "Elektrolizör teknolojisi firması",
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
  { badge: string; border: string; bg: string; dot: string }
> = {
  registration: {
    badge: "text-slate-400",
    border: "border-[#1A2845]",
    bg: "bg-[#0D1530]/60",
    dot: "bg-slate-500",
  },
  opening: {
    badge: "text-[#00C8FF]",
    border: "border-[#00C8FF]/25",
    bg: "bg-[#00C8FF]/5",
    dot: "bg-[#00C8FF]",
  },
  break: {
    badge: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
    dot: "bg-amber-400",
  },
  keynote: {
    badge: "text-[#00D084]",
    border: "border-[#00D084]/30",
    bg: "bg-[#00D084]/5",
    dot: "bg-[#00D084]",
  },
  panel: {
    badge: "text-[#60a5fa]",
    border: "border-[#0066CC]/35",
    bg: "bg-[#0066CC]/8",
    dot: "bg-[#0066CC]",
  },
  lunch: {
    badge: "text-orange-400",
    border: "border-orange-500/20",
    bg: "bg-orange-500/5",
    dot: "bg-orange-400",
  },
  poster: {
    badge: "text-purple-400",
    border: "border-purple-500/25",
    bg: "bg-purple-500/5",
    dot: "bg-purple-400",
  },
  gala: {
    badge: "text-pink-400",
    border: "border-pink-500/25",
    bg: "bg-pink-500/5",
    dot: "bg-pink-400",
  },
  prayer: {
    badge: "text-teal-400",
    border: "border-teal-500/20",
    bg: "bg-teal-500/5",
    dot: "bg-teal-400",
  },
  closing: {
    badge: "text-[#00C8FF]",
    border: "border-[#00C8FF]/25",
    bg: "bg-[#00C8FF]/5",
    dot: "bg-[#00C8FF]",
  },
  visit: {
    badge: "text-indigo-400",
    border: "border-indigo-500/25",
    bg: "bg-indigo-500/5",
    dot: "bg-indigo-400",
  },
};

export default function Program() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const sessions = activeDay === 1 ? day1 : day2;

  return (
    <section id="program" className="bg-[#060B18] py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-[#00C8FF] font-semibold text-sm uppercase tracking-widest">
            Etkinlik Takvimi
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3">
            Program
          </h2>
        </div>

        {/* Day tabs */}
        <div className="flex gap-2 mb-10 bg-[#0D1530] border border-[#1A2845] rounded-2xl p-2 max-w-sm mx-auto">
          {([1, 2] as const).map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`flex-1 py-3 px-3 rounded-xl text-sm font-semibold transition-all ${
                activeDay === day
                  ? "bg-[#0066CC] text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <div className="font-bold">{day}. Gün</div>
              <div className="text-xs opacity-70 mt-0.5">
                {day === 1 ? "15 Ekim • Perşembe" : "16 Ekim • Cuma"}
              </div>
            </button>
          ))}
        </div>

        {/* Day label */}
        <div className="text-center mb-8">
          <span className="text-[#00C8FF] font-bold text-base tracking-wide uppercase">
            {activeDay === 1
              ? "1. GÜN — STRATEJİ & ENDÜSTRİ"
              : "2. GÜN — TEKNOLOJİ, EKONOMİ & UYGULAMA"}
          </span>
        </div>

        {/* Sessions list */}
        <div className="space-y-2.5">
          {sessions.map((s, i) => {
            const c = cfg[s.type];
            return (
              <div
                key={i}
                className={`${c.bg} border ${c.border} rounded-xl p-5 transition-all hover:brightness-110`}
              >
                <div className="flex items-start gap-4">
                  {/* Dot */}
                  <div className="mt-2 flex-shrink-0">
                    <span className={`block w-2 h-2 rounded-full ${c.dot}`} />
                  </div>
                  {/* Time */}
                  <div className="text-slate-500 text-xs font-mono whitespace-nowrap mt-1 min-w-[7.5rem]">
                    {s.time}
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold text-sm sm:text-base ${c.badge}`}>
                      {s.title}
                    </p>
                    {s.subtitle && (
                      <p className="text-slate-400 text-sm mt-0.5">
                        {s.subtitle}
                      </p>
                    )}
                    {s.moderator && (
                      <p className="text-slate-500 text-xs mt-1">
                        <span className="text-slate-400 font-medium">
                          Moderatör:
                        </span>{" "}
                        {s.moderator}
                      </p>
                    )}
                    {s.speakers && s.speakers.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {s.speakers.map((sp) => (
                          <li
                            key={sp}
                            className="text-slate-500 text-xs flex items-start gap-2"
                          >
                            <span className="mt-1 text-slate-700">›</span>
                            <span>{sp}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
