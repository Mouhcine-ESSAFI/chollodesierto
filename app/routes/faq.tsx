import {type MetaFunction} from 'react-router';
import {SiteNavbar} from '~/components/SiteNavbar';
import {Included} from '~/components/Included';
import {SiteFooter} from '~/components/SiteFooter';

export const meta: MetaFunction = () => [
  {title: 'Included — Budget Desert Tour'},
  {
    name: 'description',
    content:
      'Answers to the most common questions about our 3-day Sahara desert tour from Marrakech.',
  },
];

export default function IncludedPage() {
  return (
    <>
      <SiteNavbar />
      <main id="main-content" className="pt-24">
        <Included />
      </main>
      <SiteFooter />
    </>
  );
}
