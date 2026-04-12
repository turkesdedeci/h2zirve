const stats = [
  { value: "2", label: "Tam Gün", desc: "15–16 Ekim 2026" },
  { value: "5+", label: "Panel", desc: "Strateji, Teknoloji & Endüstri" },
  { value: "2", label: "Keynote", desc: "Uluslararası Konuşmacı" },
  { value: "Q1", label: "Yayın İmkânı", desc: "Seçilen çalışmalar için" },
];

export default function Stats() {
  return (
    <section className="bg-gradient-to-r from-[#0055bb] via-[#0066CC] to-[#0044aa] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label, desc }) => (
            <div key={label}>
              <div className="text-4xl sm:text-5xl font-extrabold text-white">
                {value}
              </div>
              <div className="text-blue-200 font-semibold text-lg mt-1">
                {label}
              </div>
              <div className="text-blue-300/60 text-sm mt-0.5">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
