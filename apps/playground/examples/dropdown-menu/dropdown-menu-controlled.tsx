'use client';

import { useState } from 'react';

import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Stack,
    Text,
} from '@rax-ds/ui';

export default function DropdownMenuControlled() {
    const [open, setOpen] = useState(false);
    const [last, setLast] = useState('Nothing yet');

    return (
        <Stack gap="sm" align="center">
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        onSelect={() => {
                            setLast('Edit');
                        }}
                    >
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={() => {
                            setLast('Duplicate');
                        }}
                    >
                        Duplicate
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Text size="sm" color="muted">
                Menu {open ? 'open' : 'closed'}. Last action: {last}
            </Text>
        </Stack>
    );
}
