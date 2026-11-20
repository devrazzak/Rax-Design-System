'use client';

import { useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Stack, Text } from '@rax-ds/ui';

export default function SelectControlled() {
    const [status, setStatus] = useState('pending');

    return (
        <Stack className="w-full max-w-sm">
            <Select value={status} onValueChange={setStatus}>
                <SelectTrigger aria-label="Status">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
            </Select>
            <Text size="sm" color="muted">
                Selected value: {status}
            </Text>
        </Stack>
    );
}
