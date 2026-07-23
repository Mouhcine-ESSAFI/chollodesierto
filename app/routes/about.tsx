import type {MetaFunction} from 'react-router';
import {SiteNavbar} from '~/components/SiteNavbar';
import {AboutHero} from '~/components/AboutHero';
import {AboutStory} from '~/components/AboutStory';
import {AboutPartners} from '~/components/AboutPartners';
import {SiteFooter} from '~/components/SiteFooter';

export const meta: MetaFunction = () => [
  {title: 'About Us — Chollodesierto'},
  {
    name: 'description',
    content:
      'Learn how Chollodesierto was born from a bad tour into one of Morocco\'s most trusted budget desert experiences.',
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteNavbar />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutPartners />
      </main>
      <SiteFooter />
    </>
  );
}
