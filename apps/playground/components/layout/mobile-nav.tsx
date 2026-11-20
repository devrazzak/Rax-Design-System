'use client';

import { useState } from 'react';

import { siteConfig } from '@/config/site';
import { MenuIcon } from 'lucide-react';

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, IconButton, ScrollArea } from '@rax-ds/ui';

import { SidebarNav } from './sidebar-nav';

export function MobileNav() {
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <IconButton variant="ghost" size="sm" label="Open menu" tooltip={false} className="md:hidden">
                    <MenuIcon />
                </IconButton>
            </DrawerTrigger>
            {/* No description in this drawer, so tell Radix not to expect one */}
            <DrawerContent side="left" size="sm" aria-describedby={undefined}>
                <DrawerHeader>
                    <DrawerTitle>{siteConfig.name}</DrawerTitle>
                </DrawerHeader>
                <ScrollArea className="min-h-0 flex-1 px-2 pb-6">
                    <SidebarNav onNavigate={() => setOpen(false)} />
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}
