import { Field, FieldDescription, FieldError, FieldLabel, Input } from '@rax-ds/ui';

export default function FieldInvalid() {
    return (
        <Field data-invalid className="w-full max-w-sm">
            <FieldLabel htmlFor="field-invalid-email">Email</FieldLabel>
            <Input
                id="field-invalid-email"
                type="email"
                defaultValue="name@"
                aria-invalid
                aria-describedby="field-invalid-email-hint field-invalid-email-error"
            />
            <FieldDescription id="field-invalid-email-hint">We never share your email.</FieldDescription>
            <FieldError id="field-invalid-email-error">Enter a valid email address.</FieldError>
        </Field>
    );
}
