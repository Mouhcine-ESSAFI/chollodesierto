const CTA_BG =
  'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=1600&q=80';

export function BookingCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      id="book"
      className="relative py-[7.5rem] overflow-hidden text-center"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${CTA_BG}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark/90" />

      <div className="relative z-10 max-w-[76rem] mx-auto px-10">
        <h2
          id="cta-heading"
          className="font-body font-bold text-[clamp(1.75rem,3.5vw,3.25rem)] text-sand mb-4"
        >
          Your story starts at sunset.
        </h2>
        <p className="text-[1.125rem] text-sand/70 mb-1">Book your spot with 20%.</p>
        <p className="text-[1.125rem] text-sand/70 mb-8">
          Pay the rest on the day of the excursion.
        </p>

        <ul className="flex flex-wrap justify-center gap-8 mb-10 list-none text-[0.9375rem] text-sand/65" role="list">
          <li className="flex items-center gap-2">
            <span className="text-forest font-bold">✓</span>Secure payment
          </li>
          <li className="flex items-center gap-2">
            <span className="text-forest font-bold">✓</span>Free cancellation
          </li>
          <li className="flex items-center gap-2">
            <span className="text-forest font-bold">✓</span>Verified local agency
          </li>
        </ul>

        <a
          href="#"
          className="font-display text-[1.25rem] bg-primary text-sand px-12 py-5 rounded-full
                     hover:opacity-90 transition-opacity inline-block"
        >
          Book Your Adventure Today →
        </a>
        <p className="mt-5 text-[0.875rem] text-sand/35">
          Or WhatsApp us if you'd rather talk first 😁
        </p>
      </div>
    </section>
  );
}
