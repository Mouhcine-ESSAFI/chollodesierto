const FEATURES = [
  {
    icon: '🚐',
    title: 'Real Small Group',
    body: '16 explorers, not 50. By Day 2, you\'ll know everyone\'s name.',
  },
  {
    icon: '🏕️',
    title: 'Authentic Berber Camp',
    body: 'Not a tourist resort. A real desert camp, run by the people of Erg Chebbi.',
  },
  {
    icon: '🌟',
    title: 'Local Moroccan Team',
    body: 'Born here. Drove these roads our whole lives. We don\'t read scripts.',
  },
  {
    icon: '💶',
    title: 'Honest Budget Pricing',
    body: 'No hidden fees. No surprise upgrades. Just the real Sahara at a fair price.',
  },
];

export function WhyUs() {
  return (
    <section aria-labelledby="why-heading" className="bg-sand py-[7.5rem]">
      <div className="max-w-[76rem] mx-auto px-10 text-center">

        <h2
          id="why-heading"
          className="font-body font-bold text-[2.375rem] text-dark mb-[5rem]"
        >
          Why do travelers keep choosing us?
        </h2>

        {/* Feature cards grid */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 list-none"
          role="list"
        >
          {FEATURES.map((f) => (
            <li
              key={f.title}
              className="bg-white rounded-[1.5rem] p-10 text-center shadow-[0_0.125rem_1.5rem_rgba(26,31,46,0.07)]
                         hover:shadow-[0_0.75rem_2.5rem_rgba(26,31,46,0.13)] hover:-translate-y-1 transition-all duration-200"
            >
              <span aria-hidden="true" className="text-5xl block mb-5">{f.icon}</span>
              <h3 className="font-body font-bold text-[1.25rem] text-dark mb-3">{f.title}</h3>
              <p className="text-[1rem] text-dark/55 leading-relaxed">{f.body}</p>
            </li>
          ))}
        </ul>

        {/* Inline testimonial */}
        <figure className="bg-white rounded-[1.5rem] px-10 py-8 max-w-2xl mx-auto shadow-[0_0.125rem_1.5rem_rgba(26,31,46,0.07)]">
          <p aria-hidden="true" className="text-primary text-xl mb-3">★★★★★</p>
          <blockquote className="font-bold text-[1rem] text-dark italic leading-relaxed mb-3">
            "I was nervous about booking the 'cheap' option. Turns out it's not cheap, it's just fair.
            Best decision of my whole trip."
          </blockquote>
          <figcaption className="text-[0.875rem] text-dark/50 font-normal">
            Lukas · March 2026
          </figcaption>
        </figure>

      </div>
    </section>
  );
}
