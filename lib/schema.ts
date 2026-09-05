/**
 * schema.ts — structured data builders.
 *
 * Rules this file enforces, so no page can break them:
 *  - The Person @id is network-wide and constant: PERSON.personId. Every
 *    schema on every domain must reference the SAME node, or Google treats
 *    Vincenzo as three different people.
 *  - Nothing is asserted that is not already true and public on the site.
 *    The books carry no ISBN, publisher, datePublished or offers, because
 *    they are manuscripts in revision — inventing those is entity fraud.
 */

import { CLUSTER, PERSON, SITE_URL } from './site';

export const personRef = { '@type': 'Person', '@id': PERSON.personId } as const;

export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data) };
}

/** Site-level node. Emitted once, in the root layout. */
export const webSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: `${CLUSTER.short} — control surface`,
  alternateName: `${PERSON.legalName} — grimaldi.ca`,
  description: `Control and integration surface of the ${CLUSTER.name} cluster.`,
  inLanguage: 'en',
  publisher: personRef,
};

/**
 * A control-room page: a CollectionPage whose parts are the typed records it
 * renders. Nothing is asserted beyond what the page shows.
 */
export function collectionPage(args: { path: string; name: string; description: string; parts?: unknown[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}${args.path}#page`,
    url: `${SITE_URL}${args.path}`,
    name: args.name,
    description: args.description,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: personRef,
    ...(args.parts?.length ? { hasPart: args.parts } : {}),
  };
}

/** The machine-readable cluster index, described as a Dataset so agents find it. */
export const clusterDataset = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  '@id': `${SITE_URL}/api/cluster/#dataset`,
  url: `${SITE_URL}/api/cluster/`,
  name: `${CLUSTER.name} — cluster index`,
  description:
    'Machine-readable state of the Operations & Commercial Automation cluster: repository registry with statuses, KPI definitions and measurements, workflow ranking, decision log, kill list, 90-day roadmap progress, weekly CEO reports, watchlist, integration contracts and agent permission specifications.',
  license: 'https://creativecommons.org/licenses/by/4.0/',
  creator: personRef,
  isAccessibleForFree: true,
  distribution: [
    { '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: `${SITE_URL}/api/cluster/` },
    { '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: `${SITE_URL}/api/cluster/registry/` },
    { '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: `${SITE_URL}/api/cluster/kpi/` },
  ],
};

/** Breadcrumbs: real hierarchy, matching the real URL structure. */
export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/**
 * Book node for a manuscript in revision.
 * `workExample` is deliberately absent: there is no published edition.
 */
export function manuscript(args: {
  path: string;
  name: string;
  about: string;
  description: string;
  /** Public proof-engine repositories, if the book has them. */
  proofRepos?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `${SITE_URL}${args.path}#book`,
    url: `${SITE_URL}${args.path}`,
    name: args.name,
    author: personRef,
    inLanguage: 'en',
    about: args.about,
    description: args.description,
    creativeWorkStatus: 'Draft',
    ...(args.proofRepos?.length
      ? {
          citation: args.proofRepos.map((url) => ({
            '@type': 'SoftwareSourceCode',
            codeRepository: url,
            url,
          })),
        }
      : {}),
  };
}

export function contactPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact/#page`,
    url: `${SITE_URL}/contact/`,
    name: `Contact ${PERSON.legalName}`,
    inLanguage: 'en',
    mainEntity: personRef,
  };
}
