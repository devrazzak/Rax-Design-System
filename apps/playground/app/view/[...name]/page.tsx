import type { Metadata } from 'next';
import { examples, isExampleName } from '@/examples/registry';
import { notFound } from 'next/navigation';

import { Container, Row } from '@rax-ds/ui';

// Same reason as the docs route: dev-only validation simulates an unknown name, where this page calls notFound().
// Every example page is prerendered as static HTML.
export const instant = false;

// Full-page views are for trying an example, not for search results
export const metadata: Metadata = { robots: { index: false } };

export function generateStaticParams() {
    return Object.keys(examples).map(name => ({ name: name.split('/') }));
}

/** Renders one example on its own page, so layout examples can use the full width of the screen. */
export default async function ExampleViewPage({ params }: PageProps<'/view/[...name]'>) {
    const { name } = await params;
    const exampleName = name.join('/');

    if (!isExampleName(exampleName)) notFound();

    const { default: Example } = await examples[exampleName]();

    return (
        // The design system has no component for the main landmark, so the native element is used
        <main>
            <Container size="full">
                <Row justify="center" wrap className="min-h-[calc(100svh-3.5rem)] py-10">
                    <Example />
                </Row>
            </Container>
        </main>
    );
}
