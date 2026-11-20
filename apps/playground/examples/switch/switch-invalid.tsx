import { Field, FieldContent, FieldError, FieldLabel, Switch } from '@rax-ds/ui';

export default function SwitchInvalid() {
    return (
        <Field orientation="horizontal" data-invalid className="w-auto">
            <Switch id="switch-invalid-privacy" aria-invalid aria-describedby="switch-invalid-privacy-error" />
            <FieldContent>
                <FieldLabel htmlFor="switch-invalid-privacy">Accept the privacy policy</FieldLabel>
                <FieldError id="switch-invalid-privacy-error">You must accept the policy to continue.</FieldError>
            </FieldContent>
        </Field>
    );
}
