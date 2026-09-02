'use client';

/**
 * Locale layer. English is canonical and baked into the prerendered HTML.
 *
 * The other tables in strings.json (es/de/zh) are kept — keys and all — but
 * they describe an older version of this site, so they are OFF the visible
 * switcher until every string in them is true again. Only locales listed in
 * `visibleLocales` can be selected or auto-detected; a stored preference for
 * a hidden locale falls back to English rather than showing stale copy.
 *
 * Locale persists in the shared `vg-locale` key, so a choice made on
 * igrimaldi.engineering carries over once the same locale is visible here.
 */

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import strings from './strings.json';

export type Locale = 'en' | 'es' | 'de' | 'zh';

export const locales: { code: Locale; native: string }[] = [
  { code: 'en', native: 'English' },
  { code: 'es', native: 'Español' },
  { code: 'de', native: 'Deutsch' },
  { code: 'zh', native: '中文' },
];

/** Locales whose every string is currently true. Add one back here only after re-reading its table. */
const VISIBLE: readonly Locale[] = ['en'];
export const visibleLocales = locales.filter((l) => VISIBLE.includes(l.code));

const isVisible = (s: string | null | undefined): s is Locale =>
  !!s && (VISIBLE as readonly string[]).includes(s);

type Dict = Record<string, string>;
const table = strings as Record<Locale, Dict>;

const STORAGE_KEY = 'vg-locale';

function detect(): Locale {
  if (typeof window === 'undefined') return 'en';
  try {
    const s = window.localStorage.getItem(STORAGE_KEY);
    if (isVisible(s)) return s;
  } catch {}
  const n = (navigator.language || 'en').slice(0, 2);
  return isVisible(n) ? n : 'en';
}

const Ctx = createContext<{ locale: Locale; setLocale: (l: Locale) => void; t: (k: string) => string }>({
  locale: 'en',
  setLocale: () => undefined,
  t: (k) => table.en[k] ?? k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => setLocaleState(detect()), []);
  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-Hans' : locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    if (!isVisible(l)) return;
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const t = useCallback((k: string) => table[locale][k] ?? table.en[k] ?? k, [locale]);

  return <Ctx.Provider value={{ locale, setLocale, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
