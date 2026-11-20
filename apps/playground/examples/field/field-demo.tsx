import { Field, FieldDescription, FieldLabel, Input } from '@rax-ds/ui';

export default function FieldDemo() {
    return (
        <Field className="w-full max-w-sm">
            <FieldLabel htmlFor="field-demo-email">Email</FieldLabel>
            <Input
                id="field-demo-email"
                type="email"
                placeholder="name@example.com"
                aria-describedby="field-demo-email-hint"
            />
            <FieldDescription id="field-demo-email-hint">We never share your email.</FieldDescription>
        </Field>
    );
}
