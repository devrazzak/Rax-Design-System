import { Field, FieldError, FieldLabel, FieldLegend, FieldSet, RadioGroup, RadioGroupItem } from '@rax-ds/ui';

export default function RadioGroupInvalid() {
    return (
        <FieldSet data-invalid>
            <FieldLegend>Delivery method</FieldLegend>
            <RadioGroup aria-describedby="radio-group-invalid-error">
                <Field orientation="horizontal">
                    <RadioGroupItem value="standard" id="radio-group-invalid-standard" aria-invalid />
                    <FieldLabel htmlFor="radio-group-invalid-standard">Standard shipping</FieldLabel>
                </Field>
                <Field orientation="horizontal">
                    <RadioGroupItem value="express" id="radio-group-invalid-express" aria-invalid />
                    <FieldLabel htmlFor="radio-group-invalid-express">Express shipping</FieldLabel>
                </Field>
            </RadioGroup>
            <FieldError id="radio-group-invalid-error">Choose a delivery method.</FieldError>
        </FieldSet>
    );
}
