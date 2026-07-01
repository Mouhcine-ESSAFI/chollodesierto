import {REVIEWS} from '~/lib/mock-tours';

export function Reviews() {
  return (
    <section aria-labelledby="reviews-heading" className="bg-sand py-section">
      <div className="container max-w-content">
        <h2
          id="reviews-heading"
          className="text-center font-display text-h2 text-dark mb-subtitle"
        >
          What travelers are saying
        </h2>

        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <li
              key={r.id}
              className="flex flex-col gap-4 rounded-card bg-white p-8 shadow-card"
            >
              <div className="flex gap-0.5 text-[#F5B72B]" aria-label="5 stars">
                {Array.from({length: 5}).map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.9l-5.8 3.07 1.1-6.47-4.7-4.58 6.5-.95L12 2.5z"
                      fill="currentColor"
                    />
                  </svg>
                ))}
              </div>
              <blockquote className="flex-1 font-body text-base text-dark">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="font-body text-sm font-bold text-dark/60">
                {r.name} · {r.date}
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Reviews;
