import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main>
      <div className="sheet" style={{ marginTop: 0 }}>
        <div className="section" style={{ minHeight: '48vh' }}>
          <span className="kicker">404</span>
          <h2>This page of the story doesn’t exist.</h2>
          <p className="intro">
            The address may have changed, or it never was. Everything real is one hop away.
          </p>
          <div className="cta-row">
            <a className="btn btn-dark" href="/">Back to the start</a>
            <a className="btn btn-line" href="/now/">What I’m doing now</a>
            <a className="btn btn-line" href="/contact/">Contact</a>
          </div>
        </div>
      </div>
    </main>
  );
}
