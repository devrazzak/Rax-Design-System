import { Field, FieldLabel, Stack, Switch } from '@rax-ds/ui';

export default function SwitchDisabled() {
    return (
        <Stack gap="sm">
            <Field orientation="horizontal">
                <Switch id="switch-disabled-off" disabled />
                <FieldLabel htmlFor="switch-disabled-off">Disabled</FieldLabel>
            </Field>
            <Field orientation="horizontal">
                <Switch id="switch-disabled-on" disabled defaultChecked />
                <FieldLabel htmlFor="switch-disabled-on">Disabled and on</FieldLabel>
            </Field>
        </Stack>
    );
}
