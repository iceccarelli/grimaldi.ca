import type { Metadata } from 'next';
import Image from 'next/image';
import JsonLd from '@/components/JsonLd';
import { breadcrumbs, personRef } from '@/lib/schema';
import { DOORS, PERSON, SITE_URL } from '@/lib/site';
import { NOW_UPDATED, nowItems } from '@/content/now';
import { publishedTopics } from '@/content/topics';

/**
 * About — the person, readable in twenty seconds.
 *
 * This was the home page until the site became the Operations cluster's
 * control surface (decision D-001). Name, two sentences, what he is doing
 * now, what he has written, where the other sites are, how to reach him.
 * Text links throughout; nothing here is for sale. Server component.
 */
export const metadata: Metadata = {
  title: 'About',
  description:
    'Vincenzo Ceccarelli Grimaldi — electrical engineer in Frankfurt digitising high-voltage railway traction assets; operator of the Grimaldi Engineering ventures. What he is doing now, the explainers, the books, the other sites.',
  alternates: { canonical: '/about/' },
  openGraph: { type: 'profile', url: `${SITE_URL}/about/` },
};

const profilePage = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/about/#profile`,
  url: `${SITE_URL}/about/`,
  name: `${PERSON.legalName} — About`,
  inLanguage: 'en',
  mainEntity: personRef,
};

export default function AboutPage() {
  const topics = publishedTopics();
  const now = nowItems[0];

  return (
    <main className="home">
      <JsonLd data={profilePage} />
      <JsonLd data={breadcrumbs([{ name: 'About', path: '/about/' }])} />

      {/* 1 + 2 — who this is */}
      <header className="who">
        <Image
          className="who-photo"
          src="/headshot.jpg"
          alt=""
          width={96}
          height={96}
          priority
          unoptimized
        />
        <div>
          <h1 className="name">{PERSON.legalName}</h1>
          <p className="bio">
            Electrical engineer in Frankfurt am Main, digitising high-voltage railway traction
            assets for German rail; Canadian by connection, with ties to Toronto and the GTA. I
            operate the Grimaldi Engineering ventures — this site is the{' '}
            <a href="/">control surface of the Operations cluster</a> — and I write here about
            grids, power and where compute goes next. Nothing on this page is for sale.
          </p>
        </div>
      </header>

      {/* 3 — now */}
      <section className="row" aria-labelledby="h-now">
        <h2 id="h-now">Now</h2>
        <div>
          <p>
            <strong>{now.title}.</strong> {now.body}
          </p>
          <p className="more">
            <a href="/now/">Everything I’m doing now →</a> <span className="dim">updated {NOW_UPDATED}</span>
          </p>
        </div>
      </section>

      {/* 4 — writing and books, as text links */}
      <section className="row" aria-labelledby="h-writing">
        <h2 id="h-writing">Writing</h2>
        <div>
          {topics.length > 0 ? (
            <ul className="plain">
              {topics.slice(0, 4).map((t) => (
                <li key={t.slug}>
                  <a href={`/topics/${t.slug}/`}>{t.title}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Explainers are written and checked before they appear here.</p>
          )}
          <p className="more">
            <a href="/topics/">All explainers →</a>
          </p>
        </div>
      </section>

      <section className="row" aria-labelledby="h-books">
        <h2 id="h-books">Books</h2>
        <div>
          <ul className="plain">
            <li>
              <a href="/books/the-renewables-migration/">The Renewables Migration</a>
              <span className="dim"> — manuscript in revision, eleven public proof engines</span>
            </li>
            <li>
              <a href="/books/the-orbital-ai-compute-roadmap/">The Orbital AI Compute Roadmap</a>
              <span className="dim"> — manuscript in revision</span>
            </li>
          </ul>
          <p className="more">
            <a href="/books/">About both manuscripts →</a> <span className="dim">not on sale anywhere</span>
          </p>
        </div>
      </section>

      {/* 5 — doors to the other sites, as text */}
      <section className="row" aria-labelledby="h-elsewhere">
        <h2 id="h-elsewhere">Elsewhere</h2>
        <div>
          <ul className="doors">
            {DOORS.map((d) => (
              <li key={d.href}>
                <a className="url" href={d.href} rel="noopener noreferrer">{d.label}</a>
                <span> — {d.what}</span>
              </li>
            ))}
          </ul>
          <p className="gh">
            <a className="url" href="https://greenhardwood.ca" rel="noopener noreferrer">greenhardwood.ca</a> is Green
            Hardwood Ltd., Franco Giacinto Oller Grimaldi’s hardwood flooring and custom stairs and
            railing shop at 88 Sterling Road, Unit 6, Toronto ON M6R 2B2 — hardwood only, no vinyl.
            Call (416) 847-3366 or write to{' '}
            <a href="mailto:hello@greenhardwood.ca">hello@greenhardwood.ca</a>.
          </p>
        </div>
      </section>

      {/* 6 — contact */}
      <section className="row" aria-labelledby="h-contact">
        <h2 id="h-contact">Contact</h2>
        <div>
          <p>
            <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a> — or use the{' '}
            <a href="/contact/">contact form</a>. I reply from Frankfurt, usually within two working
            days.
          </p>
        </div>
      </section>
    </main>
  );
}
