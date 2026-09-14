# Ana sayfa yerleşim denemesi

- Mevcut ana sayfa: `/`
- Deneme: `/tasarim-deneme`
- Tam konuşmacı listesi: `/tasarim-deneme/konusmacilar`
- Deneme yolları `noindex, nofollow` metadata kullanır. Ana sayfa veya menüsüne deneme bağlantısı eklenmedi.

## Kapsam

Deneme UI dosyaları `src/app/tasarim-deneme/` altında. Mevcut konuşmacı listesi `Speakers.tsx` üzerinden named export ile okunur; veri ve normal render değişmez. `Sponsors.tsx` için `compact` prop eklendi; varsayılan `false` mevcut ana sayfanın davranışını korur. Deneme sponsorluk avantaj listelerini gizler. Program özeti ve iletişim bölümü mevcut bileşenlerden gelir.

Başvuru bağlantıları mevcut gerçek formlara gider. Bu bir form gönderim simülasyonu değildir. Kontrol sırasında gerçek başvuru gönderilmedi.

## Geri alma

Mevcut ana sayfaya dönmek için `/` adresini açmak yeterli. Tasarım denemesini kaldırmak istenirse yalnızca `src/app/tasarim-deneme/`, `public/aybu-etlik-preview.jpg` ve bu not kaldırılır; `Speakers.tsx` named export ve `Sponsors.tsx` optional compact prop eklemeleri geri alınabilir. Önceki sponsor/iletişim, komite, navbar, footer değişikliklerini koruyun. Dosya bazında geniş bir git restore/reset kullanmayın.

## Görsel kaynağı ve yayın öncesi teyit

Son tasarım düzeltmesinde büyük tarih kartı ve salon fotoğrafı ilk ekrandan kaldırıldı. Aşağıdaki görsel dosyası geri dönüş için korunuyor; güncel deneme sayfasında kullanılmıyor.

`public/aybu-etlik-preview.jpg`, AYBÜ Kültür Hizmetleri Şube Müdürlüğünün Etlik Milli İrade Yerleşkesi konferans salonu sayfasından alınmıştır:

https://aybu.edu.tr/kultur/tr/sayfa/10348/Etlik-Milli-%C4%B0rade-Yerle%C5%9Fkesi-Konferans-Salonu

Dosya: `https://aybu.edu.tr/GetFile?id=Upload%5C3816db8f-4475-48cc-bf11-4c29feab8c16.jpg`

Fotoğraf, kurumun salonunu göstermektedir; bunun zirveye tahsis edilen kesin salon olduğu ayrıca teyit edilmedi. Kapasite, açık adres, toplu taşıma yönlendirmesi eklenmedi; harita bağlantısı mevcut "AYBÜ Etlik Kongre Salonu" bilgisiyle arama açar. Yayına alınmadan önce salon ve görsel kullanım uygunluğu teyit edilmeli.

Poster tarihi (15 Eylül 2026) ve şartları mevcut içerikten alınmıştır. Ana sayfanın yeni sürümü yayımlanırken güncel başvuru durumu kontrol edilmelidir. Seçili sekiz konuşmacı yerel mevcut listeden gelir; bu çalışma yeni bir katılım teyidi değildir.

## Yayın öncesi bloklayıcı kontroller

- [ ] **Salon fotoğrafı.** `public/aybu-etlik-preview.jpg` şu an hiçbir yerde kullanılmıyor. Hero'ya tam genişlik konulması düşünülürse önce (a) zirveye tahsis edilen salonun bu salon olduğu ve (b) görselin kullanım izni AYBÜ'den teyit edilmeli. Tam genişlik kullanım, kesildiği küçük kutucuktan çok daha büyük bir maruziyet. Teyit gelene kadar hero `/hero-visual.png` kullanır.
- [ ] **Dokuz düşük çözünürlüklü portre.** Aşağıdaki isimlerden ≥1000 px vesikalık istenmeli. Kart bunları kendi bulanık kopyalarının içinde, native genişliğinin üzerine hiç büyütmeden gösteriyor; bu bir idare etme çözümü, kalıcı düzeltme değil. Liste `src/app/tasarim-deneme/lowResPortraits.ts` içinde, dosya geldikçe satır silinir.

  | İsim | Mevcut çözünürlük |
  |---|---|
  | Prof. Dr. Yüksel Kaplan | 135×167 |
  | Dr. Çiğdem Karadağ | 150×200 |
  | Deniz Demirci | 200×200 |
  | Prof. Dr. Erol Arcaklıoğlu | 211×199 |
  | Prof. Dr. Selahattin Çelik | 227×227 |
  | Prof. Dr. Hasan Özcan | 295×295 |
  | Prof. Dr. Abdullah Yıldız | 339×339 |
  | Prof. Dr. Ali Cengiz Köseoğlu | 344×332 |
  | Serkan Türk | 361×361 |

- [ ] **Hero görseli çözünürlük tavanı.** `hero-visual.png` 1543×842. Tam genişlik kullanımda 2560 px ekranda ~1,66× esner ve yumuşak görünür; scrim'ler karenin büyük kısmını örttüğü için idare eder. Tam genişlik hero yönü benimsenecekse ≥2400 px genişliğinde tek bir görsel temin etmek bu listedeki en yüksek getirili iş.
- [ ] **`h2team.png` ve `tespam.png` logo bandında.** İkisi de ince metin içeren büyük PNG'ler (2,9 MB / 2,3 MB); 120 px'lik slotta okunaksız hale gelebilir. Gözle kontrol edilmeli; sorun varsa çözüm CSS değil, düzgün küçük logo dosyası.

## Veri konumu

Konuşmacı ve program verisi `src/components/*.tsx` içinden `src/data/speakers.ts` ve `src/data/program.ts` dosyalarına taşındı. `Speakers.tsx` `speakers`'ı yeniden dışa aktarır, dolayısıyla mevcut import yolları çalışmaya devam eder. Deneme sayfası, ana sayfa ve `/program` aynı kaynağı okur; program değişince üçü birden güncellenir.

## Deneme sayfasının yapısı

`src/app/tasarim-deneme/` altında: `TrialHero`, `TrialStats`, `TrialProgram`, `TrialLogoBand`, `TrialFooter`, `TrialSpeakerDirectory`, `SpeakerCard`, `SpeakerMarquee` ve tek hareket primitifi `useAutoScroll`.

Konuşmacı şeridi ve logo bandı aynı hook'u kullanır. CSS `@keyframes` marquee bilerek kullanılmadı: `globals.css:86-95` içindeki `animation-duration: .01ms !important` kuralı reduced-motion'da animasyonu durdurmuyor, anında bitiriyor ve track yarı kaymış halde donuyor.

Logo bandında otomatik kayma `logos.length >= 12` koşuluna bağlı. Bugün 7 sponsor var, dolayısıyla bant statik: 7 öğeli sonsuz döngü birkaç saniyede bir görünür şekilde tekrar eder ve dolgu gibi okunur. Sponsor sayısı eşiği geçince kendiliğinden devreye girer.

İstatistik bandındaki dört rakam program ve konuşmacı verisinden türetilir. Katılımcı, ülke veya kurum sayısı gibi kaynağı olmayan rakamlar bilerek konulmadı.

## Hâlâ eski tasarım dilinde

`<Sponsors compact />` ve `<Contact />` deneme sayfasında hâlâ ana sayfanın Tailwind `h2-*` diliyle render ediliyor. İkisi de gerçek içerik ve `/api/contact`'a giden form taşıyor; dönüştürmek ayrı bir iş. Sayfayı aşağı kaydırınca bu noktada bir dil değişimi görülür — eksiklik değil, çizilmiş sınır.
