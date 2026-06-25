import {REVIEWS} from '~/lib/mock-tours';

export function Reviews() {
  return (
    <section aria-labelledby="reviews-heading" id="reviews" className="bg-sand py-[7.5rem]">
      <div className="max-w-[76rem] mx-auto px-10 text-center">

        <h2
          id="reviews-heading"
          className="font-body font-bold text-[2.375rem] text-dark mb-3"
        >
          3,000+ stories. Same desert.
        </h2>
        <p className="text-[1rem] text-dark/50 mb-[5rem]">
          Read what travelers tell us after they go home.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {REVIEWS.map((r) => (
            <article
              key={r.id}
              aria-label={`Review by ${r.name}`}
              className="bg-white rounded-[1.5rem] p-8 text-left shadow-card"
            >
              <p aria-hidden="true" className="text-primary mb-3">★★★★★</p>
              <blockquote className="font-bold text-[1rem] text-dark italic mb-5">
                "{r.quote}"
              </blockquote>
              <footer className="flex items-end justify-between">
                <div>
                  <cite className="not-italic font-bold text-[0.875rem] text-dark block">
                    {r.name}
                  </cite>
                  <time className="text-[0.8125rem] text-dark/40">{r.date}</time>
                  <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-forest mt-1">
                    Verified Traveler
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#book"
            className="font-display text-[1.125rem] bg-primary text-sand px-8 py-3.5 rounded-full
                       hover:opacity-90 transition-opacity"
          >
            Book the Journey Now
          </a>
          <a
            href="#reviews"
            className="font-display text-[1.125rem] bg-transparent text-dark border-2 border-dark/20 px-8 py-3.5 rounded-full
                       hover:border-dark/50 transition-colors"
          >
            Read all Reviews →
          </a>
        </div>

      </div>
    </section>
  );
}
