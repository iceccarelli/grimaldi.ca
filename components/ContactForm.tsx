'use client';

/**
 * ContactForm — the primary conversion path.
 *
 * Posts JSON to FORM_ENDPOINT (Formspree). Until the endpoint is configured
 * in lib/site.ts, submission degrades to a prefilled email draft so no lead
 * is ever dropped — but wire the real endpoint immediately (0–48h checklist).
 */

import { useState, type FormEvent } from 'react';
import { FORM_ENDPOINT, PERSON, formConfigured } from '@/lib/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const CONTEXTS = [
  ['hiring', 'Hiring / role'],
  ['advisory', 'Advisory / consulting'],
  ['book', 'The books'],
  ['press', 'Press / podcast'],
  ['other', 'Something else'],
] as const;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      context: String(data.get('context') ?? 'other'),
      message: String(data.get('message') ?? ''),
    };

    if (!formConfigured()) {
      // Graceful degradation until Formspree is wired: open a prefilled draft.
      const subject = encodeURIComponent(`[grimaldi.ca · ${payload.context}] ${payload.name}`);
      const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} <${payload.email}>`);
      window.location.href = `mailto:${PERSON.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-ok" role="status">
        <h3>Received.</h3>
        <p>Your message is in. I read everything and reply from {PERSON.email} — usually within two working days (Europe/Berlin).</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
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
        <select name="context" defaultValue="hiring" required>
          {CONTEXTS.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>
      <label>
        Message
        <textarea name="message" required rows={6} placeholder="What are you building, hiring for, or writing about?" />
      </label>
      <button className="btn btn-dark" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      {status === 'error' && (
        <p className="form-err" role="alert">
          The form backend didn’t answer. Email me directly: <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
        </p>
      )}
    </form>
  );
}
