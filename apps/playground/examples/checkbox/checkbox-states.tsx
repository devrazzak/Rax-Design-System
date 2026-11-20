import { Checkbox, Field, FieldLabel, Stack } from '@rax-ds/ui';

export default function CheckboxStates() {
    return (
        <Stack gap="sm">
            <Field orientation="horizontal">
                <Checkbox id="checkbox-states-unchecked" />
                <FieldLabel htmlFor="checkbox-states-unchecked">Unchecked</FieldLabel>
            </Field>
            <Field orientation="horizontal">
                <Checkbox id="checkbox-states-checked" defaultChecked />
                <FieldLabel htmlFor="checkbox-states-checked">Checked</FieldLabel>
            </Field>
            <Field orientation="horizontal">
                <Checkbox id="checkbox-states-indeterminate" checked="indeterminate" />
                <FieldLabel htmlFor="checkbox-states-indeterminate">Indeterminate</FieldLabel>
            </Field>
        </Stack>
    );
}
