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
