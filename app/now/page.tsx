import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbs } from '@/lib/schema';
import { NOW_UPDATED, nowItems } from '@/content/now';

export const metadata: Metadata = {
  title: 'Now',
  description:
    'What Vincenzo Ceccarelli Grimaldi is doing now: digitalising high-voltage railway traction assets in Frankfurt, writing explainers, and revising two book manuscripts.',
  alternates: { canonical: '/now/' },
  openGraph: {
    images: [{ url: '/og-now.png', width: 1200, height: 630, alt: 'What Vincenzo Ceccarelli Grimaldi is doing now' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-now.png'] },
};

export default function NowPage() {
  return (
    <main>
      <JsonLd data={breadcrumbs([{ name: 'Now', path: '/now/' }])} />
      <div className="sheet">
        <div className="section">
          <span className="kicker">Now · updated {NOW_UPDATED}</span>
          <h1 className="page-title">What I’m doing now</h1>
          <p className="intro">
            A living page, in the spirit of nownow.com pages: what actually has my attention,
            updated as it changes — not a static bio.
          </p>

          <div className="steps">
            {nowItems.map((item) => (
              <div className="step" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>

          <p className="more" style={{ marginTop: '2.5rem' }}>
            <a href="/topics/">The explainers →</a> · <a href="/books/">The books →</a> ·{' '}
            <a href="/contact/">Write to me →</a>
          </p>
        </div>
      </div>
    </main>
  );
}
