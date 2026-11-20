import { Checkbox, Field, FieldLabel, Stack } from '@rax-ds/ui';

export default function CheckboxDisabled() {
    return (
        <Stack gap="sm">
            <Field orientation="horizontal">
                <Checkbox id="checkbox-disabled-off" disabled />
                <FieldLabel htmlFor="checkbox-disabled-off">Disabled</FieldLabel>
            </Field>
            <Field orientation="horizontal">
                <Checkbox id="checkbox-disabled-on" disabled defaultChecked />
                <FieldLabel htmlFor="checkbox-disabled-on">Disabled and checked</FieldLabel>
            </Field>
        </Stack>
    );
}
