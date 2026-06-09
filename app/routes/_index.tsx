import {type MetaFunction} from 'react-router';
import {SiteNavbar} from '~/components/SiteNavbar';
import {Hero} from '~/components/Hero';
import {TrustBar} from '~/components/TrustBar';
import {WhyUs} from '~/components/WhyUs';
import {TourRoutes} from '~/components/TourRoutes';
import {Journey} from '~/components/Journey';
import {CampTiers} from '~/components/CampTiers';
import {Reviews} from '~/components/Reviews';
import {FAQ} from '~/components/FAQ';
import {BookingCTA} from '~/components/BookingCTA';
import {SiteFooter} from '~/components/SiteFooter';

export const meta: MetaFunction = () => [
  {title: 'Budget Desert Tour — 3-Day Marrakech to Sahara from €85'},
  {name: 'description', content: '3-day small group desert tour from Marrakech to the Sahara. Real Berber camp, camel trek, fair price from €85.'},
];

export default function Homepage() {
  return (
    <>
      <SiteNavbar />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <WhyUs />
        <TourRoutes />
        <Journey />
        <CampTiers />
        <Reviews />
        <FAQ />
        <BookingCTA />
      </main>
      <SiteFooter />
    </>
  );
}
