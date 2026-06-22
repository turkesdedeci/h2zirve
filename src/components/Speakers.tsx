import Image from "next/image";

type Speaker = {
  name: string;
  role: string;
  affiliation: string;
  initials: string;
  photo?: string;
};

const speakers: Speaker[] = [
  {
    name: "Dr. Ayfer Veziroğlu",
    role: "Keynote Konuşmacı — 1. Gün",
    affiliation: "Uluslararası Hidrojen Enerji Birliği",
    initials: "AV",
    photo: "/speakers/ayfer-veziroglu.jpg",
  },
  {
    name: "Prof. Dr. İbrahim Dinçer",
    role: "Keynote Konuşmacı — 2. Gün",
    affiliation: "Uluslararası Enerji Araştırmacısı",
    initials: "İD",
    photo: "/speakers/ibrahim-dincer.jpg",
  },
  {
    name: "Prof. Dr. Selahattin Çelik",
    role: "Açılış Konuşması · Panel 2 Moderatörü",
    affiliation: "AYBÜ H2TEAM",
    initials: "SÇ",
    photo: "/speakers/selahattin-celik.jpg",
  },
  {
    name: "Oğuzhan Akyener",
    role: "Açılış Konuşması",
    affiliation: "TESPAM Başkanı",
    initials: "OA",
    photo: "/speakers/oguzhan-akyener.png",
  },
  {
    name: "Prof. Dr. Ali Cengiz Köseoğlu",
    role: "Açılış Konuşması",
    affiliation: "AYBÜ Rektörü",
    initials: "AK",
    photo: "/speakers/ali-cengiz-koseoglu.jpg",
  },
  {
    name: "Prof. Dr. Erol Arcaklıoğlu",
    role: "Panel 1 Moderatörü",
    affiliation: "Türkiye Hidrojen Yol Haritası 2035",
    initials: "EA",
    photo: "/speakers/erol-arcaklioglu.webp",
  },
  {
    name: "Prof. Dr. Hasan Özcan",
    role: "Panel 3 Moderatörü",
    affiliation: "Yeşil Hidrojen Üretimi",
    initials: "HÖ",
    photo: "/speakers/hasan-ozcan.jpg",
  },
  {
    name: "Dr. Paulia Seyfert",
    role: "Panel 1 Konuşmacısı",
    affiliation: "Almanya Enerji Bakanlığı",
    initials: "PS",
  },
  {
    name: "Prof. Dr. Mustafa İlbaş",
    role: "Panel 2 Konuşmacısı",
    affiliation: "ASFAT",
    initials: "Mİ",
    photo: "/speakers/mustafa-ilbas.jpg",
  },
  {
    name: "İbrahim Pamuk",
    role: "Panel 2 Konuşmacısı",
    affiliation: "LENTATEK",
    initials: "İP",
    photo: "/speakers/ibrahim-pamuk.jpg",
  },
  {
    name: "Prof. Dr. Bülent Yeşilata",
    role: "Panel 4 Moderatörü",
    affiliation: "Sanayide Hidrojen Kullanımı",
    initials: "BY",
    photo: "/speakers/bulent-yesilata.jpg",
  },
  {
    name: "Prof. Dr. Yüksel Kaplan",
    role: "Konuşmacı",
    affiliation: "Türkiye Hidrojen Zirvesi 2026",
    initials: "YK",
    photo: "/speakers/yuksel-kaplan.jpg",
  },
];

function Portrait({
  speaker,
  featured = false,
  accent,
}: {
  speaker: Speaker;
  featured?: boolean;
  accent: "green" | "blue";
}) {
  const accentClasses =
    accent === "green"
      ? "from-h2-green/50 via-[#00695A]/25 to-[#06182A] text-[#8FFFD2]"
      : "from-h2-cyan/50 via-h2-blue/25 to-[#06182A] text-[#A8ECFF]";

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${accentClasses} ${
        featured ? "h-[440px] sm:h-[560px]" : "aspect-square"
      }`}
    >
      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_50%_25%,rgba(255,255,255,.35),transparent_35%),linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:auto,30px_30px,30px_30px]" />
      {speaker.photo ? (
        <Image
          src={speaker.photo}
          alt={speaker.name}
          fill
          sizes={featured ? "(max-width: 768px) 100vw, 40vw" : "220px"}
          className="object-cover object-top"
        />
      ) : (
        <div className="relative flex h-full items-center justify-center">
          <span
            className={`${
              featured ? "text-7xl sm:text-8xl" : "text-4xl"
            } font-black tracking-[-0.08em] opacity-80`}
          >
            {speaker.initials}
          </span>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#07101F] to-transparent" />
    </div>
  );
}

export default function Speakers() {
  const featured = speakers.slice(0, 2);
  const others = speakers.slice(2);

  return (
    <section id="speakers" className="relative overflow-hidden bg-h2-bg py-16 sm:py-28">
      <div className="pointer-events-none absolute -left-48 top-24 h-96 w-96 rounded-full bg-h2-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-52 bottom-0 h-96 w-96 rounded-full bg-h2-green/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-14 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-cyan">
              Alanında Öncü İsimler
            </span>
            <h2 className="mt-3 max-w-3xl font-display text-h2-h1 font-bold leading-tight text-h2-ink-1">
              Hidrojenin geleceğine yön veren konuşmacılar
            </h2>
          </div>
          <p className="max-w-md text-h2-small leading-relaxed text-h2-ink-2 lg:pb-2">
            Akademi, kamu ve sanayiden gelen konuşmacılar; keynote oturumları ve
            tematik panellerle iki günlük programı şekillendiriyor.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((speaker, index) => (
            <article
              key={speaker.name}
              className="group relative overflow-hidden rounded-h2-xl border border-white/10 bg-h2-surface-2 shadow-2xl shadow-black/25"
            >
              <Portrait
                speaker={speaker}
                featured
                accent={index === 0 ? "green" : "blue"}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="mb-3 inline-flex rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                  Keynote
                </div>
                <h3 className="font-display text-2xl font-bold text-h2-ink-1 sm:text-3xl">
                  {speaker.name}
                </h3>
                <p className="mt-2 text-h2-small font-semibold text-h2-cyan">
                  {speaker.role}
                </p>
                <p className="mt-1 text-h2-small text-h2-ink-2">{speaker.affiliation}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex items-center gap-4">
          <h3 className="whitespace-nowrap font-display text-h2-small font-bold uppercase tracking-[0.2em] text-h2-ink-2">
            Diğer konuşmacılar
          </h3>
          <span className="h-px w-full bg-gradient-to-r from-h2-border to-transparent" />
        </div>

        <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {others.map((speaker, index) => (
            <article key={speaker.name} className="group text-center">
              <div className="mx-auto w-full max-w-[190px] overflow-hidden rounded-full border border-white/10 bg-h2-surface-2 p-1 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-h2-cyan/50 group-hover:shadow-xl group-hover:shadow-h2-blue/10">
                <div className="overflow-hidden rounded-full">
                  <Portrait
                    speaker={speaker}
                    accent={index % 2 === 0 ? "blue" : "green"}
                  />
                </div>
              </div>
              <h3 className="mx-auto mt-5 max-w-[220px] text-h2-small font-bold leading-snug text-h2-ink-1">
                {speaker.name}
              </h3>
              <p className="mt-2 text-h2-micro font-semibold leading-relaxed text-h2-cyan">
                {speaker.role}
              </p>
              <p className="mt-1 text-h2-micro leading-relaxed text-h2-ink-3">
                {speaker.affiliation}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-14 text-center text-h2-micro text-h2-ink-disabled">
          Konuşmacı listesi program teyitleriyle birlikte güncellenmektedir.
        </p>
      </div>
    </section>
  );
}
