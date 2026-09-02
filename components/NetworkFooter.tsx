import { HIRE_LINE, NETWORK_LINES } from '@/content/network';

/** Four lines. Footer only. The hire link is a text link, never a button. */
export default function NetworkFooter() {
  return (
    <div className="netfoot">
      {NETWORK_LINES.map((n) => (
        <p key={n.host}>
          <a href={n.href} {...(n.host.startsWith('github') ? { rel: 'noopener noreferrer' } : {})}>{n.host}</a>
          <span> — {n.line}</span>
        </p>
      ))}
      <p className="hire">
        <a href={HIRE_LINE.href}>{HIRE_LINE.label} →</a>
      </p>
    </div>
  );
}
