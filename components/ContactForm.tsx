'use client';

/**
 * ContactForm — the way to write to me.
 *
 * Posts JSON to this site's own /api/contact route. No third-party form
 * vendor. Includes a hidden honeypot field ("company") that bots fill and
 * humans never see. Failure states are explicit: a 503 means the mail
 * transport is not configured yet and the visitor is told to email directly.
 */

import { useState, type FormEvent } from 'react';
import { CONTACT_ENDPOINT, PERSON } from '@/lib/site';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'unconfigured';

const CONTEXTS = [
  ['writing', 'Something I wrote'],
  ['book', 'The books'],
  ['engineering', 'Engineering / work'],
  ['press', 'Press / podcast'],
  ['other', 'Something else'],
] as const;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') ?? ''),
          email: String(data.get('email') ?? ''),
          context: String(data.get('context') ?? 'other'),
          message: String(data.get('message') ?? ''),
          company: String(data.get('company') ?? ''),
        }),
      });
      if (res.ok) {
        form.reset();
        setStatus('sent');
      } else {
        setStatus(res.status === 503 ? 'unconfigured' : 'error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-ok" role="status">
        <h3>Received.</h3>
        <p>
          Your message is in. I read everything and reply from {PERSON.email} — usually within
          two working days (Europe/Berlin).
        </p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
      <div className="form-row">
        <label>
          Name
          <input name="name" type="text" required autoComplete="name" placeholder="Your name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
        </label>
      </div>
      <label>
        What is this about?
        <select name="context" defaultValue="other" required>
          {CONTEXTS.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>
      <label>
        Message
        <textarea name="message" required minLength={10} rows={6} placeholder="What would you like to talk about?" />
      </label>

      {/* Honeypot — hidden from humans and assistive tech, irresistible to bots. */}
      <div className="hp" aria-hidden="true">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button className="btn btn-dark" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>

      {status === 'error' && (
        <p className="form-err" role="alert">
          That didn’t go through. Email me directly: <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
        </p>
      )}
      {status === 'unconfigured' && (
        <p className="form-err" role="alert">
          The mail transport isn’t live yet. Email me directly:{' '}
          <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
        </p>
      )}
    </form>
  );
}
