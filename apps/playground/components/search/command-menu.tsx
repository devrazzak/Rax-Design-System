'use client';

import { useEffect, useState } from 'react';

import { docsNav } from '@/config/docs-nav';
import { Command } from 'cmdk';
import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button, Dialog, DialogContent, DialogTitle } from '@rax-ds/ui';

import { getDocHref } from '@/lib/docs';

export function CommandMenu() {
    const [open, setOpen] = useState(false);
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
                    <Command label="Search documentation">
                        <Command.Input
                            placeholder="Search docs..."
                            className="h-12 w-full border-b border-border bg-transparent px-4 text-base outline-none placeholder:text-muted-foreground"
                        />
                        <Command.List className="max-h-80 overflow-y-auto p-2">
                            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                                No results found.
                            </Command.Empty>
                            {docsNav.map(section => (
                                <Command.Group
                                    key={section.title}
                                    heading={section.title}
                                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
                                >
                                    {section.items.map(item => (
                                        <Command.Item
                                            key={item.slug}
                                            value={item.title}
                                            keywords={[section.title, item.description]}
                                            onSelect={() => goTo(getDocHref(item.slug))}
                                            className="cursor-pointer rounded-md px-2 py-2 text-sm data-[selected=true]:bg-muted"
                                        >
                                            {item.title}
                                        </Command.Item>
                                    ))}
                                </Command.Group>
                            ))}
                        </Command.List>
                    </Command>
                </DialogContent>
            </Dialog>
        </>
    );
}
