import {Link, useLoaderData} from 'react-router';
import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import {SiteNavbar} from '~/components/SiteNavbar';
import {SiteFooter} from '~/components/SiteFooter';
import {SafeImage} from '~/components/SafeImage';
import {
  BLOG_ARTICLES_QUERY,
  BLOGS_QUERY,
  mapBlogArticles,
  resolveBlogHandle,
} from '~/lib/queries';
import {
  SF_SITE_SETTINGS_QUERY,
  SF_PAGE_SECTIONS_QUERY,
  mapSiteSettings,
  mapPageSections,
} from '~/lib/admin-queries';
import {metaT, useArticleDate, useT} from '~/lib/ui-strings';

export const meta: MetaFunction<typeof loader> = ({data, matches}) => {
  const t = metaT(matches);
  const brand = data?.brandName || 'Chollodesierto';
  return [
    {title: `${t('meta.blog.title', 'Journal')} — ${brand}`},
    {
      name: 'description',
      content: t(
        'meta.blog.description',
        'Stories, route notes and practical advice from our guides in the Moroccan Sahara.',
      ),
    },
  ];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;

  // The blog handle isn't known up front — it comes from site_settings, so the
  // settings and the blog list have to be read before the articles.
  const [settingsRes, sectionsRes, blogsRes] = await Promise.all([
    storefront.query(SF_SITE_SETTINGS_QUERY).catch(() => null),
    storefront.query(SF_PAGE_SECTIONS_QUERY).catch(() => null),
    storefront.query(BLOGS_QUERY).catch(() => null),
  ]);

  const settings = mapSiteSettings(settingsRes);
  const blogHandle = resolveBlogHandle(blogsRes, settings?.blogHandle);

  const blogRes = await storefront
    .query(BLOG_ARTICLES_QUERY, {variables: {blogHandle, first: 24}})
    .catch(() => null);

  return {
    articles: mapBlogArticles(blogRes),
    brandName: settings?.brandName ?? '',
    section: mapPageSections(sectionsRes)['blog.index'] ?? null,
  };
}

export default function BlogIndex() {
  const {articles, section} = useLoaderData<typeof loader>();
  const t = useT();
  const articleDate = useArticleDate();

  return (
    <>
      <SiteNavbar />
      <main id="main-content" className="pt-24">
        <section
          aria-label={t('aria.blog.section', 'Journal')}
          className="bg-gradient-to-b from-white to-sand py-section font-body"
        >
          <div className="container mx-auto max-w-content px-8">
            {section?.image && (
              <figure className="mb-10 overflow-hidden rounded-card shadow-card-m">
                <SafeImage
                  src={section.image.url}
                  alt={section.image.alt}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </figure>
            )}

            <div className="mb-13 text-center">
              <div className="mb-4 inline-flex flex-col items-center gap-1.5">
                <span className="text-label font-bold uppercase tracking-[0.22em] text-primary">
                  {section?.eyebrow || t('blog.eyebrow', 'Journal')}
                </span>
                <Squiggle />
              </div>
              <h1 className="font-display text-[clamp(1.375rem,3.4vw,2.375rem)] text-dark">
                {section?.heading || t('blog.heading', 'Notes from the desert.')}
              </h1>
              {section?.subheading[0] && (
                <p className="mx-auto mt-4 max-w-140 text-base leading-relaxed text-dark/80">
                  {section.subheading[0]}
                </p>
              )}
            </div>

            {articles.length === 0 ? (
              <div className="mx-auto max-w-140 rounded-card bg-white p-10 text-center shadow-card">
                <p className="font-display text-price text-dark">
                  {t('blog.empty_title', 'Nothing published yet.')}
                </p>
                <p className="mt-3 text-base leading-relaxed text-dark/80">
                  {section?.body[0] ||
                    t(
                      'blog.empty_body',
                      'We’re writing up route notes and traveler stories. Check back soon, or get in touch if there’s something you’d like us to cover.',
                    )}
                </p>
                <Link to="/contact" className="mt-4 inline-block text-primary underline">
                  {t('blog.empty_cta', 'Get in touch')}
                </Link>
              </div>
            ) : (
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {articles.map((a) => (
                  <li key={a.id}>
                    <Link
                      to={`/blog/${a.handle}`}
                      className="group flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card
                                 transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <SafeImage
                          src={a.image}
                          alt={a.imageAlt || a.title}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <p className="text-label uppercase tracking-[0.12em] text-dark/50">
                          {[articleDate(a.dateParts), a.author].filter(Boolean).join(' · ')}
                        </p>
                        <h2 className="mt-2 font-display text-price text-dark group-hover:text-primary">
                          {a.title}
                        </h2>
                        {a.excerpt && (
                          <p className="mt-3 flex-1 text-base leading-relaxed text-dark/80">
                            {a.excerpt}
                          </p>
                        )}
                        <span className="mt-5 text-label font-bold text-primary">
                          {section?.labelPrimary || t('blog.read_more', 'Read more')}{' '}
                          <span aria-hidden="true">&rarr;</span>
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Squiggle() {
  return (
    <svg width="52" height="8" viewBox="0 0 52 8" fill="none" aria-hidden="true" className="text-primary">
      <path
        d="M1 5.5C6 1.5 11 1.5 16 5.5C21 9.5 26 9.5 31 5.5C36 1.5 41 1.5 46 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
