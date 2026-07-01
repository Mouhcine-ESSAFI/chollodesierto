import {type MetaFunction, useParams} from 'react-router';
import {SiteNavbar} from '~/components/SiteNavbar';
import {BookingCTA} from '~/components/BookingCTA';
import {SiteFooter} from '~/components/SiteFooter';
import {TOUR_ROUTES} from '~/lib/mock-tours';

export const meta: MetaFunction = ({params}) => {
  const tour = TOUR_ROUTES.find((t) => t.id === params.id);
  return [
    {title: tour ? `${tour.title} — Budget Desert Tour` : 'Tour — Budget Desert Tour'},
    {name: 'description', content: tour?.description ?? 'Explore our Sahara desert tours from Marrakech.'},
  ];
};

export default function TourPage() {
  const {id} = useParams();
  const tour = TOUR_ROUTES.find((t) => t.id === id);

  if (!tour) {
    return (
      <>
        <SiteNavbar />
        <main id="main-content" className="pt-40 pb-24 text-center">
          <h1 className="font-display text-h2 text-dark">Tour not found</h1>
          <a href="/routes" className="mt-6 inline-block text-primary underline">See all routes</a>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteNavbar />
      <main id="main-content">
        {/* Hero */}
        <div className="relative h-[28rem] overflow-hidden">
          <img src={tour.imageUrl} alt={tour.imageAlt} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/40 to-dark/75" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p className="font-body text-label font-bold uppercase tracking-widest text-sand/70 mb-3">{tour.badge}</p>
            <h1 className="font-display text-h1 text-sand">{tour.title}</h1>
            <p className="mt-4 text-base text-sand/80">{tour.stops.join(' → ')} · {tour.days} days</p>
          </div>
        </div>

        {/* Details */}
        <section className="bg-sand py-section">
          <div className="container max-w-content">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20 items-start">
              <div>
                <h2 className="font-display text-h2 text-dark mb-6">{tour.description}</h2>
                <ul className="flex flex-col gap-4 text-base text-dark">
                  <li className="flex items-center gap-3"><span className="text-forest font-bold">✓</span> {tour.days} days · small group</li>
                  <li className="flex items-center gap-3"><span className="text-forest font-bold">✓</span> Camel trek + Berber desert camp included</li>
                  <li className="flex items-center gap-3"><span className="text-forest font-bold">✓</span> Free cancellation 48h before</li>
                  <li className="flex items-center gap-3"><span className="text-forest font-bold">✓</span> Reserve with just 20% deposit</li>
                </ul>
              </div>
              <div className="rounded-card bg-white p-8 shadow-card">
                <p className="font-body text-label text-dark/50 uppercase tracking-widest mb-1">Starting from</p>
                <p className="font-display text-h1 text-forest">€{tour.price}</p>
                <p className="text-sm text-dark/50 mb-8">per person</p>
                <a
                  href="/book"
                  className="block w-full text-center font-display text-btn text-sand bg-primary rounded-full py-4 hover:opacity-90 transition-opacity"
                >
                  Book This Route →
                </a>
              </div>
            </div>
          </div>
        </section>

        <BookingCTA />
      </main>
      <SiteFooter />
    </>
  );
}
