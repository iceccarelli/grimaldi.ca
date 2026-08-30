'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import BrandMark from './BrandMark';
import { locales, useI18n } from '@/lib/i18n';

/** One source of truth for primary navigation — desktop bar and mobile drawer
 *  render the same list, so they can never drift apart. */
const NAV: { href: string; key: string }[] = [
  { href: '/#about', key: 'navA' },
  { href: '/#journey', key: 'jKicker' },
  { href: '/topics/', key: 'navT' },
  { href: '/books/', key: 'navB' },
  { href: '/now/', key: 'navW' },
  { href: '/#network', key: 'navN' },
];

export default function Chrome({ children }: { children: ReactNode }) {
  const { locale, setLocale, t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const close = useCallback(() => setMenuOpen(false), []);

  // Escape closes the drawer; body scroll locks while it is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen, close]);

  return (
    <>
      <a className="skip-link" href="#main">{t('skip')}</a>

      <div className="utility">
        <div className="utility-in">
          <span className="lang" role="group" aria-label="Language">
            {locales.map(({ code, native }) => (
              <button key={code} type="button" className={locale === code ? 'on' : ''} onClick={() => setLocale(code)}>
                {native}
              </button>
            ))}
          </span>
          <a href="https://igrimaldi.engineering">igrimaldi.engineering</a>
          <a href="https://engineeringgrimaldi.com">engineeringgrimaldi.com</a>
          <a href="https://igrimaldi.engineering/card">{t('netCard')}</a>
          <a href="https://github.com/iceccarelli" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>

      <header className="nav">
        <nav className="nav-in" aria-label={t('navPrimary')}>
          <a className="brand" href="/">
            <BrandMark size={38} />
            <span>
              <b>Vincenzo Ceccarelli Grimaldi</b>
              <small>{t('brandTag')}</small>
            </span>
          </a>

          <div className="nav-links">
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>{t(item.key)}</a>
            ))}
          </div>

          <div className="nav-right">
            <a className="pill" href="/contact/">{t('connect')}</a>
            <button
              type="button"
              className="nav-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? t('menuClose') : t('menuOpen')}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className={menuOpen ? 'bars open' : 'bars'} aria-hidden="true">
                <i /><i /><i />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile drawer — below 980px this is the ONLY navigation there is. */}
        <div id="mobile-nav" className={menuOpen ? 'mnav open' : 'mnav'} hidden={!menuOpen}>
          <nav aria-label={t('navPrimary')}>
            {NAV.map((item) => (
              <a key={item.href} href={item.href} onClick={close}>{t(item.key)}</a>
            ))}
            <a className="mnav-cta" href="/contact/" onClick={close}>{t('connect')} →</a>
          </nav>
          <div className="mnav-net">
            <a href="https://igrimaldi.engineering">igrimaldi.engineering</a>
            <a href="https://engineeringgrimaldi.com">engineeringgrimaldi.com</a>
          </div>
        </div>
      </header>

      {menuOpen && <div className="mnav-scrim" onClick={close} aria-hidden="true" />}

      <div id="main">{children}</div>

      <footer>
        <div className="foot">
          <div className="foot-grid">
            <div>
              <div className="foot-brand"><BrandMark size={42} /><b>Vincenzo Ceccarelli Grimaldi</b></div>
              <p>{t('footAbout')}</p>
            </div>
            <div>
              <h4>{t('footNet')}</h4>
              <a href="https://igrimaldi.engineering">igrimaldi.engineering — {t('netSoftware')}</a>
              <a href="https://engineeringgrimaldi.com">engineeringgrimaldi.com — {t('netHardware')}</a>
              <a href="https://grimaldi.ca">grimaldi.ca — {t('netPersonal')}</a>
              <a href="https://igrimaldi.engineering/card">{t('netCard')}</a>
              <a href="https://github.com/iceccarelli" rel="noopener noreferrer">GitHub — iceccarelli</a>
            </div>
            <div>
              <h4>{t('footContact')}</h4>
              <a href="/contact/">{t('connect')} →</a>
              <a href="mailto:vincenzo@igrimaldi.engineering">vincenzo@igrimaldi.engineering</a>
              <a href="https://www.linkedin.com/in/vincenzo-ceccarelli-grimaldi-2912b42a0" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://x.com/Vince87Grimaldi" rel="noopener noreferrer">X</a>
              <a href="https://www.instagram.com/grimaldiengineering/" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
          <div className="legal">
            <span>{t('rights')}</span>
            <span className="legal-links">
              <a href="/imprint/">Imprint</a>
              <a href="/privacy/">Privacy</a>
              <a href="/contact/">{t('connect')}</a>
            </span>
            <a href="#top">{t('top')}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
