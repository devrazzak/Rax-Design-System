import { docsNav } from '@/config/docs-nav';

import type { DocItem, DocSection } from '@/types/docs';

const allDocs: readonly DocItem[] = docsNav.flatMap(section => section.items);

export function getAllDocs(): readonly DocItem[] {
    return allDocs;
}

export function getDocBySlug(slug: string): DocItem | undefined {
    return allDocs.find(doc => doc.slug === slug);
}

export function getDocHref(slug: string): string {
    return slug === '' ? '/docs' : `/docs/${slug}`;
}

/** The pages before and after this one, in sidebar order. */
export function getPrevNext(slug: string): { prev?: DocItem; next?: DocItem } {
    const index = allDocs.findIndex(doc => doc.slug === slug);

    return { prev: allDocs[index - 1], next: allDocs[index + 1] };
}

/** The sidebar section a page belongs to, for the breadcrumb. */
export function getDocSection(slug: string): DocSection | undefined {
    return docsNav.find(section => section.items.some(doc => doc.slug === slug));
}
