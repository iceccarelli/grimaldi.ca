'use client';

import type { ReactNode } from 'react';
import { FOOTER_SITES } from '@/lib/site';
import { visibleLocales, useI18n } from '@/lib/i18n';

/**
 * Primary navigation — the control room first, the operator's writing after.
 * The same list renders at every width; the sub-sections of the control room
 * live in ClusterNav on the cluster pages themselves.
 */
const NAV: { href: string; key: string }[] = [
  { href: '/cluster/', key: 'navCluster' },
  { href: '/cluster/registry/', key: 'navRegistry' },
  { href: '/cluster/kpi/', key: 'navKpi' },
  { href: '/cluster/decisions/', key: 'navDecisions' },
  { href: '/topics/', key: 'navT' },
  { href: '/about/', key: 'navA' },
  { href: '/contact/', key: 'connect' },
];

export default function Chrome({ children }: { children: ReactNode }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <>
      <a className="skip-link" href="#main">{t('skip')}</a>

      <header className="top">
        <nav className="top-in" aria-label={t('navPrimary')}>
          <a className="brand" href="/">
            grimaldi.ca <span className="brand-tag">{t('brandTag')}</span>
          </a>
          <div className="top-links">
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>{t(item.key)}</a>
            ))}
            {/* The switcher only exists when more than one locale is true. */}
            {visibleLocales.length > 1 && (
              <span className="lang" role="group" aria-label="Language">
                {visibleLocales.map(({ code, native }) => (
                  <button
                    key={code}
                    type="button"
                    className={locale === code ? 'on' : ''}
                    aria-pressed={locale === code}
                    onClick={() => setLocale(code)}
                  >
                    {native}
                  </button>
                ))}
              </span>
            )}
          </div>
        </nav>
      </header>

      <div id="main">{children}</div>

      <footer className="foot">
        <div className="foot-in">
          <p className="foot-sites">
            {FOOTER_SITES.map((s, i) => (
              <span key={s.href}>
                {i > 0 && <span className="sep" aria-hidden="true"> · </span>}
                <a href={s.href} rel="noopener noreferrer">{s.label}</a>
              </span>
            ))}
          </p>
          <p className="foot-legal">
            <a href="/imprint/">Imprint</a>
            <span className="sep" aria-hidden="true"> · </span>
            <a href="/privacy/">Privacy</a>
          </p>
          <p className="foot-rights">{t('rights')}</p>
        </div>
      </footer>
    </>
  );
}
