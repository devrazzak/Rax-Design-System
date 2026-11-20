import { Field, FieldDescription, FieldLabel, FieldLegend, FieldSet, RadioGroup, RadioGroupItem } from '@rax-ds/ui';

export default function FieldSetExample() {
    return (
        <FieldSet className="w-full max-w-sm">
            <FieldLegend>Delivery method</FieldLegend>
            <FieldDescription id="field-set-hint">Choose how you want to receive your order.</FieldDescription>
            <RadioGroup defaultValue="standard" aria-describedby="field-set-hint">
                <Field orientation="horizontal">
                    <RadioGroupItem value="standard" id="field-set-standard" />
                    <FieldLabel htmlFor="field-set-standard">Standard shipping</FieldLabel>
                </Field>
                <Field orientation="horizontal">
                    <RadioGroupItem value="express" id="field-set-express" />
                    <FieldLabel htmlFor="field-set-express">Express shipping</FieldLabel>
                </Field>
            </RadioGroup>
        </FieldSet>
    );
}
