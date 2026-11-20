'use client';

import { useState } from 'react';

import { Button, Skeleton, Stack, Text } from '@rax-ds/ui';

export default function SkeletonLoaded() {
    const [loading, setLoading] = useState(true);

    return (
        <Stack gap="md" align="start" className="w-full max-w-sm">
            {loading ? (
                <Stack gap="sm" className="w-full">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                </Stack>
            ) : (
                <Stack gap="sm">
                    <Text weight="semibold">Recent orders</Text>
                    <Text color="muted">You have 3 new orders today.</Text>
                </Stack>
            )}
            <Button
                variant="outline"
                size="sm"
                onClick={() => {
                    setLoading(current => !current);
                }}
            >
                {loading ? 'Show content' : 'Show skeleton'}
            </Button>
        </Stack>
    );
}
