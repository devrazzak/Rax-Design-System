import { Field, FieldError, FieldLabel, Input } from '@rax-ds/ui';

export default function InputInvalid() {
    return (
        <Field data-invalid className="w-full max-w-sm">
            <FieldLabel htmlFor="input-invalid-email">Email</FieldLabel>
            <Input
                id="input-invalid-email"
                type="email"
                defaultValue="name@"
                aria-invalid
                aria-describedby="input-invalid-email-error"
            />
            <FieldError id="input-invalid-email-error">Enter a valid email address.</FieldError>
        </Field>
    );
}
