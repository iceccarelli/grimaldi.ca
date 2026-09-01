import HomeSections from '@/components/HomeSections';
import TopicsShelf from '@/components/TopicsShelf';
import JsonLd from '@/components/JsonLd';
import { personRef } from '@/lib/schema';
import { PERSON, SITE_URL } from '@/lib/site';

/**
 * Server shell for the home page.
 *
 * The interactive sections stay a client component; this shell exists so the
 * ProfilePage node can be scoped to THIS url. Emitting it from the root
 * layout made /contact/ and /privacy/ claim to be profile pages as well.
 */
const profilePage = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profile`,
  url: `${SITE_URL}/`,
  name: `${PERSON.legalName} — Personal`,
  inLanguage: 'en',
  mainEntity: personRef,
};

export default function Home() {
  return (
    <>
      <JsonLd data={profilePage} />
      <HomeSections topicsShelf={<TopicsShelf />} />
    </>
  );
}
