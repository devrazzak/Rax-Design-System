import { siteConfig } from '@/config/site';
import Link from 'next/link';

import { Container, IconButton } from '@rax-ds/ui';

import { GitHubIcon } from '@/components/icons/github-icon';

import { MobileNav } from './mobile-nav';
import { ThemeToggle } from './theme-toggle';

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-40 border-b border-border bg-background">
            <Container className="flex h-14 items-center gap-4">
                <MobileNav />
                <Link href="/" className="font-semibold">
                    {siteConfig.name}
                </Link>
                <nav aria-label="Main" className="hidden items-center gap-4 text-sm md:flex">
                    <Link href="/docs" className="text-muted-foreground transition-colors hover:text-foreground">
                        Docs
                    </Link>
                </nav>
                <div className="ml-auto flex items-center gap-1">
                    <IconButton asChild variant="ghost" size="sm" label="GitHub">
                        <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
                            <GitHubIcon className="size-5" />
                        </a>
                    </IconButton>
                    <ThemeToggle />
                </div>
            </Container>
        </header>
    );
}
