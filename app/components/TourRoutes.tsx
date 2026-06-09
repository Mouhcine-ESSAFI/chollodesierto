import {TOUR_ROUTES, type TourRoute} from '~/lib/mock-tours';

function RouteCard({route}: {route: TourRoute}) {
  const isFeatured = route.featured;

  return (
    <article
      aria-label={`${route.title} tour route`}
      className={[
        'bg-white rounded-[1.5rem] overflow-hidden flex flex-col',
        isFeatured
          ? 'shadow-[0_0.5rem_2.5rem_rgba(196,90,44,0.18)] -translate-y-2'
          : 'shadow-[0_0.125rem_1.5rem_rgba(26,31,46,0.07)] hover:shadow-[0_0.75rem_2.5rem_rgba(26,31,46,0.13)] hover:-translate-y-1 transition-all duration-200',
      ].join(' ')}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={route.imageUrl}
          alt={route.imageAlt}
          className="w-full h-56 object-cover block"
          loading="lazy"
          width="389"
          height="224"
        />
        <span
          className={[
            'absolute top-4 left-1/2 -translate-x-1/2 text-sand text-[0.6875rem] font-bold px-4 py-1.5 rounded-full whitespace-nowrap',
            isFeatured
              ? 'bg-primary/90 backdrop-blur-sm'
              : 'bg-dark/70 backdrop-blur-sm',
          ].join(' ')}
        >
          {route.badge}
        </span>
        <div className="bg-dark/75 px-5 py-2.5 flex gap-5 items-center">
          <span className="text-[0.75rem] text-sand/80 flex items-center gap-1.5">
            ⏱ {route.days} Days
          </span>
          <span className="text-[0.75rem] text-sand/80 flex items-center gap-1.5">
            ✓ Free Cancellation
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-7 flex flex-col flex-1">
        {/* Route stops */}
        <div
          className="flex items-center justify-center gap-1 mb-4"
          aria-label={`Route: ${route.stops.join(' to ')}`}
        >
          <span className="text-[0.75rem] font-bold text-primary">{route.stops[0]}</span>
          <span aria-hidden="true" className="w-2 h-2 rounded-full bg-primary shrink-0" />
          <span aria-hidden="true" className="flex-1 border-t-2 border-dashed border-primary/30" />
          <span className="text-[0.75rem] font-bold text-primary">{route.stops[1]}</span>
          <span aria-hidden="true" className="flex-1 border-t-2 border-dashed border-primary/30" />
          <span aria-hidden="true" className="w-2 h-2 rounded-full bg-primary shrink-0" />
          <span className="text-[0.75rem] font-bold text-primary">{route.stops[2]}</span>
        </div>

        <h3 className="font-display text-[1.375rem] text-dark mb-2 text-center">
          {route.title}
        </h3>
        <p className="text-[1rem] text-dark/55 text-center mb-6 flex-1">{route.description}</p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[0.625rem] font-bold uppercase tracking-wider text-forest">
              Per Person
            </p>
            <p className="font-display text-[1.5rem] text-forest">€{route.price}</p>
          </div>
          <a
            href="#book"
            className="font-display text-[1rem] bg-primary text-sand px-5 py-3 rounded-full
                       hover:opacity-90 transition-opacity"
          >
            Choose this route →
          </a>
        </div>
      </div>
    </article>
  );
}

export function TourRoutes() {
  return (
    <section aria-labelledby="routes-heading" id="routes" className="bg-sand py-[7.5rem]">
      <div className="max-w-[76rem] mx-auto px-10 text-center">

        <p className="font-bold text-[0.875rem] uppercase tracking-widest text-primary mb-3">
          Choose Your Route
        </p>
        <h2 className="font-body font-bold text-[2.375rem] text-dark mb-3" id="routes-heading">
          Pick your path through Morocco
        </h2>
        <p className="text-[1rem] text-dark/55 mb-[5rem]">
          Three routes, one unforgettable desert. Choose the one that fits your trip.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOUR_ROUTES.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>

      </div>
    </section>
  );
}
