'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { askUi } from '@/lib/dynamic';
import { useI18n } from '@/lib/i18n';

/**
 * The concierge is a convenience, never the content — so it costs nothing
 * until someone asks for it.
 *
 * Measured: importing Ask eagerly (even with ssr:false) still pulled its
 * chunk and hydration into every page load. This renders only the launcher
 * button — a few bytes of markup — and imports the real component on the
 * first click. Every visitor who never opens the concierge never downloads,
 * parses or hydrates it.
 */
const Ask = dynamic(() => import('./Ask'), { ssr: false, loading: () => null });

export default function AskLazy() {
  const { locale } = useI18n();
  const [armed, setArmed] = useState(false);

  if (armed) return <Ask initialOpen />;

  return (
    <button
      type="button"
      className="ask-launcher"
      onClick={() => setArmed(true)}
      aria-expanded={false}
      aria-label={askUi.launcher[locale]}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    </button>
  );
}
