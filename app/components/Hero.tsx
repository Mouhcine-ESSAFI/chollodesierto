import dunesSvg from '~/assets/dunes.svg?url';
import sunSvg from '~/assets/sun.svg?url';
import sunlightSvg from '~/assets/sunlight.svg?url';

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-bg relative w-full min-h-[80vh] overflow-hidden flex items-center"
    >
      {/* Layer 4 — Sunlight */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-4 pointer-events-none h-full flex items-end">
        <img src={sunlightSvg} alt="" className="w-full h-auto max-h-212" />
      </div>

      {/* Layer 3 — Warm bottom gradient */}
      <div aria-hidden="true" className="hero-gradient absolute inset-x-0 bottom-0 z-6 pointer-events-none h-full" />

      {/* Layer 2 — Sun */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-8 pointer-events-none h-full flex items-end">
        <img src={sunSvg} alt="" className="w-full h-auto max-h-212" />
      </div>

      {/* Layer 1 — Dunes (frontmost) */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-10 pointer-events-none">
        <img src={dunesSvg} alt="" className="w-full h-72.5 object-cover object-bottom" />
      </div>

      {/* Content — above all layers */}
      <div className="relative z-20 w-full flex flex-col items-center text-center py-28 px-4">
        <h1
          id="hero-heading"
          className="font-display text-h1 text-sand leading-[1.12] mb-6 max-w-185"
        >
          The Epic 3-Day Desert Tour.<br />A Story That Won't Let You Go.
        </h1>

        <p className="font-body text-base text-sand/80 leading-relaxed mb-1">
          Marrakech to the Sahara and back.
        </p>
        <p className="font-body text-base text-sand/80 leading-relaxed mb-8">
          Small group, real Berber camp, fair price.{' '}
          <span className="price-underline font-display text-sand ml-1">€85</span>. And the Sahara becomes yours.
        </p>

        <div className="flex flex-wrap gap-3.5 justify-center mb-6">
          <a
            href="#book"
            className="font-display text-btn bg-primary text-sand px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Book Your Adventure →
          </a>
          <a
            href="#journey"
            className="font-display text-btn bg-white/10 text-sand px-8 py-3.5 rounded-full border border-sand/30 backdrop-blur-sm hover:bg-white/15 transition-colors"
          >
            Watch the Journey ↓
          </a>
        </div>

        <p className="flex items-center gap-2 font-body text-author text-sand/60">
          <span aria-hidden="true" className="text-primary">★</span>
          <span>4.9 · Trusted by 3k+ people.</span>
        </p>
      </div>
    </section>
  );
}
