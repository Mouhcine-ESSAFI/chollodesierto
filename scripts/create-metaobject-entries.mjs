// Creates metaobject entries from data/metaobject-entries.json.
//
//   node scripts/create-metaobject-entries.mjs            # all types
//   node scripts/create-metaobject-entries.mjs faq_item   # one type
//
// Targets SHOPIFY_STORE_DOMAIN / SHOPIFY_ADMIN_ACCESS_TOKEN.
//
// Three things this handles that the first version did not:
//
//  1. Portable references. Reference fields hold `ref:product/<handle>` or
//     `ref:metaobject/<type>/<handle>` instead of raw gids, resolved against the
//     target store at run time. Raw gids are store-specific and silently point
//     at nothing after a store move.
//  2. Idempotency. Shopify does NOT reject a duplicate handle — it appends
//     "-1" and creates a second entry. Existing handles are skipped instead.
//  3. Dependency order. Types whose references point at other types are created
//     last, computed from the data rather than hardcoded.

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_VERSION = "2025-01";
const STORE = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

if (!STORE || !TOKEN) {
  console.error("Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_ACCESS_TOKEN env vars.");
  process.exit(1);
}

const ENDPOINT = `https://${STORE}/admin/api/${API_VERSION}/graphql.json`;
const onlyType = process.argv[2];

async function shopifyGraphQL(query, variables) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": TOKEN },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors, null, 2));
  return json.data;
}

const CREATE_ENTRY = `
  mutation CreateMetaobject($metaobject: MetaobjectCreateInput!) {
    metaobjectCreate(metaobject: $metaobject) {
      metaobject { id handle type }
      userErrors { field message code }
    }
  }
`;

const BY_HANDLE = `
  query ByHandle($handle: MetaobjectHandleInput!) {
    metaobjectByHandle(handle: $handle) { id }
  }
`;

const PRODUCT_BY_HANDLE = `
  query ProductByHandle($query: String!) {
    products(first: 1, query: $query) { nodes { id handle } }
  }
`;

const refCache = new Map();

async function resolveRef(ref) {
  if (refCache.has(ref)) return refCache.get(ref);
  const body = ref.slice("ref:".length);
  let gid;

  if (body.startsWith("product/")) {
    const handle = body.slice("product/".length);
    const d = await shopifyGraphQL(PRODUCT_BY_HANDLE, { query: `handle:${handle}` });
    const found = d.products.nodes.find((p) => p.handle === handle);
    if (!found) throw new Error(`Cannot resolve ${ref} — no product with that handle on ${STORE}`);
    gid = found.id;
  } else if (body.startsWith("metaobject/")) {
    const [, type, handle] = body.split("/");
    const d = await shopifyGraphQL(BY_HANDLE, { handle: { type, handle } });
    if (!d.metaobjectByHandle) throw new Error(`Cannot resolve ${ref} — no ${type} entry "${handle}" on ${STORE}`);
    gid = d.metaobjectByHandle.id;
  } else {
    throw new Error(`Unrecognised reference: ${ref}`);
  }

  refCache.set(ref, gid);
  return gid;
}

async function toFieldsInput(entry) {
  const out = [];
  for (const [key, value] of Object.entries(entry.fields)) {
    let v = Array.isArray(value) ? JSON.stringify(value) : String(value);
    if (v.startsWith("ref:")) v = await resolveRef(v);
    out.push({ key, value: v });
  }
  return out;
}

async function exists(type, handle) {
  if (!handle) return false;
  const d = await shopifyGraphQL(BY_HANDLE, { handle: { type, handle } });
  return Boolean(d.metaobjectByHandle);
}

async function createEntry(type, entry) {
  if (await exists(type, entry.handle)) {
    console.log(`  = ${type} / ${entry.handle} (already exists, skipped)`);
    return "skipped";
  }
  const metaobject = { type, handle: entry.handle, fields: await toFieldsInput(entry) };
  const data = await shopifyGraphQL(CREATE_ENTRY, { metaobject });
  const result = data.metaobjectCreate;
  if (result.userErrors.length) {
    console.error(`  ! ${type} / ${entry.handle ?? "(auto-handle)"}:`, result.userErrors);
    return "failed";
  }
  console.log(`  -> ${type} / ${result.metaobject.handle} (${result.metaobject.id})`);
  return "created";
}

/** Types referenced by this type's entries via ref:metaobject/<type>/... */
function referencedTypes(entries) {
  const out = new Set();
  for (const e of entries) {
    for (const v of Object.values(e.fields)) {
      if (typeof v === "string" && v.startsWith("ref:metaobject/")) {
        out.add(v.split("/")[1]);
      }
    }
  }
  return out;
}

function orderTypes(spec, types) {
  const pending = [...types];
  const ordered = [];
  const done = new Set();
  while (pending.length) {
    const i = pending.findIndex((t) =>
      [...referencedTypes(spec[t] ?? [])].every((dep) => done.has(dep) || !types.includes(dep)),
    );
    if (i === -1) {
      console.warn("Circular references between:", pending.join(", "), "- creating in file order");
      return [...ordered, ...pending];
    }
    const [t] = pending.splice(i, 1);
    ordered.push(t);
    done.add(t);
  }
  return ordered;
}

async function main() {
  const spec = JSON.parse(readFileSync(join(__dirname, "..", "data", "metaobject-entries.json"), "utf-8"));
  const requested = onlyType ? [onlyType] : Object.keys(spec);
  const types = orderTypes(spec, requested);

  if (!onlyType) console.log(`order: ${types.join(" -> ")}`);
  console.log(`target: ${STORE}`);

  const tally = { created: 0, skipped: 0, failed: 0 };
  for (const type of types) {
    const entries = spec[type];
    if (!entries) { console.warn(`No entries for type "${type}"`); continue; }
    console.log(`\n${entries.length} ${type} entries...`);
    for (const entry of entries) tally[await createEntry(type, entry)]++;
  }

  console.log(`\nDone. created=${tally.created} skipped=${tally.skipped} failed=${tally.failed}`);
  if (tally.failed) process.exitCode = 1;
}

main().catch((err) => { console.error(err); process.exit(1); });
