import type { MDXContent } from 'mdx/types';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Heading, Row, ScrollArea, Section, Stack, Text } from '@rax-ds/ui';

import { getAllDocs, getDocBySlug } from '@/lib/docs';
import { getTableOfContents } from '@/lib/toc';
import { DocPager } from '@/components/layout/doc-pager';
import { TableOfContents } from '@/components/layout/table-of-contents';

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
        <Row align="start" gap="xl">
            <Section as="article" spacing="sm" className="max-w-3xl min-w-0 flex-1">
                <Section as="header" className="mb-10">
                    <Stack gap="sm">
                        <Heading as="h1" size="4xl">
                            {doc.title}
                        </Heading>
                        <Text size="lg" color="muted">
                            {doc.description}
                        </Text>
                    </Stack>
                </Section>
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
