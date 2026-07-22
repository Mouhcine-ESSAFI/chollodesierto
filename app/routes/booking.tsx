import {useLoaderData} from 'react-router';
import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import {SiteNavbar} from '~/components/SiteNavbar';
import {BookingHero} from '~/components/BookingHero';
import {BookingBody} from '~/components/BookingBody';
import {Testimonials} from '~/components/Testimonials';
import {SiteFooter} from '~/components/SiteFooter';
import {
  TOUR_ROUTES_QUERY,
  CAMP_TIERS_QUERY,
  REVIEWS_QUERY,
  mapToBookingRoutes,
  mapToBookingCamps,
  mapToReviews,
} from '~/lib/queries';

export const meta: MetaFunction = () => [
  {title: 'Book Your Desert Tour — Budget Desert Tour'},
  {name: 'description', content: 'Book your 3-day Sahara desert tour from €85. Reserve with just 20% deposit. Free cancellation up to 7 days before departure.'},
];

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  const [routesRes, campsRes, reviewsRes] = await Promise.all([
    storefront.query(TOUR_ROUTES_QUERY).catch(() => null),
    storefront.query(CAMP_TIERS_QUERY).catch(() => null),
    storefront.query(REVIEWS_QUERY).catch(() => null),
  ]);

  return {
    routes:  mapToBookingRoutes(routesRes),
    camps:   mapToBookingCamps(campsRes),
    reviews: mapToReviews(reviewsRes),
  };
}

export default function BookPage() {
  const {routes, camps, reviews} = useLoaderData<typeof loader>();

  return (
    <>
      <SiteNavbar />
      <main id="main-content">
        <BookingHero />
        <BookingBody
          routes={routes.length ? routes : undefined}
          camps={camps.length ? camps : undefined}
        />
        <Testimonials reviews={reviews.length ? reviews : undefined} />
      </main>
      <SiteFooter />
    </>
  );
}
