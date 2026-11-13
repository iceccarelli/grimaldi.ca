import type { MetadataRoute } from 'next';
import { SITE_DESCRIPTION } from '@/lib/site';

export const dynamic = 'force-static';

/** Web app manifest for the personal engineering surface. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'grimaldi.ca — Personal engineering surface',
    short_name: 'grimaldi.ca',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#F3EFE7',
    theme_color: '#2F5D50',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
