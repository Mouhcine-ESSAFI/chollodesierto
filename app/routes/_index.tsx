import {type MetaFunction} from 'react-router';
import {SiteNavbar} from '~/components/SiteNavbar';
import {Hero} from '~/components/Hero';
import {TrustBar} from '~/components/TrustBar';
import {WhyChooseUs} from '~/components/WhyChooseUs';
import {TourRoutes} from '~/components/TourRoutes';
import {Journey} from '~/components/Journey';
import {CampTiers} from '~/components/CampTiers';
import {CapturedByTribe} from '~/components/CapturedByTribe';
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
        <TrustBar
          poster="https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1600&q=80"
          videoUrl="https://cdn.shopify.com/videos/c/o/v/5a631955aab14bd6afeeef75fa2f515f.mp4"
        />
        <WhyChooseUs />
        <TourRoutes />
        <Journey />
        <CampTiers />
        <CapturedByTribe />
        {/* <FAQ /> */}
        <BookingCTA />
      </main>
      {/* <SiteFooter /> */}
    </>
  );
}
