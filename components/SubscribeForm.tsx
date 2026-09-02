'use client';

/**
 * SubscribeForm — one email when an essay ships.
 *
 * Posts to this site's own /api/subscribe route. There is one list and one
 * promise: a single message when something new is published here. Honeypot
 * included; no newsletter vendor.
 */

import { useState, type FormEvent } from 'react';
import { SUBSCRIBE_ENDPOINT } from '@/lib/site';

export default function SubscribeForm({
  placeholder = 'you@example.com',
  button = 'Tell me',
  ok = 'Done — one email when something ships.',
  err = 'That didn’t go through — try the contact page.',
}: {
  placeholder?: string;
  button?: string;
  ok?: string;
  err?: string;
}) {
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

  if (status === 'sent') return <p className="sub-ok" role="status">{ok}</p>;

  return (
    <form className="sub-form" onSubmit={onSubmit}>
      <input name="email" type="email" required placeholder={placeholder} autoComplete="email" aria-label="Email address" />
      <div className="hp" aria-hidden="true">
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? '…' : button}
      </button>
      {status === 'error' && <span className="form-err" role="alert">{err}</span>}
    </form>
  );
}
