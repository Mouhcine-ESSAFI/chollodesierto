import {CAMP_TIERS, type CampTier} from '~/lib/mock-tours';

function TierCard({tier}: {tier: CampTier}) {
  return (
    <article
      aria-label={`${tier.name} — ${tier.badge}`}
      className="bg-white rounded-[1.5rem] overflow-hidden shadow-[0_0.125rem_1.5rem_rgba(26,31,46,0.07)]
                 hover:shadow-[0_0.75rem_2.5rem_rgba(26,31,46,0.13)] hover:-translate-y-1 transition-all duration-200 flex flex-col"
    >
      <img
        src={tier.imageUrl}
        alt={tier.imageAlt}
        className="w-full h-52 object-cover"
        loading="lazy"
        width="389"
        height="208"
      />
      <div className="p-7 flex flex-col flex-1">
        <span
          className={[
            'inline-block text-[0.6875rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 self-start',
            tier.badgeStyle === 'included'
              ? 'bg-forest/10 text-forest'
              : 'bg-primary/10 text-primary',
          ].join(' ')}
        >
          {tier.badge}
        </span>
        <h3 className="font-display text-[1.375rem] text-dark mb-1">{tier.name}</h3>
        <p className="text-[0.8125rem] text-dark/45 italic mb-5">{tier.tagline}</p>
        <ul className="flex flex-col gap-2 mb-5 list-none flex-1" role="list">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[0.875rem] text-dark/60">
              <span className="text-forest font-bold shrink-0 mt-0.5">✓</span>
              {f}
            </li>
          ))}
        </ul>
        <p className="text-[0.8125rem] text-dark/40 italic">{tier.bestFor}</p>
      </div>
    </article>
  );
}

export function CampTiers() {
  return (
    <section aria-labelledby="camps-heading" id="camps" className="bg-sand py-[7.5rem]">
      <div className="max-w-[76rem] mx-auto px-10 text-center">

        <p className="font-bold text-[0.875rem] uppercase tracking-widest text-primary mb-3">
          A Bed Under the Stars
        </p>
        <h2
          id="camps-heading"
          className="font-body font-bold text-[2.375rem] text-dark mb-3"
        >
          Where You'll Sleep
        </h2>
        <p className="text-[1rem] text-dark/55 mb-[5rem]">
          Every traveler sees the same stars. How comfortable you are getting there is up to you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {CAMP_TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        <figure className="bg-white rounded-[1.5rem] px-10 py-8 max-w-xl mx-auto shadow-[0_0.125rem_1.5rem_rgba(26,31,46,0.07)] mb-10">
          <p aria-hidden="true" className="text-primary text-xl mb-3">★★★★★</p>
          <blockquote className="font-bold text-[1rem] text-dark italic leading-relaxed mb-3">
            "Upgraded to Superior for our anniversary. Worth every euro. The hot shower in the
            desert felt illegal."
          </blockquote>
          <figcaption className="text-[0.875rem] text-dark/50 font-normal">
            Maria &amp; Tom · February 2025
          </figcaption>
        </figure>

        <a
          href="#book"
          className="font-display text-[1.125rem] bg-primary text-sand px-10 py-4 rounded-full
                     hover:opacity-90 transition-opacity inline-block"
        >
          Book Now
        </a>
      </div>
    </section>
  );
}
