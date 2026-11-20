'use client';

import { useState } from 'react';

import { Field, FieldLabel, Stack, Switch, Text } from '@rax-ds/ui';

export default function SwitchControlled() {
    const [enabled, setEnabled] = useState(false);

    return (
        <Stack gap="sm">
            <Field orientation="horizontal">
                <Switch id="switch-controlled-airplane" checked={enabled} onCheckedChange={setEnabled} />
                <FieldLabel htmlFor="switch-controlled-airplane">Airplane mode</FieldLabel>
            </Field>
            <Text size="sm" color="muted">
                {enabled ? 'On' : 'Off'}
            </Text>
        </Stack>
    );
}
