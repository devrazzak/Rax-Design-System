import type { ReactNode } from 'react';

import { Container, Row, ScrollArea, Section } from '@rax-ds/ui';

import { SidebarNav } from '@/components/layout/sidebar-nav';

export default function DocsLayout({ children }: { children: ReactNode }) {
    return (
        <Container size="full">
            <Row align="start" gap="xl">
                {/* Below md the sidebar lives in the mobile drawer instead */}
                <Section
                    as="aside"
                    spacing="sm"
                    className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-56 shrink-0 md:block"
                >
                    <ScrollArea className="h-full pr-4">
                        <SidebarNav />
                    </ScrollArea>
                </Section>
                {/* The design system has no component for the main landmark, so the native element is used */}
                <main className="min-w-0 flex-1">{children}</main>
            </Row>
        </Container>
    );
}
