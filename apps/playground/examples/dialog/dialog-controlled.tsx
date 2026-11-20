'use client';

import { useState } from 'react';

import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Stack,
    Text,
} from '@rax-ds/ui';

export default function DialogControlled() {
    const [open, setOpen] = useState(false);

    return (
        <Stack gap="sm" align="center">
            <Button
                variant="outline"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Open dialog
            </Button>
            <Text size="sm" color="muted">
                The dialog is {open ? 'open' : 'closed'}.
            </Text>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent size="sm">
                    <DialogHeader>
                        <DialogTitle>Export report</DialogTitle>
                        <DialogDescription>The report is ready to download.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            Download
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Stack>
    );
}
