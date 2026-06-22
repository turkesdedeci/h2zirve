const stats = [
  { value: "2", label: "Tam Gün", desc: "22–23 Ekim 2026" },
  { value: "5+", label: "Panel", desc: "Strateji, Teknoloji & Endüstri" },
  { value: "2", label: "Keynote", desc: "Uluslararası Konuşmacı" },
  { value: "Q1", label: "Yayın İmkânı", desc: "Seçilen çalışmalar için" },
];

export default function Stats() {
  return (
    <section className="bg-h2-blue py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map(({ value, label, desc }) => (
            <div key={label}>
              <div className="font-display text-4xl font-bold text-white sm:text-5xl">
                {value}
              </div>
              <div className="mt-1 text-h2-body-lg font-semibold text-white/85">
                {label}
              </div>
              <div className="mt-0.5 text-h2-small text-white/55">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
