/**
 * mail.ts — the only outbound email path on this site.
 *
 * Uses the Resend REST API directly over fetch: no SDK, no extra dependency,
 * no third-party form vendor. One environment variable turns the entire
 * conversion layer on:
 *
 *   RESEND_API_KEY   required — https://resend.com → API Keys
 *   CONTACT_TO       optional — inbox for submissions (default: PERSON.email)
 *   CONTACT_FROM     optional — verified sender (default: onboarding@resend.dev,
 *                    which works immediately without domain verification)
 *
 * If RESEND_API_KEY is absent the route returns 503 and the UI tells the
 * visitor to email directly. It never fails silently and never pretends to
 * have delivered something it did not.
 */

import { PERSON } from './site';

export const mailConfigured = () => Boolean(process.env.RESEND_API_KEY);

type SendArgs = { subject: string; text: string; replyTo?: string };

export async function sendMail({ subject, text, replyTo }: SendArgs): Promise<{ ok: boolean; status: number; detail?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { ok: false, status: 503, detail: 'mail_not_configured' };

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'grimaldi.ca <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO || PERSON.email],
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (res.ok) return { ok: true, status: 200 };
  return { ok: false, status: 502, detail: `resend_${res.status}` };
}

/** Minimal, dependency-free field guards. */
export const isEmail = (v: unknown): v is string =>
  typeof v === 'string' && v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export const clean = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.replace(/\r\n/g, '\n').trim().slice(0, max) : '';
