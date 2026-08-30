/** Static export: every page prerenders to plain HTML in out/, so crawlers
 *  and AI agents read the full site with zero JavaScript.
 *
 *  trailingSlash: each route lands in out/<route>/index.html — Vercel serves
 *  /now/ directly with no rewrite ambiguity, and canonical URLs are stable.
 *
 *  NOTE: headers() is IGNORED under `output: 'export'` — all response
 *  headers (security, caching) live in vercel.json. Do not add them here.
 */
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
