'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn, Row } from '@rax-ds/ui';

const links = [
    { href: '/docs', label: 'Docs' },
    { href: '/docs/components', label: 'Components' },
];

export function MainNav() {
    const pathname = usePathname();
    // Component pages belong to "Components"; every other docs page belongs to "Docs"
    const activeHref = pathname.startsWith('/docs/components')
        ? '/docs/components'
        : pathname.startsWith('/docs')
          ? '/docs'
          : null;

    return (
        // The design system has no nav component, so the native landmark wraps a Row
        <nav aria-label="Main" className="hidden md:block">
            <Row gap="lg">
                {links.map(link => (
                    <Link
                        key={link.href}
                        href={link.href}
                        aria-current={link.href === activeHref ? 'page' : undefined}
                        className={cn(
                            'text-sm transition-colors hover:text-foreground',
                            link.href === activeHref ? 'font-medium text-foreground' : 'text-muted-foreground',
                        )}
                    >
                        {link.label}
                    </Link>
                ))}
            </Row>
        </nav>
    );
}
