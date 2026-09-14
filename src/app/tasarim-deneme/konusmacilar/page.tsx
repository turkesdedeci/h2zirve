import Speakers from "@/components/Speakers";
import PreviewHeader from "../PreviewHeader";

export default function TrialSpeakers() {
  return (
    <>
      <PreviewHeader />
      <main id="main-content">
        <div className="mx-auto max-w-7xl px-6 pt-8">
          <a href="/tasarim-deneme#speakers" className="text-sm text-h2-cyan underline underline-offset-4">← Deneme ana sayfasına dön</a>
          <h1 className="mt-8 text-3xl font-semibold">Zirve konuşmacıları</h1>
        </div>
        <Speakers />
      </main>
    </>
  );
}
