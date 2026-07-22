// Props mirror the Shopify Page metafields that will drive this hero.
// When connected: loader fetches page.metafield("hero_*") and passes them down.
export interface BookingHeroProps {
  headline?: string;
  subtext?: string;
  image?: string;
  imageAlt?: string;
}

export function BookingHero({
  headline = 'Book your adventure.',
  subtext = "Five quick choices, and you're going. We'll handle the rest.",
  image = 'https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=1800&q=80',
  imageAlt = 'Golden Sahara sand dunes at sunset',
}: BookingHeroProps) {
  return (
    <section aria-label="Book your adventure" className="relative overflow-hidden">
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-transparent from-60% to-sand"
      />
      <div className="relative z-20 flex min-h-150 flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-hero max-w-180 text-white">
          {headline}
        </h1>
        <p className="mt-8 text-lg text-white md:text-h3 max-w-90">
          {subtext}
        </p>
      </div>
    </section>
  );
}

export default BookingHero;
