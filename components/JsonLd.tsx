import { jsonLdScript } from '@/lib/schema';

/** Server component — renders structured data into the prerendered HTML,
 *  so crawlers see it with zero JavaScript. */
export default function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(data)} />;
}
