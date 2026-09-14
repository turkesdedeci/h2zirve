import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Komite",
  description:
    "Türkiye Hidrojen Zirvesi 2026 onursal başkanları, genel başkanları, kongre başkanları, organizasyon sekreterliği ve bilim kurulu.",
};

type Member = { name: string; detail?: string };

const leadershipGroups: { title: string; titleEn: string; members: Member[] }[] = [
  {
    title: "Onursal Başkanlar", titleEn: "Honorary Chairs",
    members: [
      { name: "Prof. Dr. Turhan Nejat Veziroğlu", detail: "Kurucu, Uluslararası Hidrojen Enerjisi Derneği (IAHE) / International Journal of Hydrogen Energy (IJHE)" },
      { name: "Prof. Dr. Hasan Uslu", detail: "Rektör, Niğde Ömer Halisdemir Üniversitesi" },
    ],
  },
  {
    title: "Genel Başkanlar", titleEn: "General Chairs",
    members: [
      { name: "Oğuzhan Akyener", detail: "TESPAM Başkanı" },
      { name: "Prof. Dr. Mustafa İlbaş", detail: "ASFAT Başkanı" },
    ],
  },
  {
    title: "Kongre Başkanları", titleEn: "Congress Chairs",
    members: [
      { name: "Prof. Dr. Yüksel Kaplan", detail: "Kurucu, Prof. Dr. T. Nejat Veziroğlu Temiz Enerji Araştırma Merkezi / Niğde Ömer Halisdemir Üniversitesi" },
      { name: "Prof. Dr. Levent Kenar", detail: "TESPAM Başkan Yardımcısı" },
      { name: "Ali Murat Beceirkli", detail: "TESPAM Başkan Yardımcısı" },
    ],
  },
  {
    title: "Organizasyon Sekreterliği", titleEn: "Organization Secretariat",
    members: [
      { name: "Süleyman Türkeş Dedeci" },
      { name: "Fatma Cengiz", detail: "TESPAM Uluslararası Koordinatörü" },
      { name: "Furkan Güven", detail: "TESPAM Kooperatif İletişimi" },
      { name: "Sezer Önbilgin", detail: "Niğde Ömer Halisdemir Üniversitesi" },
      { name: "Nebi Yelegen", detail: "Niğde Ömer Halisdemir Üniversitesi" },
      { name: "Enis Selçuk Altuntop", detail: "Niğde Ömer Halisdemir Üniversitesi" },
      { name: "Tolga Altan", detail: "Niğde Ömer Halisdemir Üniversitesi" },
      { name: "Emre Uçar", detail: "Niğde Ömer Halisdemir Üniversitesi" },
      { name: "Berre Kümük", detail: "İskenderun Teknik Üniversitesi" },
    ],
  },
];

const scientificCommittee = [
  "Prof. Dr. Uğur Çevik", "Prof. Dr. Levent Kenar", "Prof. Dr. Hacı Mehmet Şahin", "Prof. Dr. Adem Acır", "Prof. Dr. Alaaddin Yüksel", "Prof. Dr. Salih Yazıcı", "Prof. Dr. Tolga Depci", "Prof. Dr. Serdar Altın", "Prof. Dr. Bayram Şahin", "Prof. Dr. Yüksel Palacı", "Prof. Dr. Ali Ata", "Prof. Dr. Recep Çalın", "Prof. Dr. İlker Yılmaz", "Prof. Dr. Muhammet Kayfeci", "Prof. Dr. Ayşe Bayrakçeken", "Prof. Dr. Selahattin Çelik", "Prof. Dr. Hasan Özcan", "Prof. Dr. Halil İbrahim Acar", "Prof. Dr. Ertan Buyruk", "Prof. Dr. Didem Balun Kayan", "Prof. Dr. Talat Baran", "Prof. Dr. Necmettin Şahin", "Prof. Dr. Tolga Taner", "Prof. Dr. Necdet Altuntop", "Prof. Dr. Veysel Özceyhan", "Prof. Dr. Bora Timurkutluk", "Prof. Dr. Serkan Toros", "Prof. Dr. Mustafa Bayrak", "Prof. Dr. Yahya Erkan Akansu", "Doç. Dr. Abdullah Altun", "Doç. Dr. Selçuk Özgen", "Doç. Dr. Mahmut Caner Acar", "Doç. Dr. Fuat Kaya", "Doç. Dr. Ömer Genç", "Doç. Dr. Abdulkadir Bektaş", "Doç. Dr. Doğan Erdemir", "Doç. Dr. Gamze Karanfil", "Doç. Dr. Murat Taştan", "Doç. Dr. Buğrahan Alabaş", "Dr. Öğr. Üyesi Ayşegül Yücel", "Dr. Öğr. Üyesi Mesut Karta", "Dr. Öğr. Üyesi Osman Kümük", "Dr. Ahmet Yaylı", "Michelangelo Celozzi",
];

export default function CommitteePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="overflow-hidden bg-h2-bg pt-20">
        <section className="relative border-b border-h2-border px-4 py-20 sm:px-6 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(45,212,191,0.12),transparent_28rem)]" />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-h2-micro font-semibold uppercase tracking-[0.22em] text-h2-cyan">Türkiye Hidrojen Zirvesi 2026</p>
            <div className="mt-5 max-w-3xl">
              <h1 className="font-display text-h2-h1 font-semibold tracking-tight text-h2-ink-1">Komite</h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-h2-ink-3 sm:text-lg">Zirvenin bilimsel kapsamını ve organizasyon sürecini yönlendiren değerli kurul üyelerimiz.</p>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-7xl space-y-16 lg:space-y-24">
            {leadershipGroups.map((group, groupIndex) => (
              <section key={group.title} aria-labelledby={`group-${groupIndex}`} className="grid gap-8 lg:grid-cols-[minmax(13rem,0.7fr)_minmax(0,2fr)] lg:gap-16">
                <div>
                  <p className="text-h2-micro font-semibold uppercase tracking-[0.18em] text-h2-cyan">0{groupIndex + 1}</p>
                  <h2 id={`group-${groupIndex}`} className="mt-3 font-display text-h2-h2 font-semibold text-h2-ink-1">{group.title}</h2>
                  <p className="mt-2 text-h2-small text-h2-ink-disabled">{group.titleEn}</p>
                </div>
                <div className="grid gap-px overflow-hidden rounded-h2-md border border-h2-border bg-h2-border sm:grid-cols-2">
                  {group.members.map((member) => (
                    <article key={member.name} className="bg-h2-bg p-6 sm:p-7">
                      <h3 className="font-display text-xl font-semibold leading-snug text-h2-ink-1">{member.name}</h3>
                      {member.detail && <p className="mt-3 text-h2-small leading-relaxed text-h2-ink-3">{member.detail}</p>}
                    </article>
                  ))}
                </div>
              </section>
            ))}

            <section aria-labelledby="scientific-committee" className="border-t border-h2-border pt-16 lg:pt-24">
              <div className="max-w-2xl">
                <p className="text-h2-micro font-semibold uppercase tracking-[0.22em] text-h2-cyan">05</p>
                <h2 id="scientific-committee" className="mt-3 font-display text-h2-h1 font-semibold tracking-tight text-h2-ink-1">Bilim Kurulu</h2>
                <p className="mt-3 text-h2-small text-h2-ink-disabled">Scientific Committee</p>
              </div>
              <ul className="mt-10 grid border-y border-h2-border sm:grid-cols-2 lg:grid-cols-3">
                {scientificCommittee.map((member, index) => (
                  <li key={member} className="flex items-center gap-4 border-b border-h2-border px-1 py-4 last:border-b-0 sm:px-5 lg:[&:nth-last-child(-n+3)]:border-b-0">
                    <span className="w-7 text-h2-micro font-semibold tabular-nums text-h2-cyan">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-medium leading-snug text-h2-ink-2">{member}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
