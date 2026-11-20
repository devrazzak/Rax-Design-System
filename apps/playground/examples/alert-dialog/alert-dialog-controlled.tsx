'use client';

import { useState } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button,
    Stack,
    Text,
} from '@rax-ds/ui';

export default function AlertDialogControlled() {
    const [deleted, setDeleted] = useState(false);

    return (
        <Stack gap="sm" align="center">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={deleted}>
                        Delete account
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                        <AlertDialogDescription>All your data will be removed.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            variant="destructive"
                            onClick={() => {
                                setDeleted(true);
                            }}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Text size="sm" color="muted">
                {deleted ? 'The account was deleted.' : 'The account is active.'}
            </Text>
        </Stack>
    );
}
