import { Field, FieldError, FieldLabel, InputGroup, InputGroupAddon, InputGroupInput } from '@rax-ds/ui';

export default function InputGroupInvalid() {
    return (
        <Field data-invalid className="w-full max-w-sm">
            <FieldLabel htmlFor="input-group-invalid-website">Website</FieldLabel>
            <InputGroup>
                <InputGroupAddon>https://</InputGroupAddon>
                <InputGroupInput
                    id="input-group-invalid-website"
                    defaultValue="not a domain"
                    aria-invalid
                    aria-describedby="input-group-invalid-website-error"
                />
            </InputGroup>
            <FieldError id="input-group-invalid-website-error">Enter a valid domain.</FieldError>
        </Field>
    );
}
