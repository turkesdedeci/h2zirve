import Image from "next/image";

type Speaker = {
  name: string;
  role: string;
  affiliation?: string;
  initials: string;
  photo?: string;
  photoPosition?: string;
};

const speakers: Speaker[] = [
  {
    name: "Prof. Dr. İbrahim Dinçer",
    role: "Keynote Konuşmacı - 1. Gün / Panel 1 Konuşmacısı",
    affiliation: "Ontario Tech University",
    initials: "İD",
    photo: "/speakers/ibrahim-dincer-2026-shoulders.png",
  },
  {
    name: "Dr. Ayfer Veziroğlu",
    role: "Keynote Konuşmacı - 1. Gün",
    affiliation: "International Association for Hydrogen Energy (IAHE)",
    initials: "AV",
    photo: "/speakers/ayfer-veziroglu-iahe-2026-clear-up.png",
  },
  {
    name: "Prof. Dr. Selahattin Çelik",
    role: "Açılış Konuşması - Panel 2 Moderatörü",
    affiliation: "H2 TEAM Müdürü",
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
    photo: "/speakers/ali-cengiz-koseoglu.png",
  },
  {
    name: "Prof. Dr. Erol Arcaklıoğlu",
    role: "Panel 1 Moderatörü",
    affiliation: "YÖK Yürütme Kurulu Üyesi",
    initials: "EA",
    photo: "/speakers/erol-arcaklioglu.png",
  },
  {
    name: "Prof. Dr. Hasan Özcan",
    role: "Panel 3 Moderatörü",
    affiliation: "H2 TEAM Müdür Yardımcısı",
    initials: "HÖ",
    photo: "/speakers/hasan-ozcan.jpg",
  },
  {
    name: "Doç. Dr. Canan Acar",
    role: "Panel 4 Moderatörü",
    affiliation: "Twente Üniversitesi",
    initials: "CA",
    photo: "/speakers/canan-acar.jpg",
  },
  {
    name: "Dr. Ömer Faruk Tunçbilek",
    role: "Panel 1 Konuşmacısı",
    affiliation: "TENMAK-TEMEN Başkanı",
    initials: "ÖT",
    photo: "/speakers/omer-faruk-tuncbilek.png",
  },
  {
    name: "Prof. Dr. İlker Murat Ar",
    role: "Panel 1 Konuşmacısı",
    affiliation: "Sanayi ve Teknoloji Bakanlığı Sanayi Genel Müdürü",
    initials: "İA",
    photo: "/speakers/ilker-murat-ar.jpg",
  },
  {
    name: "Gürsel Erul",
    role: "Panel 1 Konuşmacısı",
    affiliation:
      "Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Çevre Yönetimi Genel Müdür Yardımcısı",
    initials: "GE",
    photo: "/speakers/gursel-erul.jpg",
  },
  {
    name: "Dr. Betül Erdör Türk",
    role: "Panel 1 Konuşmacısı",
    affiliation: "TÜBİTAK Hidrojen ve Yakıt Pili Teknolojileri Araştırma Grubu Lideri",
    initials: "BE",
    photo: "/speakers/betul-erdor-turk.jpg",
  },
  {
    name: "Dr. Paulina Seyfert",
    role: "Panel 5 Konuşmacısı",
    affiliation: "Almanya Enerji Bakanlığı",
    initials: "PS",
    photo: "/speakers/pauline-seyfert.jpg",
  },
  {
    name: "Deniz Demirci",
    role: "Panel 2 Konuşmacısı",
    affiliation:
      "Savunma Sanayii Başkanlığı (SSB) Gelişmiş Malzemeler ve Enerji Programı Yöneticisi",
    initials: "DD",
    photo: "/speakers/deniz-demirci.jpg",
  },
  {
    name: "Dr. Uğur Kayasal",
    role: "Panel 2 Konuşmacısı",
    affiliation: "ROKETSAN Yeni Nesil Güç Sistemleri Müdürü",
    initials: "UK",
    photo: "/speakers/ugur-kayasal.jpg",
  },
  {
    name: "Kadir Gökhan Güler",
    role: "Panel 2 Konuşmacısı",
    affiliation: "General Electric Aerospace Senior Engineering Manager",
    initials: "KG",
    photo: "/speakers/kadir-gokhan-guler.jpg",
  },
  {
    name: "Prof. Dr. Mustafa İlbaş",
    role: "Panel 2 Konuşmacısı",
    affiliation: "ASFAT Genel Müdürü",
    initials: "Mİ",
    photo: "/speakers/mustafa-ilbas-x.jpg",
  },
  {
    name: "Ömer Erdemir",
    role: "Panel 2 Konuşmacısı",
    affiliation: "LENTATEK A.Ş. Hidrojen ve Yakıt Pili Teknolojileri Teknik Lideri",
    initials: "ÖE",
    photo: "/speakers/omer-erdemir.png",
  },
  {
    name: "Yusuf Günay",
    role: "Panel 3 Konuşmacısı",
    affiliation: "Yeşil Hidrojen Üreticileri Derneği Başkanı",
    initials: "YG",
    photo: "/speakers/yusuf-gunay.png",
  },
  {
    name: "Prof. Dr. Can Erkey",
    role: "Panel 3 Konuşmacısı",
    affiliation: "Koç Üniversitesi Hidrojen Teknolojileri Merkezi (KUHyTech) Direktörü",
    initials: "CE",
    photo: "/speakers/can-erkey-kuhytech.jpg",
  },
  {
    name: "Prof. Dr. Selmiye Alkan Gürsel",
    role: "Panel 3 Konuşmacısı",
    affiliation: "Sabancı Üniversitesi · HYSouthMarmara",
    initials: "SAG",
    photo: "/speakers/selmiye-alkan-gursel.png",
  },
  {
    name: "Prof. Dr. Yüksel Kaplan",
    role: "Panel 3 Konuşmacısı",
    affiliation: "Niğde Ömer Halisdemir Üniversitesi",
    initials: "YK",
    photo: "/speakers/yuksel-kaplan.jpg",
  },
  {
    name: "Dr. Çiğdem Karadağ",
    role: "Panel 3 Konuşmacısı",
    affiliation: "TÜBİTAK MAM",
    initials: "ÇK",
    photo: "/speakers/cigdem-karadag.jpg",
    photoPosition: "center bottom",
  },
  {
    name: "Süleyman Furkan Özdil",
    role: "Panel 4 Konuşmacısı",
    affiliation: "Ereğli Erdemir Demir Çelik",
    initials: "SÖ",
  },
  {
    name: "Ongun Yoldemir",
    role: "Panel 5 Konuşmacısı",
    affiliation: "Jeoloji Mühendisi - Türkiye Beyaz Hidrojen Kuyuları",
    initials: "OY",
    photo: "/speakers/ongun-yoldemir.png",
  },
  {
    name: "TBA",
    role: "Açılış Konuşması",
    affiliation: "Enerji Bakanı / Bakan Yardımcısı / TENMAK Başkanı",
    initials: "TBA",
  },
  {
    name: "TBA",
    role: "Panel 4 Konuşmacısı",
    initials: "TBA",
  },
  {
    name: "TBA",
    role: "Panel 4 Konuşmacısı",
    initials: "TBA",
  },
  {
    name: "TBA",
    role: "Panel 4 Konuşmacısı",
    initials: "TBA",
  },
  {
    name: "TBA",
    role: "Panel 4 Konuşmacısı",
    initials: "TBA",
  },
  {
    name: "TBA",
    role: "Panel 5 Konuşmacısı",
    initials: "TBA",
  },
  {
    name: "TBA",
    role: "Panel 5 Konuşmacısı",
    initials: "TBA",
  },
  {
    name: "TBA",
    role: "Panel 5 Moderatörü",
    initials: "TBA",
  },
];

const titleRank = (name: string) => {
  if (name.startsWith("Prof. Dr.")) return 0;
  if (name.startsWith("Doç. Dr.")) return 1;
  if (name.startsWith("Dr.")) return 2;
  return 3;
};

const nameWithoutTitle = (name: string) =>
  name.replace(/^(Prof\. Dr\.|Doç\. Dr\.|Dr\.)\s*/, "");

const sortSpeakers = (groupRole: string, preferredOrder: string[] = []) =>
  (a: Speaker, b: Speaker) => {
    const moderatorDifference =
      Number(!a.role.includes(`${groupRole} Moderatörü`)) -
      Number(!b.role.includes(`${groupRole} Moderatörü`));
    if (moderatorDifference !== 0) return moderatorDifference;

    const aPreferredIndex = preferredOrder.indexOf(a.name);
    const bPreferredIndex = preferredOrder.indexOf(b.name);
    if (aPreferredIndex !== -1 || bPreferredIndex !== -1) {
      if (aPreferredIndex === -1) return 1;
      if (bPreferredIndex === -1) return -1;
      return aPreferredIndex - bPreferredIndex;
    }

    const rankDifference = titleRank(a.name) - titleRank(b.name);
    if (rankDifference !== 0) return rankDifference;

    return nameWithoutTitle(a.name).localeCompare(nameWithoutTitle(b.name), "tr", {
      sensitivity: "base",
    });
  };

const speakerGroupDefinitions = [
  {
    id: "opening",
    title: "Açılış konuşmaları",
    role: "Açılış Konuşması",
    preferredOrder: [
      "Prof. Dr. Selahattin Çelik",
      "Oğuzhan Akyener",
      "Prof. Dr. Ali Cengiz Köseoğlu",
      "TBA",
    ],
  },
  {
    id: "panel-1",
    title: "Panel 1: Türkiye Hidrojen Yol Haritası 2035",
    role: "Panel 1",
  },
  {
    id: "panel-2",
    title: "Panel 2: Savunma Sanayinde Hidrojen Teknolojileri",
    role: "Panel 2",
  },
  {
    id: "panel-3",
    title: "Panel 3: Yeşil Hidrojen Üretimi ve Endüstriyel Uygulamalar",
    role: "Panel 3",
    preferredOrder: [
      "Prof. Dr. Hasan Özcan",
      "Prof. Dr. Can Erkey",
      "Prof. Dr. Selmiye Alkan Gürsel",
      "Yusuf Günay",
      "Dr. Çiğdem Karadağ",
      "Prof. Dr. Yüksel Kaplan",
    ],
  },
  {
    id: "panel-4",
    title: "Panel 4: Sanayide Hidrojen Kullanımı",
    role: "Panel 4",
  },
  {
    id: "panel-5",
    title: "Panel 5: Hidrojen Ekonomisi, Ar-Ge ve Ticarileşme",
    role: "Panel 5",
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
          style={{ objectPosition: speaker.photoPosition ?? "50% 0%" }}
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
  const speakerGroups = speakerGroupDefinitions.map((group) => ({
    ...group,
    speakers: speakers
      .filter((speaker) => speaker.role.includes(group.role))
      .sort(sortSpeakers(group.role, group.preferredOrder)),
  }));

  return (
    <section id="speakers" className="relative overflow-hidden bg-h2-bg py-16 sm:py-28">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-14 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <span className="font-display text-h2-small font-semibold uppercase tracking-[0.22em] text-h2-cyan">
              Alanında öncü isimler
            </span>
            <h2 className="mt-3 max-w-3xl font-display text-h2-h1 font-bold leading-tight text-h2-ink-1">
              Hidrojenin geleceğine yön veren konuşmacılar
            </h2>
          </div>
          <p className="max-w-md text-h2-small leading-relaxed text-h2-ink-2 lg:pb-2">
            Akademi, kamu ve sanayiden gelen konuşmacılar; keynote oturumları ve
            tematik panellerde hidrojenin geleceğini birlikte ele alıyor.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((speaker, index) => (
            <article
              key={speaker.name}
              className="group relative overflow-hidden rounded-h2-lg border border-white/10 bg-h2-surface-2 shadow-xl shadow-black/20"
            >
              <Portrait
                speaker={speaker}
                featured
                accent={index === 0 ? "green" : "blue"}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <div className="mb-3 inline-flex rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                  Keynote
                </div>
                <h3 className="font-display text-2xl font-bold text-h2-ink-1 sm:text-3xl">
                  {speaker.name}
                </h3>
                <p className="mt-2 text-h2-small font-semibold text-h2-cyan">
                  {speaker.role}
                </p>
                {speaker.affiliation && (
                  <p className="mt-1 text-h2-small text-h2-ink-2">
                    {speaker.affiliation}
                  </p>
                )}
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

        <div className="mt-9 divide-y divide-h2-border border-y border-h2-border">
          {speakerGroups.map((group, groupIndex) => (
            <section
              key={group.id}
              aria-labelledby={`${group.id}-title`}
              className="grid gap-7 py-10 sm:py-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10"
            >
              <div className="lg:pt-1">
                <span className="font-display text-[11px] font-bold tracking-[0.2em] text-h2-cyan">
                  {String(groupIndex + 1).padStart(2, "0")}
                </span>
                <h4
                  id={`${group.id}-title`}
                  className="mt-2 max-w-[18rem] font-display text-h2-h3 font-bold leading-tight text-h2-ink-1"
                >
                  {group.title}
                </h4>
                <p className="mt-2 text-h2-micro text-h2-ink-3">
                  {group.speakers.length} konuşmacı
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 md:gap-x-7 lg:grid-cols-4 xl:grid-cols-6">
                {group.speakers.map((speaker, speakerIndex) => {
                  const isModerator = speaker.role.includes(`${group.role} Moderatörü`);

                  return (
                    <article
                      key={`${speaker.name}-${speaker.affiliation ?? speakerIndex}`}
                      className="group text-center"
                    >
                      <div className="relative mx-auto w-full max-w-[142px] overflow-hidden rounded-full border border-white/10 bg-h2-surface-2 p-1 transition-[transform,border-color,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-h2-cyan/50 group-hover:shadow-xl group-hover:shadow-h2-blue/10">
                        <div className="overflow-hidden rounded-full">
                          <Portrait
                            speaker={speaker}
                            accent={(groupIndex + speakerIndex) % 2 === 0 ? "blue" : "green"}
                          />
                        </div>
                        {isModerator && (
                          <span className="absolute inset-x-3 bottom-2 rounded-full border border-h2-cyan/25 bg-[#07101F]/90 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-h2-cyan backdrop-blur-sm">
                            Moderatör
                          </span>
                        )}
                      </div>
                      <h5 className="mx-auto mt-4 max-w-[190px] text-h2-small font-bold leading-snug text-h2-ink-1">
                        {speaker.name}
                      </h5>
                      {speaker.affiliation && (
                        <p className="mx-auto mt-1 max-w-[210px] text-[12px] leading-relaxed text-h2-ink-2">
                          {speaker.affiliation}
                        </p>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 text-center text-h2-micro text-h2-ink-disabled">
          Konuşmacı listesi program teyitleriyle birlikte güncellenmektedir.
        </p>
      </div>
    </section>
  );
}
