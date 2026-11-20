import { Checkbox, Field, FieldLabel } from '@rax-ds/ui';

export default function CheckboxDemo() {
    return (
        <Field orientation="horizontal" className="w-auto">
            <Checkbox id="checkbox-demo-terms" />
            <FieldLabel htmlFor="checkbox-demo-terms">Accept terms and conditions</FieldLabel>
        </Field>
    );
}
