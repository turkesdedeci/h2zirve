export type Komite = {
  title: string;
  members: { name: string; org: string }[];
};

const AYBU = "Ankara Yıldırım Beyazıt Üniversitesi";

export const komiteler: Komite[] = [
  {
    title: "Organizasyon Komitesi",
    members: [
      { name: "Prof. Dr. Yüksel Kaplan", org: "Niğde Ömer Halisdemir Üniversitesi" },
      { name: "Prof. Dr. Selahattin Çelik", org: AYBU },
      { name: "Prof. Dr. Hasan Özcan", org: AYBU },
      { name: "Prof. Dr. Kamil Arslan", org: AYBU },
      { name: "Doç. Dr. Begüm Ünveroğlu Abdioğlu", org: AYBU },
      { name: "Doç. Dr. Meryem Sena Akkuş", org: AYBU },
      { name: "Oğuzhan Akyener", org: "TESPAM" },
      { name: "Gülşah Kılıç", org: "TESPAM" },
      { name: "Süleyman Türkeş Dedeci", org: "" },
      { name: "Yekpa Ahmed", org: "TESPAM" },
    ],
  },
  {
    title: "Bilimsel ve Endüstriyel Poster Değerlendirme Komitesi",
    members: [
      { name: "Prof. Dr. Abdullah Yıldız", org: AYBU },
      { name: "Ali Rıza Arslan", org: "Hydrogenix" },
      { name: "Doç. Dr. Alperen Tozlu", org: "Bayburt Üniversitesi" },
      { name: "Dr. Ayfer Veziroğlu", org: "International Association for Hydrogen Energy" },
      { name: "Prof. Dr. Battal Doğan", org: "Gazi Üniversitesi" },
      { name: "Doç. Dr. Begüm Ünveroğlu Abdioğlu", org: AYBU },
      { name: "Dr. Betül Erdör Türk", org: "TÜBİTAK" },
      { name: "Prof. Dr. Bülent Yeşilata", org: AYBU },
      { name: "Prof. Dr. Canan Acar", org: "University of Twente" },
      { name: "Prof. Dr. Cenk Çelik", org: "Kocaeli Üniversitesi" },
      { name: "Prof. Dr. Cüneyt Uysal", org: "Karabük Üniversitesi" },
      { name: "Dr. Çiğdem Karadağ", org: "TÜBİTAK MAM" },
      { name: "Deniz Demirci", org: "Savunma Sanayii Başkanlığı (SSB)" },
      { name: "Prof. Dr. Ergün Erarslan", org: AYBU },
      { name: "Prof. Dr. Erol Arcaklıoğlu", org: "Yükseköğretim Kurulu (YÖK)" },
      { name: "Doç. Dr. Gerçek Budak", org: AYBU },
      {
        name: "Gürsel Erul",
        org: "Çevre, Şehircilik ve İklim Değişikliği Bakanlığı – Çevre Yönetimi Genel Müdür Yardımcısı",
      },
      { name: "Prof. Dr. Hasan Okuyucu", org: AYBU },
      { name: "Prof. Dr. İnci Eroğlu", org: "Orta Doğu Teknik Üniversitesi" },
      { name: "İsmail Erilhan", org: "Linde Gaz" },
      { name: "Kadir Gökhan Güler", org: "General Electric Aerospace" },
      { name: "Doç. Dr. Kağan Kayacı", org: "Kale Seramik" },
      { name: "Prof. Dr. Kamil Arslan", org: AYBU },
      { name: "Doç. Dr. Muhittin Bilgili", org: "Gazi Üniversitesi" },
      { name: "Prof. Dr. Mustafa İlbaş", org: "ASFAT / Gazi Üniversitesi" },
      { name: "Ongun Yoldemir", org: "Jeoloji Mühendisi" },
      { name: "Ömer Erdemir", org: "LENTATEK A.Ş." },
      { name: "Dr. Paulina Seyfert", org: "Almanya Enerji Bakanlığı" },
      { name: "Prof. Dr. Ramazan Solmaz", org: "Bingöl Üniversitesi" },
      { name: "Prof. Dr. Selmiye Alkan Gürsel", org: "Sabancı Üniversitesi" },
      { name: "Prof. Dr. Serhat Karyeyen", org: "Gazi Üniversitesi" },
      { name: "Serkan Türk", org: "Türkiye Çimento Sanayicileri Birliği" },
      { name: "Doç. Dr. Sıtkı Kocaoğlu", org: AYBU },
      { name: "Dr. Uğur Kayasal", org: "ROKETSAN" },
      { name: "Prof. Dr. Veli Çelik", org: AYBU },
    ],
  },
];
