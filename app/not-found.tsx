import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main>
      <div className="sheet">
        <div className="section" style={{ minHeight: '48vh' }}>
          <span className="kicker">404</span>
          <h1 className="page-title">This page of the story doesn’t exist.</h1>
          <p className="intro">
            The address may have changed, or it never was. Everything real is one hop away.
          </p>
          <p className="more">
            <a href="/">Control room →</a> · <a href="/cluster/registry/">Registry →</a> ·{' '}
            <a href="/about/">About →</a> · <a href="/contact/">Contact →</a>
          </p>
        </div>
      </div>
    </main>
  );
}
