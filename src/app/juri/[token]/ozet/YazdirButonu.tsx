"use client";

export default function YazdirButonu() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white print:hidden"
    >
      Yazdır / PDF olarak kaydet
    </button>
  );
}
