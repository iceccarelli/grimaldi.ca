'use client';

/**
 * WaitlistForm — email capture for the books/blog waitlist.
 *
 * Posts to the Buttondown embed-subscribe endpoint configured in lib/site.ts.
 * Until NEWSLETTER_ACTION is set, it routes the visitor to /contact/ instead
 * of silently failing — never a dead mailto.
 */

import { useState, type FormEvent } from 'react';
import { NEWSLETTER_ACTION, newsletterConfigured } from '@/lib/site';

export default function WaitlistForm({
  placeholder,
  button,
  ok,
  err,
}: {
  placeholder: string;
  button: string;
  ok: string;
  err: string;
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('email') ?? '');
    if (!newsletterConfigured()) {
      window.location.href = `/contact/?waitlist=${encodeURIComponent(email)}`;
      return;
    }
    setStatus('sending');
    try {
      const body = new URLSearchParams({ email });
      const res = await fetch(NEWSLETTER_ACTION, { method: 'POST', body });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') return <p className="wl-ok" role="status">{ok}</p>;

  return (
    <form className="wl-form" onSubmit={onSubmit}>
      <input name="email" type="email" required placeholder={placeholder} autoComplete="email" aria-label={placeholder} />
      <button className="btn btn-dark" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? '…' : button}
      </button>
      {status === 'error' && <span className="form-err" role="alert">{err}</span>}
    </form>
  );
}
