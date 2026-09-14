export type Speaker = {
  name: string;
  role: string;
  affiliation?: string;
  initials: string;
  photo?: string;
  photoPosition?: string;
};

export const speakers: Speaker[] = [
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
    role: "Panel 5 Moderatörü",
    affiliation: "H2 TEAM Müdür Yardımcısı",
    initials: "HÖ",
    photo: "/speakers/hasan-ozcan.jpg",
  },
  {
    name: "Doç. Dr. Canan Acar",
    role: "Panel 3 Moderatörü",
    affiliation: "Twente Üniversitesi",
    initials: "CA",
    photo: "/speakers/canan-acar.jpg",
  },
  {
    name: "Dr. Ömer Faruk Tunçbilek",
    role: "Panel 1 Konuşmacısı",
    affiliation: "Temiz Enerji Araştırma Enstitüsü (TEMEN) Başkanı",
    initials: "ÖT",
    photo: "/speakers/omer-faruk-tuncbilek.png",
  },
  {
    name: "Emrah Özdemir",
    role: "Panel 1 Konuşmacısı",
    affiliation: "Niğde Belediye Başkanı",
    initials: "EÖ",
    photo: "/speakers/emrah-ozdemir-portrait.png",
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
    name: "TBA",
    role: "Panel 2 Konuşmacısı",
    initials: "TBA",
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
    affiliation: "Sabancı Üniversitesi",
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
    name: "Serkan Türk",
    role: "Panel 4 Konuşmacısı",
    affiliation: "Türk Çimento",
    initials: "ST",
    photo: "/speakers/serkan-turk-linkedin.jpg",
  },
  {
    name: "İsmail Erilhan",
    role: "Panel 4 Konuşmacısı",
    affiliation: "Linde Gaz",
    initials: "İE",
  },
  {
    name: "Ali Rıza Arslan",
    role: "Panel 4 Konuşmacısı",
    affiliation: "Hydrogenix",
    initials: "AA",
  },
  {
    name: "BOTAŞ",
    role: "Panel 4 Konuşmacısı",
    initials: "B",
  },
  {
    name: "Demir Çelik",
    role: "Panel 4 Konuşmacısı",
    affiliation: "TBA",
    initials: "DÇ",
  },
  {
    name: "Seramik Üreticileri",
    role: "Panel 4 Konuşmacısı",
    affiliation: "TBA",
    initials: "SÜ",
  },
  {
    name: "Ongun Yoldemir",
    role: "Panel 5 Konuşmacısı",
    affiliation: "Jeoloji Mühendisi-Türkiye Beyaz Hidrojen Potansiyeli ve Çalışmaları",
    initials: "OY",
    photo: "/speakers/ongun-yoldemir.png",
  },
  {
    name: "TBA",
    role: "Açılış Konuşması",
    affiliation: "Enerji Bakanı / Bakan Yardımcısı",
    initials: "TBA",
  },
  {
    name: "Adnan Görgülü",
    role: "Panel 5 Konuşmacısı",
    affiliation: "Siemens Enerji",
    initials: "AG",
    photo: "/speakers/adnan-gorgulu-linkedin.jpg",
  },
  {
    name: "Kadir Gökhan Güler",
    role: "Panel 5 Konuşmacısı",
    affiliation: "General Electric Aerospace-Senior Engineering Manager",
    initials: "KG",
    photo: "/speakers/kadir-gokhan-guler.jpg",
  },
  {
    name: "TBA",
    role: "Panel 5 Konuşmacısı",
    initials: "TBA",
  },
  {
    name: "Prof. Dr. Abdullah Yıldız",
    role: "Panel 4 Moderatörü",
    affiliation: "AYBÜ Rektör Yardımcısı",
    initials: "AY",
    photo: "/speakers/abdullah-yildiz.jpg",
  },
];

export const titleRank = (name: string) => {
  if (name.startsWith("Prof. Dr.")) return 0;
  if (name.startsWith("Doç. Dr.")) return 1;
  if (name.startsWith("Dr.")) return 2;
  return 3;
};

export const nameWithoutTitle = (name: string) =>
  name.replace(/^(Prof\. Dr\.|Doç\. Dr\.|Dr\.)\s*/, "");

export const sortSpeakers = (groupRole: string, preferredOrder: string[] = []) =>
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

export const speakerGroupDefinitions = [
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
    preferredOrder: [
      "Prof. Dr. İbrahim Dinçer",
      "Emrah Özdemir",
      "Dr. Betül Erdör Türk",
      "Dr. Ömer Faruk Tunçbilek",
      "Gürsel Erul",
    ],
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
    preferredOrder: [
      "Prof. Dr. Abdullah Yıldız",
      "Serkan Türk",
      "İsmail Erilhan",
      "Ali Rıza Arslan",
      "BOTAŞ",
      "Demir Çelik",
      "Seramik Üreticileri",
    ],
  },
  {
    id: "panel-5",
    title: "Panel 5: Hidrojen Ekonomisi, Ar-Ge ve Ticarileşme",
    role: "Panel 5",
  },
];
