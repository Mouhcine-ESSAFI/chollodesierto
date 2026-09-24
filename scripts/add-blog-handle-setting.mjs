/**
 * Adds `blog_handle` to site_settings and points it at the blog that actually
 * exists in this store.
 *
 * The code used to hardcode the blog handle "news", which no store here has —
 * so the journal silently showed its empty state. The handle now comes from
 * Admin, with a fall back to the first blog the storefront can see, so a second
 * store works whatever its blog is called.
 *
 * Usage: node scripts/add-blog-handle-setting.mjs [--dry-run]
 */
import {readFileSync} from 'fs';

const DRY = process.argv.includes('--dry-run');

const env = {};
for (const line of readFileSync('.env', 'utf8').split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const STORE = env.SHOPIFY_STORE_DOMAIN || env.PUBLIC_STORE_DOMAIN;
const TOKEN = env.SHOPIFY_ADMIN_ACCESS_TOKEN || env.PRIVATE_ADMIN_API_TOKEN;
const SF_TOKEN = env.PUBLIC_STOREFRONT_API_TOKEN;
const SF_VERSION = env.PUBLIC_STOREFRONT_API_VERSION || '2025-04';
if (!STORE || !TOKEN) throw new Error('Set SHOPIFY_STORE_DOMAIN and SHOPIFY_ADMIN_ACCESS_TOKEN in .env');

async function admin(query, variables) {
  const r = await fetch(`https://${STORE}/admin/api/2025-01/graphql.json`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'X-Shopify-Access-Token': TOKEN},
    body: JSON.stringify({query, variables}),
  });
  const j = await r.json();
  if (j.errors) throw new Error(JSON.stringify(j.errors));
  return j.data;
}

async function storefront(query) {
  const r = await fetch(`https://${env.PUBLIC_STORE_DOMAIN}/api/${SF_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': SF_TOKEN},
    body: JSON.stringify({query}),
  });
  const j = await r.json();
  if (j.errors) throw new Error(JSON.stringify(j.errors));
  return j.data;
}

// The Admin `blogs` field needs read_content, which this token lacks — but the
// storefront can list them, and the storefront is what the site reads anyway.
const blogs = (
  await storefront(`query { blogs(first: 20) { nodes { handle title articles(first: 1) { nodes { handle } } } } }`)
).blogs.nodes;

if (!blogs.length) throw new Error('this store has no blog the storefront can see');
console.log('blogs visible to the storefront:');
for (const b of blogs) {
  console.log(`  ${b.handle.padEnd(18)} "${b.title}"  has articles: ${b.articles.nodes.length > 0}`);
}
// Prefer a blog that actually has posts.
const target = blogs.find((b) => b.articles.nodes.length) ?? blogs[0];
console.log(`\nusing: ${target.handle}`);

const def = (
  await admin(`query { metaobjectDefinitionByType(type: "site_settings") {
    id fieldDefinitions { key } } }`)
).metaobjectDefinitionByType;

if (!def.fieldDefinitions.some((f) => f.key === 'blog_handle')) {
  if (DRY) {
    console.log('[dry-run] would add site_settings.blog_handle');
  } else {
    const r = await admin(
      `mutation U($id: ID!, $d: MetaobjectDefinitionUpdateInput!) {
         metaobjectDefinitionUpdate(id: $id, definition: $d) {
           metaobjectDefinition { fieldDefinitions { key } } userErrors { field message } } }`,
      {
        id: def.id,
        d: {
          fieldDefinitions: [
            {
              create: {
                key: 'blog_handle',
                name: 'Journal blog handle',
                type: 'single_line_text_field',
                description:
                  'Which Shopify blog feeds the Journal page. Find it in Content › Blog posts › Manage blogs. Leave blank to use the first blog.',
                required: false,
              },
            },
          ],
        },
      },
    );
    const errs = r.metaobjectDefinitionUpdate.userErrors;
    if (errs.length) throw new Error(JSON.stringify(errs));
    console.log('added site_settings.blog_handle');
  }
} else {
  console.log('site_settings.blog_handle already exists');
}

const entry = (
  await admin(`query { metaobjects(type: "site_settings", first: 1) {
    nodes { id handle fields { key value } } } }`)
).metaobjects.nodes[0];
if (!entry) throw new Error('no site_settings entry');

const current = entry.fields.find((f) => f.key === 'blog_handle')?.value;
if (current) {
  console.log(`blog_handle already set to "${current}" — left alone`);
} else if (DRY) {
  console.log(`[dry-run] would set blog_handle = ${target.handle}`);
} else {
  const r = await admin(
    `mutation U($id: ID!, $m: MetaobjectUpdateInput!) {
       metaobjectUpdate(id: $id, metaobject: $m) {
         metaobject { handle } userErrors { field message } } }`,
    {id: entry.id, m: {fields: [{key: 'blog_handle', value: target.handle}]}},
  );
  const errs = r.metaobjectUpdate.userErrors;
  if (errs.length) throw new Error(JSON.stringify(errs));
  console.log(`set blog_handle = ${target.handle}`);
}
