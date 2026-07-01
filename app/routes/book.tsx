import {type MetaFunction} from 'react-router';
import {SiteNavbar} from '~/components/SiteNavbar';
import {BookingCTA} from '~/components/BookingCTA';
import {SiteFooter} from '~/components/SiteFooter';

export const meta: MetaFunction = () => [
  {title: 'Book Your Desert Tour — Budget Desert Tour'},
  {name: 'description', content: 'Book your 3-day Sahara desert tour from €85. Reserve with just 20% deposit. Free cancellation up to 48 hours before departure.'},
];

export default function BookPage() {
  return (
    <>
      <SiteNavbar />
      <main id="main-content">
        <BookingCTA />
      </main>
      <SiteFooter />
    </>
  );
}
