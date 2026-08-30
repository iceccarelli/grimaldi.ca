import { NextResponse } from 'next/server';
import { clean, isEmail, sendMail } from '@/lib/mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CONTEXTS = new Set(['hiring', 'advisory', 'book', 'press', 'other']);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  // Honeypot: real visitors never fill a field they cannot see.
  if (clean(body.company, 100)) return NextResponse.json({ ok: true }, { status: 200 });

  const name = clean(body.name, 120);
  const email = body.email;
  const context = clean(body.context, 20);
  const message = clean(body.message, 5000);

  if (!name || !isEmail(email) || !message || message.length < 10) {
    return NextResponse.json({ error: 'invalid_fields' }, { status: 422 });
  }

  const result = await sendMail({
    subject: `[grimaldi.ca · ${CONTEXTS.has(context) ? context : 'other'}] ${name}`,
    replyTo: email,
    text: [
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Context: ${CONTEXTS.has(context) ? context : 'other'}`,
      `Source:  grimaldi.ca/contact/`,
      '',
      message,
    ].join('\n'),
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.detail ?? 'send_failed' }, { status: result.status });
  }
  return NextResponse.json({ ok: true }, { status: 200 });
}
