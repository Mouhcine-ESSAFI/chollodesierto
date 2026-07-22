// ── GraphQL Queries ─────────────────────────────────────────────────────────
//
// Shopify Metaobject setup (do once in Admin → Settings → Custom data → Metaobjects):
//
// ┌─ tour_route ─────────────────────────────────────────────────────────────┐
// │  title           single_line_text                                        │
// │  label           single_line_text   (side-card eyebrow)                  │
// │  badge           single_line_text   (featured ribbon, e.g. "Most Popular")│
// │  featured        boolean                                                  │
// │  stop_start      single_line_text   (e.g. "Marrakech")                   │
// │  stop_mid        single_line_text   (e.g. "Merzouga")                    │
// │  stop_end        single_line_text   (e.g. "Fez")                         │
// │  description_lines  multi_line_text (one line per newline)               │
// │  price           number_integer     (in €, e.g. 85)                      │
// │  days            number_integer     (default 3)                           │
// │  image           file_reference                                           │
// │  sort_order      number_integer     (controls display order)              │
// └──────────────────────────────────────────────────────────────────────────┘
//
// ┌─ camp_tier ───────────────────────────────────────────────────────────────┐
// │  name            single_line_text                                         │
// │  badge           single_line_text   (overlay text, e.g. "Traditional…")  │
// │  price_label     single_line_text   ("In price" / "Per person")           │
// │  price_value     single_line_text   ("Included" / "+€15" / "+€45")        │
// │  price_delta     number_integer     (0 / 15 / 45)                         │
// │  features        list.single_line_text                                    │
// │  best_for_emoji  single_line_text   (e.g. "🎒")                           │
// │  best_for_emoji_label  single_line_text  (accessible label)               │
// │  best_for_text   single_line_text                                         │
// │  featured        boolean            (raised center tier)                  │
// │  image           file_reference                                            │
// │  sort_order      number_integer                                            │
// └───────────────────────────────────────────────────────────────────────────┘
//
// ┌─ faq_item ────────────────────────────────────────────────────────────────┐
// │  question        single_line_text                                         │
// │  answer          multi_line_text                                          │
// │  sort_order      number_integer                                            │
// └───────────────────────────────────────────────────────────────────────────┘
//
// ┌─ review ──────────────────────────────────────────────────────────────────┐
// │  quote           multi_line_text                                          │
// │  author_name     single_line_text                                         │
// │  flag            single_line_text   (emoji, e.g. "🇩🇪")                   │
// │  country         single_line_text   (e.g. "Germany")                      │
// │  date            single_line_text   (e.g. "February 2025")                │
// │  rating          number_decimal     (0–5, halves OK)                      │
// │  sort_order      number_integer                                            │
// └───────────────────────────────────────────────────────────────────────────┘

export const TOUR_ROUTES_QUERY = `#graphql
  query TourRoutes {
    metaobjects(type: "tour_route", first: 10) {
      nodes {
        id
        handle
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image {
                url(transform: { maxWidth: 900, preferredContentType: WEBP })
                altText
              }
            }
          }
        }
      }
    }
  }
` as const;

export const CAMP_TIERS_QUERY = `#graphql
  query CampTiers {
    metaobjects(type: "camp_tier", first: 10) {
      nodes {
        id
        handle
        fields {
          key
          value
          reference {
            ... on MediaImage {
              image {
                url(transform: { maxWidth: 900, preferredContentType: WEBP })
                altText
              }
            }
          }
        }
      }
    }
  }
` as const;

export const FAQS_QUERY = `#graphql
  query Faqs {
    metaobjects(type: "faq_item", first: 20) {
      nodes {
        id
        fields { key value }
      }
    }
  }
` as const;

export const REVIEWS_QUERY = `#graphql
  query Reviews {
    metaobjects(type: "review", first: 20) {
      nodes {
        id
        fields { key value }
      }
    }
  }
` as const;

// ── Field helpers ────────────────────────────────────────────────────────────

type MetaField = {key: string; value: string | null; reference?: any};

function f(fields: MetaField[], key: string): string {
  return fields.find((x) => x.key === key)?.value ?? '';
}
function fInt(fields: MetaField[], key: string): number {
  return parseInt(f(fields, key) || '0', 10);
}
function fFloat(fields: MetaField[], key: string): number {
  return parseFloat(f(fields, key) || '0');
}
function fBool(fields: MetaField[], key: string): boolean {
  return f(fields, key) === 'true';
}
function fImg(fields: MetaField[], key: string) {
  const img = fields.find((x) => x.key === key)?.reference?.image;
  return img ? {url: img.url as string, altText: (img.altText as string) ?? ''} : null;
}
function fList(fields: MetaField[], key: string): string[] {
  const val = f(fields, key);
  if (!val) return [];
  try {
    return JSON.parse(val) as string[];
  } catch {
    return val.split('\n').filter(Boolean);
  }
}

// ── Mappers — TourRoutes component ──────────────────────────────────────────

export function mapToTourRoutes(data: unknown) {
  const nodes: any[] = (data as any)?.metaobjects?.nodes ?? [];
  return nodes
    .map((node) => {
      const fields: MetaField[] = node.fields;
      const img = fImg(fields, 'image');
      return {
        id: node.handle as string,
        label: f(fields, 'label'),
        featured: fBool(fields, 'featured'),
        badge: f(fields, 'badge') || undefined,
        image: img?.url ?? '',
        imageAlt: img?.altText ?? '',
        days: `${fInt(fields, 'days') || 3} Days`,
        title: f(fields, 'title'),
        stops: [
          {label: f(fields, 'stop_start')},
          {label: f(fields, 'stop_mid')},
          {label: f(fields, 'stop_end')},
        ] as [{label: string}, {label: string}, {label: string}],
        description: f(fields, 'description_lines').split('\n').filter(Boolean),
        price: `€${fInt(fields, 'price')}`,
        href: `/tours/${node.handle as string}`,
        _sort: fInt(fields, 'sort_order'),
      };
    })
    .sort((a, b) => a._sort - b._sort)
    .map(({_sort: _s, ...rest}) => rest);
}

// ── Mappers — BookingBody routes (RouteOption) ───────────────────────────────

export function mapToBookingRoutes(data: unknown) {
  const nodes: any[] = (data as any)?.metaobjects?.nodes ?? [];
  return nodes
    .map((node) => {
      const fields: MetaField[] = node.fields;
      return {
        id: node.handle as string,
        stops: [
          f(fields, 'stop_start'),
          f(fields, 'stop_mid'),
          f(fields, 'stop_end'),
        ] as [string, string, string],
        price: fInt(fields, 'price'),
        _sort: fInt(fields, 'sort_order'),
      };
    })
    .sort((a, b) => a._sort - b._sort)
    .map(({_sort: _s, ...rest}) => rest);
}

// ── Mappers — CampTiers component ────────────────────────────────────────────

export function mapToCampTiers(data: unknown) {
  const nodes: any[] = (data as any)?.metaobjects?.nodes ?? [];
  return nodes
    .map((node) => {
      const fields: MetaField[] = node.fields;
      const img = fImg(fields, 'image');
      return {
        name: f(fields, 'name'),
        image: img?.url ?? '',
        imageAlt: img?.altText ?? '',
        badge: f(fields, 'badge'),
        priceLabel: f(fields, 'price_label'),
        priceValue: f(fields, 'price_value'),
        features: fList(fields, 'features'),
        bestForEmoji: f(fields, 'best_for_emoji'),
        bestForEmojiLabel: f(fields, 'best_for_emoji_label'),
        bestForText: f(fields, 'best_for_text'),
        featured: fBool(fields, 'featured'),
        _sort: fInt(fields, 'sort_order'),
      };
    })
    .sort((a, b) => a._sort - b._sort)
    .map(({_sort: _s, ...rest}) => rest);
}

// ── Mappers — BookingBody camps (CampOption) ─────────────────────────────────

export function mapToBookingCamps(data: unknown) {
  const nodes: any[] = (data as any)?.metaobjects?.nodes ?? [];
  return nodes
    .map((node) => {
      const fields: MetaField[] = node.fields;
      const img = fImg(fields, 'image');
      return {
        id: node.handle as string,
        name: f(fields, 'name'),
        priceLabel: f(fields, 'price_label'),
        priceValue: f(fields, 'price_value'),
        delta: fInt(fields, 'price_delta'),
        image: img?.url ?? '',
        imageAlt: img?.altText ?? '',
        _sort: fInt(fields, 'sort_order'),
      };
    })
    .sort((a, b) => a._sort - b._sort)
    .map(({_sort: _s, ...rest}) => rest);
}

// ── Mappers — Faq component ───────────────────────────────────────────────────

export function mapToFaqs(data: unknown) {
  const nodes: any[] = (data as any)?.metaobjects?.nodes ?? [];
  return nodes
    .map((node) => {
      const fields: MetaField[] = node.fields;
      return {
        q: f(fields, 'question'),
        a: f(fields, 'answer'),
        _sort: fInt(fields, 'sort_order'),
      };
    })
    .sort((a, b) => a._sort - b._sort)
    .map(({_sort: _s, ...rest}) => rest);
}

// ── Mappers — Testimonials component ─────────────────────────────────────────

export function mapToReviews(data: unknown) {
  const nodes: any[] = (data as any)?.metaobjects?.nodes ?? [];
  return nodes
    .map((node) => {
      const fields: MetaField[] = node.fields;
      return {
        quote: f(fields, 'quote'),
        name: f(fields, 'author_name'),
        flag: f(fields, 'flag'),
        country: f(fields, 'country'),
        date: f(fields, 'date'),
        rating: fFloat(fields, 'rating'),
        _sort: fInt(fields, 'sort_order'),
      };
    })
    .sort((a, b) => a._sort - b._sort)
    .map(({_sort: _s, ...rest}) => rest);
}
