import {type MetaFunction} from 'react-router';
import {SiteNavbar} from '~/components/SiteNavbar';
import {Reviews} from '~/components/Reviews';
import {SiteFooter} from '~/components/SiteFooter';

export const meta: MetaFunction = () => [
  {title: 'Traveler Reviews — Budget Desert Tour'},
  {name: 'description', content: 'Read honest reviews from travelers who joined our 3-day Sahara desert tour from Marrakech.'},
];

export default function ReviewsPage() {
  return (
    <>
      <SiteNavbar />
      <main id="main-content" className="pt-24">
        <Reviews />
      </main>
      <SiteFooter />
    </>
  );
}
