import { Field, FieldDescription, FieldLabel, Textarea } from '@rax-ds/ui';

export default function TextareaWithField() {
    return (
        <Field className="w-full max-w-sm">
            <FieldLabel htmlFor="textarea-with-field-bio">Bio</FieldLabel>
            <Textarea
                id="textarea-with-field-bio"
                placeholder="Tell us about yourself"
                aria-describedby="textarea-with-field-bio-hint"
            />
            <FieldDescription id="textarea-with-field-bio-hint">Up to 200 characters.</FieldDescription>
        </Field>
    );
}
