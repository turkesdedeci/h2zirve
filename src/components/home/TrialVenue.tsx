import Image from "next/image";
import s from "./venue.module.css";

const destination = encodeURIComponent("Ankara Yıldırım Beyazıt Üniversitesi Etlik Milli İrade Yerleşkesi");
const mapUrl = `https://www.google.com/maps?q=${destination}&output=embed&hl=tr`;

const galleryPhotos = [
  { src: "/venue/salon-1.jpg", alt: "AYBÜ Etlik Kongre Salonu'nda düzenlenen bir etkinlikten genel salon görünümü" },
  { src: "/venue/salon-2.jpg", alt: "AYBÜ Etlik Kongre Salonu ana sahnesi ve LED ekranı" },
];

export default function TrialVenue() {
  return <section id="venue" className={s.section}>
    <header className={s.heading}><p>Buluşma noktası</p><h2>Ankara’da buluştuk<span>.</span></h2></header>
    <div className={s.locationCard}>
      <div className={s.info}><div className={s.date}><strong>22–23</strong><span>Ekim 2026</span></div><h3>AYBÜ Etlik <br />Kongre Salonu</h3><p>Ankara, Türkiye</p><a className={s.mail} href="mailto:h2zirvesi@tespam.org">h2zirvesi@tespam.org</a></div>
      <div className={s.map}><iframe src={mapUrl} title="AYBÜ Etlik Kongre Salonu Google Maps konum önizlemesi" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><div className={s.mapFooter}><span>AYBÜ Etlik Kongre Salonu</span><a href={`https://www.google.com/maps/search/?api=1&query=${destination}`} target="_blank" rel="noopener noreferrer">Google Maps’te aç <span aria-hidden="true">↗</span><span className="sr-only"> (yeni sekmede açılır)</span></a></div></div>
    </div>
    <div className={s.gallery}>{galleryPhotos.map((photo) => <div key={photo.src} className={s.galleryItem}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 600px) 100vw, 50vw" /></div>)}</div>
  </section>;
}
