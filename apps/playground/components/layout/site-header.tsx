import { siteConfig } from '@/config/site';
import { BlocksIcon } from 'lucide-react';
import Link from 'next/link';

import { Container, IconButton, Row, Section } from '@rax-ds/ui';

import { getSearchIndex } from '@/lib/search';
import { GitHubIcon } from '@/components/icons/github-icon';
import { CommandMenu } from '@/components/search/command-menu';

import { MainNav } from './main-nav';
import { MobileNav } from './mobile-nav';
import { ThemeToggle } from './theme-toggle';

export async function SiteHeader() {
    const searchIndex = await getSearchIndex();

    return (
        // Slightly see-through with a blur, so content scrolling under the sticky header stays readable
        <Section as="header" className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
            <Container size="full">
                <Row gap="md" className="h-14">
                    <MobileNav />
                    {/* On small screens only the mark shows, so the header fits; the label keeps the link's name */}
                    <Link
                        href="/"
                        aria-label={siteConfig.name}
                        className="flex items-center gap-2 font-semibold whitespace-nowrap"
                    >
                        <BlocksIcon aria-hidden="true" className="size-5 text-primary" />
                        <span className="hidden sm:inline">{siteConfig.name}</span>
                    </Link>
                    <MainNav />
                    <Row gap="sm" className="ml-auto">
                        <CommandMenu sections={searchIndex} />
                        <IconButton asChild variant="ghost" size="sm" label="GitHub">
                            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
                                <GitHubIcon className="size-5" />
                            </a>
                        </IconButton>
                        <ThemeToggle />
                    </Row>
                </Row>
            </Container>
        </Section>
    );
}
