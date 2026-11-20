import { Field, FieldLabel, RadioGroup, RadioGroupItem } from '@rax-ds/ui';

export default function RadioGroupHorizontal() {
    return (
        <RadioGroup defaultValue="monthly" orientation="horizontal" aria-label="Billing period">
            <Field orientation="horizontal" className="w-auto">
                <RadioGroupItem value="monthly" id="radio-group-horizontal-monthly" />
                <FieldLabel htmlFor="radio-group-horizontal-monthly">Monthly</FieldLabel>
            </Field>
            <Field orientation="horizontal" className="w-auto">
                <RadioGroupItem value="yearly" id="radio-group-horizontal-yearly" />
                <FieldLabel htmlFor="radio-group-horizontal-yearly">Yearly</FieldLabel>
            </Field>
        </RadioGroup>
    );
}
