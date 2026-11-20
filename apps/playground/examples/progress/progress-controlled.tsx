'use client';

import { useState } from 'react';

import { Button, Progress, Row, Stack, Text } from '@rax-ds/ui';

export default function ProgressControlled() {
    const [value, setValue] = useState(30);

    return (
        <Stack gap="md" className="w-full max-w-sm">
            <Progress value={value} aria-label="Upload progress" />
            <Text size="sm" color="muted">
                {value}% uploaded
            </Text>
            <Row gap="sm">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        setValue(current => Math.max(current - 10, 0));
                    }}
                >
                    Less
                </Button>
                <Button
                    size="sm"
                    onClick={() => {
                        setValue(current => Math.min(current + 10, 100));
                    }}
                >
                    More
                </Button>
            </Row>
        </Stack>
    );
}
