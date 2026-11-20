'use client';

import { docsNav } from '@/config/docs-nav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn, Heading, List, ListItem, Stack } from '@rax-ds/ui';

import { getDocHref } from '@/lib/docs';

interface SidebarNavProps {
    /** Called after a link is clicked, so the mobile drawer can close. */
    onNavigate?: () => void;
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
    const pathname = usePathname();

    return (
        // The design system has no nav component, so the native landmark wraps a Stack
        <nav aria-label="Docs">
            <Stack gap="lg">
                {docsNav.map(section => (
                    <Stack key={section.title} gap="sm">
                        <Heading as="h2" size="sm" className="px-2">
                            {section.title}
                        </Heading>
                        <List marker="none" gap="xs">
                            {section.items.map(item => {
                                const href = getDocHref(item.slug);
                                const isActive = pathname === href;

                                return (
                                    <ListItem key={href}>
                                        <Link
                                            href={href}
                                            aria-current={isActive ? 'page' : undefined}
                                            onClick={onNavigate}
                                            className={cn(
                                                'block rounded-md px-2 py-1 text-sm transition-colors',
                                                isActive
                                                    ? 'bg-muted font-medium text-foreground'
                                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Stack>
                ))}
            </Stack>
        </nav>
    );
}
