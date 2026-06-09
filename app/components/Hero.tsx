export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full min-h-screen overflow-hidden bg-dark"
    >
      {/* Warm sun / dusk glow */}
      <div aria-hidden="true" className="hero-glow absolute inset-0 z-1 pointer-events-none" />

      {/* Layered dune silhouettes */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-2 pointer-events-none">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
        >
          <path
            d="M0,160 C120,128 300,182 500,148 C700,114 880,168 1080,132 C1240,104 1360,138 1440,122 L1440,320 L0,320 Z"
            fill="rgba(35,24,14,0.72)"
          />
          <path
            d="M0,212 C100,188 270,228 480,204 C690,180 900,218 1110,198 C1270,182 1390,208 1440,200 L1440,320 L0,320 Z"
            fill="rgba(22,16,10,0.88)"
          />
          <path
            d="M0,268 C150,248 360,278 620,260 C880,242 1120,272 1320,258 C1390,252 1425,260 1440,258 L1440,320 L0,320 Z"
            fill="#0d0a06"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start text-center pt-40 px-5 pb-52">
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
