'use client';

import dynamic from 'next/dynamic';

/**
 * The concierge is a convenience, never the content. Loading it lazily and
 * client-only keeps its bundle out of the critical path, so it cannot
 * contribute to LCP or blocking time on first paint.
 */
const Ask = dynamic(() => import('./Ask'), { ssr: false, loading: () => null });

export default function AskLazy() {
  return <Ask />;
}
