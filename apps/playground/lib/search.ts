import { docsNav } from '@/config/docs-nav';

import type { SearchSection } from '@/types/docs';
import { getDocHref } from '@/lib/docs';
import { getTableOfContents } from '@/lib/toc';

/** Every page and its headings, built once at build time for the command menu. */
export async function getSearchIndex(): Promise<SearchSection[]> {
    'use cache';

    return Promise.all(
        docsNav.map(async section => ({
            title: section.title,
            items: await Promise.all(
                section.items.map(async doc => {
                    const href = getDocHref(doc.slug);
                    const toc = await getTableOfContents(doc.slug || 'index');

                    return {
                        title: doc.title,
                        description: doc.description,
                        href,
                        headings: toc.map(heading => ({ title: heading.title, href: `${href}#${heading.id}` })),
                    };
                }),
            ),
        })),
    );
}
