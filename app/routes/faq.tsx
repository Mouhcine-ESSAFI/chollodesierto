import {type MetaFunction} from 'react-router';
import {SiteNavbar} from '~/components/SiteNavbar';
import {FAQ} from '~/components/FAQ';
import {SiteFooter} from '~/components/SiteFooter';

export const meta: MetaFunction = () => [
  {title: 'FAQ — Budget Desert Tour'},
  {
    name: 'description',
    content:
      'Answers to the most common questions about our 3-day Sahara desert tour from Marrakech.',
  },
];

export default function FAQPage() {
  return (
    <>
      <SiteNavbar />
      <main id="main-content" className="pt-24">
        <FAQ />
      </main>
      <SiteFooter />
    </>
  );
}
