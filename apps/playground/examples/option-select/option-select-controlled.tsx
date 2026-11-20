'use client';

import { useState } from 'react';

import { OptionSelect, Stack, Text } from '@rax-ds/ui';

const options = [
    { value: '1', label: 'Standard shipping' },
    { value: '2', label: 'Express shipping' },
    { value: '3', label: 'Pick up in store' },
];

export default function OptionSelectControlled() {
    const [value, setValue] = useState('1');

    return (
        <Stack className="w-full max-w-sm">
            <OptionSelect options={options} value={value} onValueChange={setValue} aria-label="Delivery method" />
            <Text size="sm" color="muted">
                Selected value: {value}
            </Text>
        </Stack>
    );
}
