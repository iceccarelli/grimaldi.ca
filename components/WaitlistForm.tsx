'use client';

/**
 * WaitlistForm — email capture for the books and the first post.
 *
 * Posts to this site's own /api/subscribe route with a list key, so the
 * Renewables Migration list and the Orbital Roadmap list stay distinguishable
 * from day one. Honeypot included. No newsletter vendor account required.
 */

import { useState, type FormEvent } from 'react';
import { SUBSCRIBE_ENDPOINT } from '@/lib/site';

export default function WaitlistForm({
  list = 'general',
  placeholder,
  button,
  ok,
  err,
}: {
  list?: 'renewables-migration' | 'orbital-roadmap' | 'general';
  placeholder: string;
  button: string;
  ok: string;
  err: string;
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
          list,
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') return <p className="wl-ok" role="status">{ok}</p>;

  return (
    <form className="wl-form" onSubmit={onSubmit}>
      <input name="email" type="email" required placeholder={placeholder} autoComplete="email" aria-label={placeholder} />
      <div className="hp" aria-hidden="true">
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="btn btn-dark" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? '…' : button}
      </button>
      {status === 'error' && <span className="form-err" role="alert">{err}</span>}
    </form>
  );
}
