import type { ReactNode } from 'react';
import JsonLd from './JsonLd';
import { breadcrumbs } from '@/lib/schema';

/**
 * Every inner page is the same printed sheet: kicker, h1, standfirst, body.
 * Breadcrumb JSON-LD is emitted from the same trail that the kicker shows.
 */
export default function PageShell({
  trail,
  kicker,
  title,
  standfirst,
  narrow = false,
  children,
}: {
  trail: { name: string; path: string }[];
  kicker: ReactNode;
  title: string;
  standfirst?: ReactNode;
  narrow?: boolean;
  children: ReactNode;
}) {
  return (
    <main>
      <JsonLd data={breadcrumbs(trail)} />
      <div className="sheet" style={{ marginTop: 0 }}>
        <div className={narrow ? 'section narrow' : 'section'}>
          <span className="kicker">{kicker}</span>
          <h1 className="page-title">{title}</h1>
          {standfirst && <p className="standfirst">{standfirst}</p>}
          {children}
        </div>
      </div>
    </main>
  );
}
