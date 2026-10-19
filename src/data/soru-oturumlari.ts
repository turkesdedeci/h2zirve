import { day1, day2 } from "@/data/program";

export interface SoruOturumu {
  slug: string;
  baslik: string;
  gun: string;
  saat: string;
}

/** Karekodla soru alınan oturumlar. slug: /soru/<slug> adresinde kullanılır. */
export const soruOturumlari: SoruOturumu[] = [
  { slug: "keynote-dincer", baslik: "Keynote: Prof. Dr. İbrahim Dinçer", gun: "22 Ekim", saat: "11:15" },
  { slug: "keynote-veziroglu", baslik: "Keynote: Dr. Ayfer Veziroğlu", gun: "22 Ekim", saat: "13:30" },
  { slug: "panel-1", baslik: "Panel 1: Türkiye Hidrojen Yol Haritası 2035", gun: "22 Ekim", saat: "14:30" },
  { slug: "panel-2", baslik: "Panel 2: Savunma Sanayinde Hidrojen Teknolojileri", gun: "22 Ekim", saat: "16:15" },
  { slug: "panel-3", baslik: "Panel 3: Yeşil Hidrojen Üretimi ve Endüstriyel Uygulamalar", gun: "23 Ekim", saat: "10:30" },
  { slug: "panel-4", baslik: "Panel 4: Sanayide Hidrojen Kullanımı", gun: "23 Ekim", saat: "14:00" },
  { slug: "panel-5", baslik: "Panel 5: Hidrojen Ekonomisi, Ar-Ge ve Ticarileşme", gun: "23 Ekim", saat: "15:30" },
];

export function soruOturumu(slug: string) {
  return soruOturumlari.find((o) => o.slug === slug);
}

/** Panel oturumlarında sorunun yöneltilebileceği konuşmacılar (program.ts'ten; keynote'ta boş). */
export function oturumKonusmacilari(slug: string): string[] {
  const o = soruOturumu(slug);
  if (!o) return [];
  const oturum = [...day1, ...day2].find((s) => s.type === "panel" && s.title === o.baslik);
  return (oturum?.speakers ?? []).map((s) => s.split(" | ")[0].trim());
}
