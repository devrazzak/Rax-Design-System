import { Field, FieldError, FieldLabel, OptionSelect } from '@rax-ds/ui';

const options = [
    { value: 'pending', label: 'Pending' },
    { value: 'shipped', label: 'Shipped' },
];

export default function OptionSelectInvalid() {
    return (
        <Field data-invalid className="w-full max-w-sm">
            <FieldLabel htmlFor="option-select-invalid-status">Status</FieldLabel>
            <OptionSelect
                id="option-select-invalid-status"
                options={options}
                placeholder="Select a status"
                aria-invalid
                aria-describedby="option-select-invalid-status-error"
            />
            <FieldError id="option-select-invalid-status-error">Select a status to continue.</FieldError>
        </Field>
    );
}
