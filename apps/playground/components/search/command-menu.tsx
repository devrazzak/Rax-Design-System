'use client';

import { useEffect, useState } from 'react';

import { Command } from 'cmdk';
import { HashIcon, SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button, Dialog, DialogContent, DialogTitle } from '@rax-ds/ui';

import type { SearchSection } from '@/types/docs';

const groupHeadingClassName =
    '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground';
const itemClassName =
    'flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm data-[selected=true]:bg-muted [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground';

// Plain text matching instead of cmdk's fuzzy default, which matches scattered letters ("loading" found "Installation").
// A match in the title ranks above a match in the keywords (section and description).
function filterItems(value: string, search: string, keywords?: string[]) {
    const query = search.trim().toLowerCase();
    if (value.toLowerCase().includes(query)) return 1;
    return keywords?.some(keyword => keyword.toLowerCase().includes(query)) ? 0.5 : 0;
}

interface CommandMenuProps {
    sections: readonly SearchSection[];
}

export function CommandMenu({ sections }: CommandMenuProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const router = useRouter();

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                setOpen(current => !current);
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);

    const goTo = (href: string) => {
        setOpen(false);
        setSearch('');
        router.push(href);
    };

    return (
        <>
            <Button
                variant="surface"
                size="sm"
                aria-label="Search documentation"
                onClick={() => setOpen(true)}
                className="text-muted-foreground"
            >
                <SearchIcon data-icon="inline-start" />
                {/* Icon only on small screens, so the header fits */}
                <span className="hidden sm:inline">Search</span>
                <kbd className="ml-4 hidden font-mono text-xs md:inline">⌘K</kbd>
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                {/* No description here, so tell Radix not to expect one */}
                <DialogContent
                    showCloseButton={false}
                    className="gap-0 overflow-hidden p-0"
                    aria-describedby={undefined}
                >
                    <DialogTitle className="sr-only">Search documentation</DialogTitle>
                    {/* cmdk renders its own input and listbox with keyboard support, so DS Input is not used here */}
                    <Command label="Search documentation" filter={filterItems}>
                        <Command.Input
                            value={search}
                            onValueChange={setSearch}
                            placeholder="Search docs..."
                            className="h-12 w-full border-b border-border bg-transparent px-4 text-base outline-none placeholder:text-muted-foreground"
                        />
                        <Command.List className="max-h-80 overflow-y-auto p-2">
                            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                                No results found.
                            </Command.Empty>
                            {sections.map(section => (
                                <Command.Group
                                    key={section.title}
                                    heading={section.title}
                                    className={groupHeadingClassName}
                                >
                                    {section.items.map(item => (
                                        <Command.Item
                                            key={item.href}
                                            value={item.title}
                                            keywords={[section.title, item.description]}
                                            onSelect={() => goTo(item.href)}
                                            className={itemClassName}
                                        >
                                            {item.title}
                                        </Command.Item>
                                    ))}
                                </Command.Group>
                            ))}
                            {/* Headings only appear while typing, otherwise the list would be hundreds of items long */}
                            {search && (
                                <Command.Group heading="On the page" className={groupHeadingClassName}>
                                    {sections.flatMap(section =>
                                        section.items.flatMap(item =>
                                            item.headings.map(heading => (
                                                <Command.Item
                                                    key={heading.href}
                                                    value={`${item.title} ${heading.title}`}
                                                    onSelect={() => goTo(heading.href)}
                                                    className={itemClassName}
                                                >
                                                    <HashIcon aria-hidden="true" />
                                                    {heading.title}
                                                    <span className="ml-auto text-xs text-muted-foreground">
                                                        {item.title}
                                                    </span>
                                                </Command.Item>
                                            )),
                                        ),
                                    )}
                                </Command.Group>
                            )}
                        </Command.List>
                    </Command>
                </DialogContent>
            </Dialog>
        </>
    );
}
