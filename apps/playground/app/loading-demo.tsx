'use client';

import { useState } from 'react';

import { Button } from '@rax-ds/ui';

/** Simulates a slow request, e.g. saving a form. */
function fakeRequest(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function LoadingDemo() {
    const [loading, setLoading] = useState(false);
    const [handledClicks, setHandledClicks] = useState(0);

    const handleClick = async () => {
        setHandledClicks(count => count + 1);
        setLoading(true);
        try {
            await fakeRequest(2000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <Button loading={loading} onClick={() => void handleClick()}>
                Save
            </Button>
            <span className="text-sm text-muted-foreground">Handled clicks: {handledClicks}</span>
        </div>
    );
}
