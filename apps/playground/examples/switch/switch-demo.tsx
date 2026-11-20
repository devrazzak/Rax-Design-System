import { Field, FieldLabel, Switch } from '@rax-ds/ui';

export default function SwitchDemo() {
    return (
        <Field orientation="horizontal" className="w-auto">
            <Switch id="switch-demo-notifications" />
            <FieldLabel htmlFor="switch-demo-notifications">Email notifications</FieldLabel>
        </Field>
    );
}
