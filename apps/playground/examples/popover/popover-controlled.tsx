'use client';

import { useState } from 'react';

import { Button, Popover, PopoverContent, PopoverDescription, PopoverTrigger, Stack, Text } from '@rax-ds/ui';

export default function PopoverControlled() {
    const [open, setOpen] = useState(false);

    return (
        <Stack gap="sm" align="center">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline">Help</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverDescription>Press Escape or click outside to close this panel.</PopoverDescription>
                    <Button
                        size="sm"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Got it
                    </Button>
                </PopoverContent>
            </Popover>
            <Text size="sm" color="muted">
                The popover is {open ? 'open' : 'closed'}.
            </Text>
        </Stack>
    );
}
