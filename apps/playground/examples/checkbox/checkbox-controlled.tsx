'use client';

import { useState } from 'react';

import { Checkbox, Field, FieldLabel, Stack, Text } from '@rax-ds/ui';

export default function CheckboxControlled() {
    const [checked, setChecked] = useState(false);

    return (
        <Stack gap="sm">
            <Field orientation="horizontal">
                <Checkbox
                    id="checkbox-controlled-updates"
                    checked={checked}
                    onCheckedChange={value => {
                        setChecked(value === true);
                    }}
                />
                <FieldLabel htmlFor="checkbox-controlled-updates">Email me about updates</FieldLabel>
            </Field>
            <Text size="sm" color="muted">
                {checked ? 'Subscribed' : 'Not subscribed'}
            </Text>
        </Stack>
    );
}
