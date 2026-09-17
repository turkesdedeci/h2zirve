/**
 * Portreler 3:4 kadraja oturtulurken kartin 2x render hedefi olan 384 px'e
 * tamamlaniyor, bu yuzden kartin "kendi cozunurlugunun uzerine buyutme"
 * istisnasina giren portre kalmadi.
 *
 * Asagidaki isimlerin kaynagi hala zayif; hedefe buyutuldukleri icin kart
 * bosluksuz doluyor ama detay kazanmis degiller. Bu kisilerden >=1000 px
 * vesikalik istenmeli:
 *   Selahattin Celik, Mustafa Ilbas, Cigdem Karadag, Erol Arcaklioglu,
 *   Deniz Demirci, Selmiye Alkan Gursel, Ali Cengiz Koseoglu, Ugur Kayasal,
 *   Ismail Erilhan, Omer Faruk Tuncbilek
 * Bkz. docs/homepage-design-trial.md — yayin oncesi gorevler.
 */
export const LOW_RES_PORTRAITS: Record<string, number> = {};

/**
 * Portreler goz hizasi ve yuz olcegi esitlenerek kirpildigi icin kart
 * tarafinda odak noktasi ayarina gerek kalmadi.
 */
export const PORTRAIT_FOCUS: Record<string, string> = {};
