import { siteConfig } from '@/config/site';
import Link from 'next/link';

import { Container, IconButton, Row, Section } from '@rax-ds/ui';

import { GitHubIcon } from '@/components/icons/github-icon';
import { CommandMenu } from '@/components/search/command-menu';

import { MobileNav } from './mobile-nav';
import { ThemeToggle } from './theme-toggle';

export function SiteHeader() {
    return (
        <Section as="header" className="sticky top-0 z-40 border-b border-border">
            <Container size="full">
                <Row gap="md" className="h-14">
                    <MobileNav />
                    <Link href="/" className="font-semibold">
                        {siteConfig.name}
                    </Link>
                    {/* The design system has no nav component, so the native landmark wraps a Row */}
                    <nav aria-label="Main" className="hidden md:block">
                        <Row gap="md">
                            <Link
                                href="/docs"
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Docs
                            </Link>
                            <Link
                                href="/docs/components"
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Components
                            </Link>
                        </Row>
                    </nav>
                    <Row gap="sm" className="ml-auto">
                        <CommandMenu />
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
