import type { Badge as BadgeKind } from '@/content/types';

const CLASS: Record<BadgeKind, string> = {
  'IN REVISION': 'b-rev',
  RUNNABLE: 'b-run',
  'WEEKLY SLOT EMPTY': 'b-empty',
  'CLIENT BUILD': 'b-client',
  PARKED: 'b-parked',
  RESEARCH: 'b-research',
  SHIPPED: 'b-shipped',
};

/** The closed badge set, rendered as a small-caps stamp. */
export default function Badge({ kind }: { kind: BadgeKind }) {
  return <span className={`badge ${CLASS[kind]}`}>{kind}</span>;
}
