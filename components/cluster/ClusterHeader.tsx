import type { ReactNode } from 'react';
import JsonLd from '@/components/JsonLd';
import ClusterNav from '@/components/cluster/ClusterNav';
import { breadcrumbs, collectionPage } from '@/lib/schema';
import { CLUSTER } from '@/lib/site';

/**
 * The head of every control-room section: kicker, H1, intro, breadcrumb and
 * CollectionPage structured data, then the section navigation. Server component.
 */
export default function ClusterHeader({
  path,
  title,
  kicker,
  intro,
  parts,
  children,
}: {
  path: string;
  title: string;
  kicker?: string;
  intro: string;
  parts?: unknown[];
  children?: ReactNode;
}) {
  return (
    <>
      <JsonLd data={collectionPage({ path, name: title, description: intro, parts })} />
      <JsonLd data={breadcrumbs([{ name: 'Cluster', path: '/cluster/' }, ...(path === '/cluster/' ? [] : [{ name: title, path }])])} />
      <header className="cr-head">
        <span className="kicker">{kicker ?? `${CLUSTER.agent} · ${CLUSTER.short}`}</span>
        <h1 className="page-title" style={{ margin: '.2rem 0 .4rem' }}>{title}</h1>
        <p className="cr-lead">{intro}</p>
        {children}
      </header>
      <ClusterNav current={path} />
    </>
  );
}
