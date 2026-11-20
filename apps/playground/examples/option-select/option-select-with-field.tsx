import { Field, FieldDescription, FieldLabel, OptionSelect } from '@rax-ds/ui';

const options = [
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'us', label: 'United States' },
];

export default function OptionSelectWithField() {
    return (
        <Field className="w-full max-w-sm">
            <FieldLabel htmlFor="option-select-with-field-country">Country</FieldLabel>
            <OptionSelect
                id="option-select-with-field-country"
                options={options}
                placeholder="Select a country"
                aria-describedby="option-select-with-field-country-hint"
            />
            <FieldDescription id="option-select-with-field-country-hint">
                Used to calculate shipping costs.
            </FieldDescription>
        </Field>
    );
}
