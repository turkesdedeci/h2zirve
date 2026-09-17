export type SessionType =
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

export interface Session {
  time: string;
  type: SessionType;
  title: string;
  subtitle?: string;
  moderator?: string;
  speakers?: string[];
}

export const day1: Session[] = [
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
      "TBA | Enerji Bakanı / Bakan Yardımcısı (15 dk)",
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
    time: "13:30 - 14:15",
    type: "keynote",
    title: "Keynote Konuşmacı: Dr. Ayfer Veziroğlu",
  },
  { time: "14:15 - 14:30", type: "break", title: "Kahve Arası" },
  {
    time: "14:30 - 16:00",
    type: "panel",
    title: "Panel 1: Türkiye Hidrojen Yol Haritası 2035",
    moderator: "Prof. Dr. Erol Arcaklıoğlu | YÖK Yürütme Kurulu Üyesi",
    speakers: [
      "Prof. Dr. İbrahim Dinçer | Ontario Tech University",
      "Dr. Ömer Faruk Tunçbilek | TENMAK-TEMEN Başkanı",
      "Emrah Özdemir | Niğde Belediye Başkanı",
      "Gürsel Erul | Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Çevre Yönetimi Genel Müdür Yardımcısı",
      "Dr. Betül Erdör Türk | TÜBİTAK Hidrojen ve Yakıt Pili Teknolojileri Araştırma Grubu Lideri",
    ],
  },
  { time: "16:00 - 16:15", type: "break", title: "Kahve Arası" },
  {
    time: "16:15 - 17:30",
    type: "panel",
    title: "Panel 2: Savunma Sanayinde Hidrojen Teknolojileri",
    moderator: "Prof. Dr. Selahattin Çelik | H2 TEAM Müdürü",
    speakers: [
      "Prof. Dr. Mustafa İlbaş | ASFAT Genel Müdürü",
      "Dr. Uğur Kayasal | ROKETSAN Yeni Nesil Güç Sistemleri Müdürü",
      "Deniz Demirci | Savunma Sanayii Başkanlığı (SSB) Gelişmiş Malzemeler ve Enerji Programı Yöneticisi",
      "Ömer Erdemir | LENTATEK A.Ş. Hidrojen ve Yakıt Pili Teknolojileri Teknik Lideri",
    ],
  },
  {
    time: "17:30 - 18:30",
    type: "poster",
    title: "Poster Sunumları & Sergi Ziyareti",
    speakers: [
      "Poster sahipleri ile birebir etkileşim",
      "Firma standlarının aktif ziyareti",
      "Networking",
    ],
  },
  { time: "19:30", type: "gala", title: "Gala Yemeği & Networking" },
];

export const day2: Session[] = [
  {
    time: "09:30 - 10:30",
    type: "registration",
    title: "Karşılama & Sabah Kahvesi",
  },
  {
    time: "10:30 - 11:45",
    type: "panel",
    title: "Panel 3: Yeşil Hidrojen Üretimi ve Endüstriyel Uygulamalar",
    moderator: "Prof. Dr. Canan Acar | Twente Üniversitesi",
    speakers: [
      "Prof. Dr. Can Erkey | Koç Üniversitesi Hidrojen Teknolojileri Merkezi Direktörü (Online)",
      "Prof. Dr. Selmiye Alkan Gürsel | Sabancı Üniversitesi",
      "Prof. Dr. Yüksel Kaplan | Niğde Ömer Halisdemir Üniversitesi",
      "Doç. Dr. Kadir Bektaş | UNFCCC Kıdemli Uzmanı (ERT) — Tarım, Enerji ve IPPU | Article 6 Teknik Uzmanı",
      "Dr. Çiğdem Karadağ | TÜBİTAK MAM",
    ],
  },
  { time: "11:45 - 12:00", type: "break", title: "Kahve Arası & Sergi" },
  {
    time: "12:00 - 12:45",
    type: "poster",
    title: "Poster Sunumları Jüri Puanlama",
  },
  { time: "12:45 - 13:45", type: "lunch", title: "Öğle Yemeği & Cuma Namazı" },
  {
    time: "14:00 - 15:15",
    type: "panel",
    title: "Panel 4: Sanayide Hidrojen Kullanımı",
    moderator: "Prof. Dr. Abdullah Yıldız | AYBÜ Rektör Yardımcısı",
    speakers: [
      "Doç. Dr. Kağan Kayacı | Kale Seramik",
      "Ali Rıza Arslan | Hydrogenix",
      "İsmail Erilhan | Linde Gaz",
      "Serkan Türk | Türkiye Çimento Sanayicileri Birliği AR-GE Enstitüsü Müdürü",
      "Demir Çelik | TBA",
    ],
  },
  { time: "15:15 - 15:30", type: "break", title: "Kahve Arası" },
  {
    time: "15:30 - 16:30",
    type: "panel",
    title: "Panel 5: Hidrojen Ekonomisi, Ar-Ge ve Ticarileşme",
    moderator: "Prof. Dr. Hasan Özcan | H2 TEAM Müdür Yardımcısı",
    speakers: [
      "Adnan Görgülü | Siemens Enerji",
      "Ongun Yoldemir | Jeoloji Mühendisi-Türkiye Beyaz Hidrojen Potansiyeli ve Çalışmaları",
      "Kadir Gökhan Güler | General Electric Aerospace-Senior Engineering Manager",
      "Dr. Paulina Seyfert | Almanya Enerji Bakanlığı",
    ],
  },
  {
    time: "16:30 - 17:00",
    type: "closing",
    title: "Poster Ödüllerinin Takdimi & Kapanış",
    subtitle: "Kapanış konuşması: Prof. Dr. Hasan Özcan",
  },
  {
    time: "17:30 - 18:30",
    type: "visit",
    title: "Teknik Ziyaret: AYBÜ H2TEAM Laboratuvar Ziyareti",
  },
];

/** Oturum tipinin Türkçe etiketi. Tailwind sınıfları Program.tsx'te kalır. */
export const programDays = [
  { date: "22", weekday: "Perşembe", theme: "Strateji ve endüstri", sessions: day1 },
  { date: "23", weekday: "Cuma", theme: "Teknoloji ve uygulama", sessions: day2 },
];

export const sessionLabels: Record<SessionType, string> = {
  registration: "Karşılama",
  opening: "Açılış",
  break: "Ara",
  keynote: "Keynote",
  panel: "Panel",
  lunch: "Mola",
  poster: "Poster",
  gala: "Sosyal Program",
  closing: "Kapanış",
  visit: "Teknik Ziyaret",
};
