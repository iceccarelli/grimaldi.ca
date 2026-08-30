/** Next.js on Vercel — NOT a static export.
 *
 *  Why: `output: 'export'` forbade route handlers, which forced the contact
 *  form and the book waitlist onto third-party SaaS endpoints. Standard Next
 *  on Vercel still prerenders every page in this app to static HTML at build
 *  time (verify: `npm run build` must mark every route ○ Static), so the
 *  crawler-correct invariant is unchanged — and /api/* becomes possible.
 *
 *  trailingSlash keeps canonical URLs stable across the v6 sitemap.
 *
 *  NOTE: response headers still live in vercel.json, not here, so that the
 *  security header set is defined in exactly one place for the whole domain.
 */
module.exports = {
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true },
};
