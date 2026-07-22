import {useLoaderData} from 'react-router';
import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import {SiteNavbar} from '~/components/SiteNavbar';
import {Hero} from '~/components/Hero';
import {TrustBar} from '~/components/TrustBar';
import {WhyChooseUs} from '~/components/WhyChooseUs';
import {TourRoutes} from '~/components/TourRoutes';
import {Journey} from '~/components/Journey';
import {CampTiers} from '~/components/CampTiers';
import {CapturedByTribe} from '~/components/CapturedByTribe';
import {Included} from '~/components/Included';
import {BookingCTA} from '~/components/BookingCTA';
import {SiteFooter} from '~/components/SiteFooter';
import {Testimonials} from '~/components/Testimonials';
import {Faq} from '~/components/Faq';
import {
  TOUR_ROUTES_QUERY,
  CAMP_TIERS_QUERY,
  FAQS_QUERY,
  REVIEWS_QUERY,
  mapToTourRoutes,
  mapToCampTiers,
  mapToFaqs,
  mapToReviews,
} from '~/lib/queries';

export const meta: MetaFunction = () => [
  {title: 'Budget Desert Tour — 3-Day Marrakech to Sahara from €85'},
  {
    name: 'description',
    content:
      '3-day small group desert tour from Marrakech to the Sahara. Real Berber camp, camel trek, fair price from €85.',
  },
];

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  const [routesRes, campsRes, faqsRes, reviewsRes] = await Promise.all([
    storefront.query(TOUR_ROUTES_QUERY).catch(() => null),
    storefront.query(CAMP_TIERS_QUERY).catch(() => null),
    storefront.query(FAQS_QUERY).catch(() => null),
    storefront.query(REVIEWS_QUERY).catch(() => null),
  ]);

  return {
    routes:  mapToTourRoutes(routesRes),
    camps:   mapToCampTiers(campsRes),
    faqs:    mapToFaqs(faqsRes),
    reviews: mapToReviews(reviewsRes),
  };
}

export default function Homepage() {
  const {routes, camps, faqs, reviews} = useLoaderData<typeof loader>();

  return (
    <>
      <SiteNavbar />
      <main id="main-content">
        <Hero />
        <TrustBar
          poster="https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1600&q=80"
          videoUrl="https://cdn.shopify.com/videos/c/o/v/5a631955aab14bd6afeeef75fa2f515f.mp4"
        />
        <WhyChooseUs />
        <TourRoutes routes={routes.length ? routes : undefined} />
        <Journey />
        <CampTiers camps={camps.length ? camps : undefined} />
        <CapturedByTribe />
        <Included />
        <BookingCTA />
        <Testimonials reviews={reviews.length ? reviews : undefined} />
        <Faq faqs={faqs.length ? faqs : undefined} />
      </main>
      <SiteFooter />
    </>
  );
}
