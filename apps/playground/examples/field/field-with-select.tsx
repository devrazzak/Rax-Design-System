import { Field, FieldDescription, FieldLabel, OptionSelect } from '@rax-ds/ui';

const options = [
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'us', label: 'United States' },
];

export default function FieldWithSelect() {
    return (
        <Field className="w-full max-w-sm">
            <FieldLabel htmlFor="field-with-select-country">Country</FieldLabel>
            <OptionSelect
                id="field-with-select-country"
                options={options}
                placeholder="Select a country"
                aria-describedby="field-with-select-country-hint"
            />
            <FieldDescription id="field-with-select-country-hint">Used to calculate shipping costs.</FieldDescription>
        </Field>
    );
}
