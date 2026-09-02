import { NextResponse } from 'next/server';
import { clean, isEmail, sendMail } from '@/lib/mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * One list. The form promises one email when an essay ships, nothing else —
 * the `list` field is accepted for compatibility and always resolves to it.
 */
const LISTS = new Set(['general']);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'bad_json' }, { status: 400 });
  }

  if (clean(body.company, 100)) return NextResponse.json({ ok: true }, { status: 200 });

  const email = body.email;
  const listRaw = clean(body.list, 40);
  const list = LISTS.has(listRaw) ? listRaw : 'general';

  if (!isEmail(email)) return NextResponse.json({ error: 'invalid_email' }, { status: 422 });

  const result = await sendMail({
    subject: `[grimaldi.ca · subscribe:${list}] ${email}`,
    replyTo: email,
    text: [`Subscribe: ${list}`, `Email:    ${email}`, `Source:   grimaldi.ca`].join('\n'),
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.detail ?? 'send_failed' }, { status: result.status });
  }
  return NextResponse.json({ ok: true }, { status: 200 });
}
