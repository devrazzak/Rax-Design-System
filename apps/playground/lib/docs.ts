import { docsNav } from '@/config/docs-nav';

import type { DocItem } from '@/types/docs';

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
