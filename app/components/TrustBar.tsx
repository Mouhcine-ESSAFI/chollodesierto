const GUARANTEES = [
  {
    icon: '✓',
    iconBg: 'bg-primary/10 text-primary',
    title: 'Free Cancellation',
    sub: 'Enjoy 48h advance cancellation flexibility',
  },
  {
    icon: '★',
    iconBg: 'bg-yellow-500/10 text-yellow-600',
    title: 'Book your spot with 20%',
    sub: 'Pay the rest on the day of the excursion',
  },
  {
    icon: '♥',
    iconBg: 'bg-forest/10 text-forest',
    title: 'No hidden fees',
    sub: 'Clear pricing, no surprise surcharges',
  },
];

export function TrustBar() {
  return (
    <section aria-label="Booking guarantees" className="bg-white border-b border-dark/5">
      <div className="max-w-[76rem] mx-auto px-10 py-10 flex flex-wrap justify-center gap-16">
        {GUARANTEES.map((g) => (
          <div key={g.title} className="flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 ${g.iconBg}`}
            >
              {g.icon}
            </span>
            <div>
              <p className="font-bold text-[0.9375rem] text-dark leading-tight">{g.title}</p>
              <p className="text-[0.8125rem] text-dark/50 mt-0.5">{g.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
