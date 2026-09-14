/**
 * En kısa kenarı 384 px'in (kartın 2x render hedefi) altında kalan portreler.
 * Değer, dosyanın gerçek piksel genişliği: kart bu genişliğin üzerine
 * hiçbir zaman büyütmez, portreyi kendi bulanık kopyasının içinde ortalar.
 *
 * Kalıcı çözüm CSS değil: bu dokuz kişiden >=1000 px vesikalık istenmeli.
 * Bkz. docs/homepage-design-trial.md — yayın öncesi görevler.
 */
export const LOW_RES_PORTRAITS: Record<string, number> = {
  "/speakers/yuksel-kaplan.jpg": 135,
  "/speakers/cigdem-karadag.jpg": 150,
  "/speakers/deniz-demirci.jpg": 200,
  "/speakers/erol-arcaklioglu.png": 211,
  "/speakers/selahattin-celik.jpg": 227,
  "/speakers/hasan-ozcan.jpg": 295,
  "/speakers/abdullah-yildiz.jpg": 339,
  "/speakers/ali-cengiz-koseoglu.png": 344,
  "/speakers/serkan-turk-linkedin.jpg": 361,
};

/** Yatay kaynaklar için denemeye özel kırpım noktası (paylaşılan veriye dokunmaz). */
export const PORTRAIT_FOCUS: Record<string, string> = {
  // 1280x854, tek yatay kaynak — 3:4 kutuda yüzü ortada tutar.
  "/speakers/canan-acar.jpg": "38% 32%",
};
