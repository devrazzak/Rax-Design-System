import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

import { getAllDocs, getDocHref } from '@/lib/docs';

export default function sitemap(): MetadataRoute.Sitemap {
    return [{ url: siteConfig.url }, ...getAllDocs().map(doc => ({ url: `${siteConfig.url}${getDocHref(doc.slug)}` }))];
}
