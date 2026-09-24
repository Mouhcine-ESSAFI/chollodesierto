import {metaT} from '~/lib/ui-strings';
import {useLoaderData} from 'react-router';
import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import {SiteNavbar} from '~/components/SiteNavbar';
import {Faq} from '~/components/Faq';
import {SiteFooter} from '~/components/SiteFooter';
import {
  SF_FAQS_QUERY,
  SF_SITE_SETTINGS_QUERY,
  mapFaqs,
  mapSiteSettings,
} from '~/lib/admin-queries';

export const meta: MetaFunction<typeof loader> = ({data, matches}) => {
  const t = metaT(matches);
  const brand = data?.brandName || 'Budget Desert Tour';
  return [
    {title: `${t('meta.faq.title', 'FAQ')} — ${brand}`},
    {
      name: 'description',
      content: t(
        'meta.faq.description',
        'Answers to the most common questions about our 3-day Sahara desert tour from Marrakech.',
      ),
    },
  ];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  const [faqsRes, settingsRes] = await Promise.all([
    storefront.query(SF_FAQS_QUERY).catch(() => null),
    storefront.query(SF_SITE_SETTINGS_QUERY).catch(() => null),
  ]);

  return {
    faqs: mapFaqs(faqsRes, 'general'),
    brandName: mapSiteSettings(settingsRes)?.brandName ?? '',
  };
}

export default function FaqPage() {
  const {faqs} = useLoaderData<typeof loader>();

  return (
    <>
      <SiteNavbar />
      <main id="main-content" className="pt-24">
        <Faq faqs={faqs.length ? faqs : undefined} />
      </main>
      <SiteFooter />
    </>
  );
}
