interface SupportImage {
  src: string;
  alt: string;
}

export interface AboutBookingSupportsProps {
  /** Small eyebrow label above the headline. */
  eyebrow?: string;
  /** Section headline (serif display). Use \n for the line break. */
  title?: string;
  /** Tall portrait image on the left. */
  image?: SupportImage;
  /** Closing statement lines, rendered centered. */
  statement?: string[];
}

const DEFAULT_IMAGE: SupportImage = {
  src: '	https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=600&q=80',
  alt: 'Berber vendor in a kasbah alley',
};

const DEFAULT_STATEMENT = [
  'We\u2019re not getting rich on this.',
  'We\u2019re getting to share where we\u2019re from.',
  'That\u2019s the point.',
];

export function AboutBookingSupports({
  eyebrow = 'Who Your Booking Supports',
  title = 'Every booking supports\ntwo families.',
  image = DEFAULT_IMAGE,
  statement = DEFAULT_STATEMENT,
}: AboutBookingSupportsProps) {
  return (
    <section
      aria-label="Who your booking supports"
      className="relative overflow-hidden bg-gradient-to-b from-white to-sand py-section font-body"
    >
      <div className="container mx-auto max-w-content px-8">
        <div className="grid grid-cols-1 items-stretch gap-16 md:grid-cols-2">
          {/* Tall portrait image — tracks the copy column height on desktop */}
          <figure className="aspect-[5/7] overflow-hidden rounded-card shadow-card-hover md:aspect-auto md:h-full md:min-h-[34rem]">
            <img src={image.src} alt={image.alt} className="h-full w-full object-cover" loading="lazy" />
          </figure>

          {/* Copy */}
          <div>
            <div className="mb-9 text-center">
              <div className="mb-[0.9rem] inline-flex flex-col items-center gap-1.5">
                <span className="text-label font-bold uppercase tracking-[0.22em] text-primary">
                  {eyebrow}
                </span>
                <Squiggle />
              </div>
              <h2 className="whitespace-pre-line font-display text-h2 leading-tight text-dark">
                {title}
              </h2>
            </div>

            <div className="flex flex-col gap-[1.1rem] text-base leading-relaxed text-dark/80">
              <p className="font-semibold text-dark">
                When you book with us, your money does two things:
              </p>
              <p>
                <strong className="text-dark">First</strong>, it supports the Berber families we
                partner with in the dunes. The cooks who make your tagine. The musicians who drum by
                the fire. The hosts who keep the camp running. These aren&rsquo;t employees of a hotel
                chain &mdash; they&rsquo;re independent families, and we work with them as equals. Fair
                rates. Long-term partnerships. On-time payments.
              </p>
              <p>
                <strong className="text-dark">Second</strong>, it supports our small team here in
                Marrakech. The drivers who get you safely across the Atlas. Our office staff. The
                people who answer your WhatsApp messages at midnight when you&rsquo;re stressed about
                whether to pack a jacket.
              </p>
              <p>
                No corporate owners skimming a cut to a Paris boardroom. No investors expecting 30%
                margins. Just two groups of Moroccans &mdash; one in the desert, one in the city
                &mdash; making a real living by sharing what we love about this country.
              </p>
              <p>
                That&rsquo;s what &ldquo;<strong className="text-dark">local</strong>&rdquo; means to
                us.
              </p>
            </div>

            <div className="mt-10 text-center font-display text-[1.05rem] font-semibold leading-[1.65] text-dark">
              {statement.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              <p aria-hidden="true" className="mt-2 text-[1.4rem]">
                &#9996;&#129505;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Sub-components ──────────────────────────────────────────────

function Squiggle() {
  return (
    <svg width="52" height="8" viewBox="0 0 52 8" fill="none" aria-hidden="true" className="text-primary">
      <path
        d="M1 5.5C6 1.5 11 1.5 16 5.5C21 9.5 26 9.5 31 5.5C36 1.5 41 1.5 46 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default AboutBookingSupports;