'use client';

/**
 * Subscribe — one field, honest copy, mailto fallback.
 *
 * Posts to the existing first-party /api/subscribe route (list: 'general').
 * If that route is unarmed (no RESEND_API_KEY → 503) or unreachable, the form
 * does not pretend: it shows the mailto link so the visitor can still
 * subscribe by sending one email.
 */

import { useState, type FormEvent } from 'react';
import { PERSON, SUBSCRIBE_ENDPOINT } from '@/lib/site';

export const SUBSCRIBE_MAILTO = `mailto:${PERSON.email}?subject=Subscribe%20grimaldi.ca`;

export default function SubscribeForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus('sending');
    try {
      const res = await fetch(SUBSCRIBE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: String(data.get('email') ?? ''),
          company: String(data.get('company') ?? ''),
          list: 'general',
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return <p className="wl-ok" role="status">On the list. One email a month, when there is something to say.</p>;
  }

  return (
    <form className={compact ? 'sub-form compact' : 'sub-form'} onSubmit={onSubmit}>
      <label className="sub-label" htmlFor="sub-email">One email, once a month. No list-spam.</label>
      <div className="sub-row">
        <input id="sub-email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
        <div className="hp" aria-hidden="true">
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <button className="btn btn-dark" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? '…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p className="form-err" role="alert">
          The form is not armed on this deployment. <a href={SUBSCRIBE_MAILTO}>Subscribe by email instead →</a>
        </p>
      )}
    </form>
  );
}
