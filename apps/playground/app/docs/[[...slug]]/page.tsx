import type { MDXContent } from 'mdx/types';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Heading, Section, Stack, Text } from '@rax-ds/ui';

import { getAllDocs, getDocBySlug } from '@/lib/docs';

// Only pages listed in the docs config exist. Any other URL is a 404 instead of a runtime render.
export const dynamicParams = false;

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

    if (!doc) notFound();

    // The empty slug is the introduction, stored as index.mdx
    const { default: Content } = (await import(`@/content/docs/${doc.slug || 'index'}.mdx`)) as {
        default: MDXContent;
    };

    return (
        <Section as="article" spacing="sm" className="max-w-3xl">
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
        </Section>
    );
}
