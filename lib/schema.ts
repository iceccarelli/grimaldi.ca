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

import { PERSON, SITE_URL } from './site';

export const personRef = { '@type': 'Person', '@id': PERSON.personId } as const;

export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data) };
}

/** Site-level node. Emitted once, on the homepage. */
export const webSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: `${PERSON.legalName} — Personal`,
  inLanguage: 'en',
  publisher: personRef,
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
