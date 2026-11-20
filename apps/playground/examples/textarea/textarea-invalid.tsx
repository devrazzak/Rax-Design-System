import { Field, FieldError, FieldLabel, Textarea } from '@rax-ds/ui';

export default function TextareaInvalid() {
    return (
        <Field data-invalid className="w-full max-w-sm">
            <FieldLabel htmlFor="textarea-invalid-message">Message</FieldLabel>
            <Textarea id="textarea-invalid-message" aria-invalid aria-describedby="textarea-invalid-message-error" />
            <FieldError id="textarea-invalid-message-error">The message cannot be empty.</FieldError>
        </Field>
    );
}
