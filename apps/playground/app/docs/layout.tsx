import type { ReactNode } from 'react';

import { Container, ScrollArea } from '@rax-ds/ui';

import { SidebarNav } from '@/components/layout/sidebar-nav';

export default function DocsLayout({ children }: { children: ReactNode }) {
    return (
        <Container className="flex gap-10">
            {/* Below md the sidebar lives in the mobile drawer instead */}
            <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-56 shrink-0 md:block">
                <ScrollArea className="h-full">
                    <div className="py-8 pr-4">
                        <SidebarNav />
                    </div>
                </ScrollArea>
            </aside>
            <main className="min-w-0 flex-1 py-8">{children}</main>
        </Container>
    );
}
