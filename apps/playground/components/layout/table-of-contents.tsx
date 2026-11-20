'use client';

import { useEffect, useState } from 'react';

import { cn, List, ListItem, Stack, Text } from '@rax-ds/ui';

import type { TocItem } from '@/types/docs';

interface TableOfContentsProps {
    items: readonly TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>();

    useEffect(() => {
        const headings = items
            .map(item => document.getElementById(item.id))
            .filter((heading): heading is HTMLElement => heading !== null);

        // A heading becomes active when it enters the top 30% of the screen
        const observer = new IntersectionObserver(
            entries => {
                const visible = entries.find(entry => entry.isIntersecting);
                if (visible) setActiveId(visible.target.id);
            },
            { rootMargin: '0px 0px -70% 0px' },
        );

        headings.forEach(heading => observer.observe(heading));

        return () => observer.disconnect();
    }, [items]);

    if (items.length === 0) return null;

    return (
        // The design system has no nav component, so the native landmark wraps a Stack
        <nav aria-label="On this page">
            <Stack gap="sm">
                <Text size="sm" weight="semibold">
                    On this page
                </Text>
                <List marker="none" gap="xs">
                    {items.map(item => (
                        <ListItem key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={cn(
                                    'block py-0.5 text-sm transition-colors hover:text-foreground',
                                    item.level === 3 && 'pl-3',
                                    item.id === activeId ? 'font-medium text-foreground' : 'text-muted-foreground',
                                )}
                            >
                                {item.title}
                            </a>
                        </ListItem>
                    ))}
                </List>
            </Stack>
        </nav>
    );
}
