import {type MetaFunction} from 'react-router';
import {SiteNavbar} from '~/components/SiteNavbar';
import {TourRoutes} from '~/components/TourRoutes';
import {SiteFooter} from '~/components/SiteFooter';

export const meta: MetaFunction = () => [
  {title: 'Tour Routes — Budget Desert Tour'},
  {name: 'description', content: 'Choose your route through Morocco. 3-day small group tours from Marrakech or Fez to the Sahara from €85.'},
];

export default function RoutesPage() {
  return (
    <>
      <SiteNavbar />
      <main id="main-content" className="pt-24">
        <TourRoutes />
      </main>
      <SiteFooter />
    </>
  );
}
