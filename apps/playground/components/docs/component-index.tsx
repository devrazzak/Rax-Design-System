import { docsNav } from '@/config/docs-nav';
import Link from 'next/link';

import { Card, CardDescription, CardHeader, CardTitle, Grid, Heading, Stack } from '@rax-ds/ui';

import { getDocHref } from '@/lib/docs';

/** Lists every component page from the docs config, so a new page shows up here without any change. */
export function ComponentIndex() {
    const sections = docsNav.filter(section => section.items.some(item => item.slug.startsWith('components/')));

    return (
        <Stack gap="xl" className="my-8">
            {sections.map(section => (
                <Stack key={section.title} gap="md">
                    <Heading as="h2" size="2xl">
                        {section.title}
                    </Heading>
                    <Grid columns={{ base: 1, sm: 2, lg: 3 }}>
                        {section.items
                            .filter(item => item.slug.startsWith('components/'))
                            .map(item => (
                                <Link key={item.slug} href={getDocHref(item.slug)} className="rounded-xl">
                                    <Card className="h-full transition-colors hover:bg-muted">
                                        <CardHeader>
                                            <CardTitle>{item.title}</CardTitle>
                                            <CardDescription>{item.description}</CardDescription>
                                        </CardHeader>
                                    </Card>
                                </Link>
                            ))}
                    </Grid>
                </Stack>
            ))}
        </Stack>
    );
}
