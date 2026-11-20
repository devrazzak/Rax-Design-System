'use client';

import { useState } from 'react';

import { Field, FieldLabel, RadioGroup, RadioGroupItem, Stack, Text } from '@rax-ds/ui';

export default function RadioGroupControlled() {
    const [value, setValue] = useState('standard');

    return (
        <Stack gap="md">
            <RadioGroup value={value} onValueChange={setValue} aria-label="Delivery method">
                <Field orientation="horizontal">
                    <RadioGroupItem value="standard" id="radio-group-controlled-standard" />
                    <FieldLabel htmlFor="radio-group-controlled-standard">Standard shipping</FieldLabel>
                </Field>
                <Field orientation="horizontal">
                    <RadioGroupItem value="express" id="radio-group-controlled-express" />
                    <FieldLabel htmlFor="radio-group-controlled-express">Express shipping</FieldLabel>
                </Field>
            </RadioGroup>
            <Text size="sm" color="muted">
                Selected value: {value}
            </Text>
        </Stack>
    );
}
