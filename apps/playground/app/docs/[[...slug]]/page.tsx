import type { MDXContent } from 'mdx/types';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Row, ScrollArea, Section } from '@rax-ds/ui';

import { getAllDocs, getDocBySlug } from '@/lib/docs';
import { getTableOfContents } from '@/lib/toc';
import { DocHeader } from '@/components/layout/doc-header';
import { DocPager } from '@/components/layout/doc-pager';
import { TableOfContents } from '@/components/layout/table-of-contents';

// Dev-only instant validation also simulates a client navigation to an unknown slug, where this page calls
// notFound() and validation stops with an error. Every real docs page is prerendered as static HTML,
// so navigations are instant anyway; this opts the route out of that check.
export const instant = false;

// Every page in the docs config is prerendered at build time
export function generateStaticParams() {
    return getAllDocs().map(doc => ({ slug: doc.slug === '' ? [] : doc.slug.split('/') }));
}

export async function generateMetadata({ params }: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
    const { slug } = await params;
    const doc = getDocBySlug(slug?.join('/') ?? '');

    if (!doc) return {};

    return { title: doc.title, description: doc.description };
}

export default async function DocPage({ params }: PageProps<'/docs/[[...slug]]'>) {
    const { slug } = await params;
    const doc = getDocBySlug(slug?.join('/') ?? '');

    // With cacheComponents, `dynamicParams = false` is not allowed, so unknown paths are rejected here instead
    if (!doc) notFound();

    // The empty slug is the introduction, stored as index.mdx
    const file = doc.slug || 'index';
    const [{ default: Content }, toc] = await Promise.all([
        import(`@/content/docs/${file}.mdx`) as Promise<{ default: MDXContent }>,
        getTableOfContents(file),
    ]);

    return (
        // The article and the table of contents sit in the middle of the space next to the sidebar
        <Row align="start" justify="center" gap="xl">
            <Section as="article" spacing="sm" className="max-w-3xl min-w-0 flex-1">
                <DocHeader doc={doc} />
                <Content />
                <DocPager slug={doc.slug} />
            </Section>
            {/* Only on wide screens; smaller screens read the page top to bottom */}
            <Section
                as="aside"
                spacing="sm"
                className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-56 shrink-0 xl:block"
            >
                <ScrollArea className="h-full">
                    <TableOfContents items={toc} />
                </ScrollArea>
            </Section>
        </Row>
    );
}
