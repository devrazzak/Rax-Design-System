'use client';

import { useState } from 'react';

import { Button, Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, Stack, Text } from '@rax-ds/ui';

export default function DrawerControlled() {
    const [open, setOpen] = useState(false);

    return (
        <Stack gap="sm" align="center">
            <Button
                variant="outline"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Open drawer
            </Button>
            <Text size="sm" color="muted">
                The drawer is {open ? 'open' : 'closed'}.
            </Text>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Notifications</DrawerTitle>
                        <DrawerDescription>You have no new notifications.</DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
        </Stack>
    );
}
