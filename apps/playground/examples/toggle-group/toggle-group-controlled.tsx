'use client';

import { useState } from 'react';

import { Stack, Text, ToggleGroup, ToggleGroupItem } from '@rax-ds/ui';

export default function ToggleGroupControlled() {
    const [value, setValue] = useState('week');

    return (
        <Stack gap="sm" align="center">
            <ToggleGroup
                type="single"
                variant="outline"
                value={value}
                onValueChange={next => {
                    // An empty string means the pressed item was clicked again
                    if (next) setValue(next);
                }}
                aria-label="Range"
            >
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="week">Week</ToggleGroupItem>
                <ToggleGroupItem value="month">Month</ToggleGroupItem>
            </ToggleGroup>
            <Text size="sm" color="muted">
                Selected range: {value}
            </Text>
        </Stack>
    );
}
