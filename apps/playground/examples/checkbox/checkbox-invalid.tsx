import { Checkbox, Field, FieldContent, FieldError, FieldLabel } from '@rax-ds/ui';

export default function CheckboxInvalid() {
    return (
        <Field orientation="horizontal" data-invalid className="w-auto">
            <Checkbox id="checkbox-invalid-terms" aria-invalid aria-describedby="checkbox-invalid-terms-error" />
            <FieldContent>
                <FieldLabel htmlFor="checkbox-invalid-terms">Accept terms and conditions</FieldLabel>
                <FieldError id="checkbox-invalid-terms-error">You must accept the terms to continue.</FieldError>
            </FieldContent>
        </Field>
    );
}
