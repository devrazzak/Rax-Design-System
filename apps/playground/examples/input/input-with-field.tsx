import { Field, FieldDescription, FieldLabel, Input } from '@rax-ds/ui';

export default function InputWithField() {
    return (
        <Field className="w-full max-w-sm">
            <FieldLabel htmlFor="input-with-field-email">Email</FieldLabel>
            <Input
                id="input-with-field-email"
                type="email"
                placeholder="name@example.com"
                aria-describedby="input-with-field-email-hint"
            />
            <FieldDescription id="input-with-field-email-hint">We never share your email.</FieldDescription>
        </Field>
    );
}
