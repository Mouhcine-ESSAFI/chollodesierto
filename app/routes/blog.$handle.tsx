import {Link, useLoaderData} from 'react-router';
import type {LoaderFunctionArgs, MetaFunction} from 'react-router';
import {SiteNavbar} from '~/components/SiteNavbar';
import {SiteFooter} from '~/components/SiteFooter';
import {SafeImage} from '~/components/SafeImage';
import {
  BLOG_ARTICLE_QUERY,
  BLOGS_QUERY,
  articleDateParts,
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
  if (!data?.article) return [{title: t('meta.post.not_found', 'Post not found')}];
  const brand = data.brandName || 'Chollodesierto';
  const {article} = data;
  return [
    {title: `${article.seoTitle || article.title} — ${brand}`},
    {
      name: 'description',
      content: article.seoDescription || article.excerpt || '',
    },
  ];
};

export async function loader({context, params}: LoaderFunctionArgs) {
  const {storefront} = context;
  const articleHandle = params.handle;

  if (!articleHandle) {
    throw new Response('Not found', {status: 404});
  }

  // Which blog the post lives in comes from site_settings, so that has to be
  // read before the article itself.
  const [settingsRes, sectionsRes, blogsRes] = await Promise.all([
    storefront.query(SF_SITE_SETTINGS_QUERY).catch(() => null),
    storefront.query(SF_PAGE_SECTIONS_QUERY).catch(() => null),
    storefront.query(BLOGS_QUERY).catch(() => null),
  ]);

  const settings = mapSiteSettings(settingsRes);
  const blogHandle = resolveBlogHandle(blogsRes, settings?.blogHandle);

  const articleRes = await storefront
    .query(BLOG_ARTICLE_QUERY, {variables: {blogHandle, articleHandle}})
    .catch(() => null);

  const a: any = (articleRes as any)?.blog?.articleByHandle;
  if (!a) {
    // A missing post is a real 404, not an empty page — otherwise bad URLs
    // would render a blank article shell and get indexed.
    throw new Response('Not found', {status: 404});
  }

  return {
    article: {
      title: a.title as string,
      contentHtml: (a.contentHtml as string) ?? '',
      excerpt: (a.excerpt as string) ?? '',
      dateParts: articleDateParts(a.publishedAt),
      author: (a.authorV2?.name as string) ?? '',
      image: (a.image?.url as string) ?? '',
      imageAlt: (a.image?.altText as string) ?? '',
      seoTitle: (a.seo?.title as string) ?? '',
      seoDescription: (a.seo?.description as string) ?? '',
    },
    brandName: settings?.brandName ?? '',
    section: mapPageSections(sectionsRes)['blog.post'] ?? null,
  };
}

export default function BlogPost() {
  const {article, section} = useLoaderData<typeof loader>();
  const t = useT();
  const articleDate = useArticleDate();
  const dateText = articleDate(article.dateParts);

  return (
    <>
      <SiteNavbar />
      <main id="main-content" className="pt-24">
        <article
          aria-label={article.title}
          className="bg-gradient-to-b from-white to-sand py-section font-body"
        >
          <div className="container mx-auto max-w-content px-8">
            {/* Header */}
            <div className="mx-auto max-w-180 text-center">
              <Link
                to="/blog"
                className="text-label font-bold uppercase tracking-[0.16em] text-primary"
              >
                <span aria-hidden="true">&larr;</span>{' '}
                {section?.labelSecondary || t('post.back_to_journal', 'Journal')}
              </Link>
              <h1 className="mt-5 font-display text-[clamp(1.5rem,3.8vw,2.5rem)] leading-tight text-dark text-balance">
                {article.title}
              </h1>
              {(dateText || article.author) && (
                <p className="mt-4 text-label uppercase tracking-[0.12em] text-dark/50">
                  {[dateText, article.author].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>

            {/* Cover */}
            {article.image && (
              <figure className="mx-auto mt-10 max-w-200 overflow-hidden rounded-card shadow-card-m">
                <SafeImage
                  src={article.image}
                  alt={article.imageAlt || article.title}
                  className="h-full w-full object-cover"
                />
              </figure>
            )}

            {/* Body — authored in Shopify Admin, so the HTML is first-party. */}
            <div
              className="article-body mx-auto mt-10 max-w-160 text-base leading-relaxed text-dark/85"
              dangerouslySetInnerHTML={{__html: article.contentHtml}}
            />

            {/* Closing call to action — copy comes from page_section
                `blog.post`, so it reads the same on every article. */}
            <div className="mt-14 text-center">
              {section?.heading && (
                <h2 className="mb-5 font-display text-price text-dark">
                  {section.heading}
                </h2>
              )}
              <Link
                to="/booking"
                className="inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-3.5
                           font-display text-btn text-sand transition-opacity hover:opacity-90"
              >
                {section?.labelPrimary || t('post.cta', 'Book your adventure')}{' '}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
