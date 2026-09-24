import {useLoaderData} from 'react-router';
import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import {SiteNavbar} from '~/components/SiteNavbar';
import {Reviews} from '~/components/Reviews';
import {SiteFooter} from '~/components/SiteFooter';
import {
  SF_REVIEWS_QUERY,
  SF_PAGE_SECTIONS_QUERY,
  mapReviews,
  mapPageSections,
} from '~/lib/admin-queries';
import {metaT} from '~/lib/ui-strings';

export const meta: MetaFunction = ({matches}) => {
  const t = metaT(matches);
  return [
    {title: t('meta.reviews.title', 'Traveler Reviews — Budget Desert Tour')},
    {
      name: 'description',
      content: t(
        'meta.reviews.description',
        'Read honest reviews from travelers who joined our 3-day Sahara desert tour from Marrakech.',
      ),
    },
  ];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  const [reviewsRes, sectionsRes] = await Promise.all([
    storefront.query(SF_REVIEWS_QUERY).catch(() => null),
    storefront.query(SF_PAGE_SECTIONS_QUERY).catch(() => null),
  ]);

  return {
    reviews: mapReviews(reviewsRes, 'reviews'),
    section: mapPageSections(sectionsRes)['reviews.index'] ?? null,
  };
}

export default function ReviewsPage() {
  const {reviews, section} = useLoaderData<typeof loader>();

  return (
    <>
      <SiteNavbar />
      <main id="main-content" className="pt-24">
        <Reviews
          heading={section?.heading || undefined}
          subheading={section?.subheading[0] || undefined}
          reviews={reviews.length ? reviews : undefined}
        />
      </main>
      <SiteFooter />
    </>
  );
}
