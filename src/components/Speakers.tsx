const speakers = [
  {
    name: "Prof. Dr. Ayfer Veziroğlu",
    role: "Keynote Konuşmacı — 1. Gün",
    affiliation: "Uluslararası Hidrojen Enerji Birliği",
    initials: "AV",
    color: "bg-[#00D084]/20 text-[#00D084] border-[#00D084]/30",
  },
  {
    name: "Prof. Dr. İbrahim Dinçer",
    role: "Keynote Konuşmacı — 2. Gün",
    affiliation: "Uluslararası Enerji Araştırmacısı",
    initials: "İD",
    color: "bg-[#00C8FF]/20 text-[#00C8FF] border-[#00C8FF]/30",
  },
  {
    name: "Prof. Dr. Selahattin Çelik",
    role: "Açılış Konuşması · Panel 2 Moderatörü",
    affiliation: "AYBÜ H2TEAM",
    initials: "SÇ",
    color: "bg-[#0066CC]/20 text-[#60a5fa] border-[#0066CC]/30",
  },
  {
    name: "Oğuzhan Akyener",
    role: "Açılış Konuşması",
    affiliation: "TESPAM Başkanı",
    initials: "OA",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  {
    name: "Prof. Dr. Ali Cengiz Köseoğlu",
    role: "Açılış Konuşması",
    affiliation: "AYBÜ Rektörü",
    initials: "ACK",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  {
    name: "Prof. Dr. Erol Arcaklıoğlu",
    role: "Panel 1 Moderatörü",
    affiliation: "Türkiye Hidrojen Yol Haritası 2035",
    initials: "EA",
    color: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  },
  {
    name: "Prof. Dr. Hasan Özcan",
    role: "Panel 3 Moderatörü",
    affiliation: "Yeşil Hidrojen Üretimi",
    initials: "HÖ",
    color: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  },
];

export default function Speakers() {
  return (
    <section id="speakers" className="bg-[#06091A] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-[#00C8FF] font-semibold text-sm uppercase tracking-widest">
            Katılımcılar
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white mt-3">
            Konuşmacılar
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Program detayları güncellenmektedir. Tüm konuşmacı listesi yakında
            duyurulacaktır.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {speakers.map((s) => (
            <div
              key={s.name}
              className="bg-[#0D1530] border border-[#1A2845] hover:border-[#0066CC]/40 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-black/30 group"
            >
              {/* Avatar */}
              <div
                className={`w-14 h-14 rounded-full border ${s.color} flex items-center justify-center text-lg font-bold mb-4 group-hover:scale-110 transition-transform`}
              >
                {s.initials}
              </div>
              <h3 className="text-white font-bold text-sm leading-snug">
                {s.name}
              </h3>
              <p className="text-[#00C8FF] text-xs font-medium mt-1.5">
                {s.role}
              </p>
              <p className="text-slate-600 text-xs mt-1">{s.affiliation}</p>
            </div>
          ))}

          {/* TBA card */}
          <div className="bg-[#0D1530]/40 border border-[#1A2845] border-dashed rounded-2xl p-6 flex flex-col items-center justify-center min-h-[160px] text-center">
            <div className="w-14 h-14 rounded-full bg-[#0D1530] border border-[#1A2845] flex items-center justify-center mb-3">
              <span className="text-slate-600 text-2xl font-light">+</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Daha fazla konuşmacı
              <br />
              yakında açıklanacak
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
