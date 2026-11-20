'use client';

import { useState } from 'react';

import { BoldIcon } from 'lucide-react';

import { Stack, Text, Toggle } from '@rax-ds/ui';

export default function ToggleControlled() {
    const [pressed, setPressed] = useState(false);

    return (
        <Stack gap="sm" align="center">
            <Toggle variant="outline" pressed={pressed} onPressedChange={setPressed} aria-label="Toggle bold">
                <BoldIcon />
            </Toggle>
            <Text size="sm" color="muted">
                {pressed ? 'Bold on' : 'Bold off'}
            </Text>
        </Stack>
    );
}
