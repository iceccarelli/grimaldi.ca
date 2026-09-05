import type { MetadataRoute } from 'next';
import { CLUSTER, SITE_DESCRIPTION } from '@/lib/site';

export const dynamic = 'force-static';

/** Web app manifest — lets the control room be installed as a standalone window. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `grimaldi.ca — ${CLUSTER.short} control room`,
    short_name: 'Ops control room',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#F3EFE7',
    theme_color: '#2F5D50',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
