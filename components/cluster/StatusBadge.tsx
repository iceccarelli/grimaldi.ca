import type { RepoStatus } from '@/content/cluster';

/**
 * The six constitutional statuses as a badge. Colour never carries the
 * meaning alone: the text is the status. Server component.
 */
export default function StatusBadge({ status }: { status: RepoStatus }) {
  return <span className={`cr-status cr-status--${status.toLowerCase()}`}>{status}</span>;
}
