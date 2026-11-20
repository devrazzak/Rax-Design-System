import { siteConfig } from '@/config/site';
import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Button,
    Heading,
    Row,
    Section,
    Stack,
    Text,
} from '@rax-ds/ui';

import type { DocItem } from '@/types/docs';
import { getDocSection } from '@/lib/docs';
import { GitHubIcon } from '@/components/icons/github-icon';

export function DocHeader({ doc }: { doc: DocItem }) {
    const section = getDocSection(doc.slug);
    // Component pages link to their source file, which follows the packages/ui/src/components/<name>/<name>.tsx layout
    const componentName = doc.slug.startsWith('components/') ? doc.slug.replace('components/', '') : undefined;

    return (
        <Section as="header" className="mb-10">
            <Stack gap="md">
                {doc.slug !== '' && (
                    <Breadcrumb size="sm">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/docs">Docs</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {section && (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>{section.title}</BreadcrumbItem>
                                </>
                            )}
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{doc.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                )}
                <Stack gap="sm">
                    <Heading as="h1" size="4xl">
                        {doc.title}
                    </Heading>
                    <Text size="lg" color="muted">
                        {doc.description}
                    </Text>
                </Stack>
                {componentName && (
                    <Row gap="sm" wrap>
                        <Button asChild variant="surface" size="xs">
                            <a
                                href={`${siteConfig.links.github}/blob/main/packages/ui/src/components/${componentName}/${componentName}.tsx`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <GitHubIcon data-icon="inline-start" />
                                Source
                            </a>
                        </Button>
                        {doc.radix && (
                            <Button asChild variant="surface" size="xs">
                                <a
                                    href={`https://www.radix-ui.com/primitives/docs/components/${doc.radix}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Radix UI
                                    <ArrowUpRightIcon data-icon="inline-end" />
                                </a>
                            </Button>
                        )}
                    </Row>
                )}
            </Stack>
        </Section>
    );
}
