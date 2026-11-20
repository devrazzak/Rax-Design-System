import { Field, FieldLabel, RadioGroup, RadioGroupItem, Stack } from '@rax-ds/ui';

export default function RadioGroupDisabled() {
    return (
        <Stack gap="lg">
            <RadioGroup defaultValue="standard" disabled aria-label="Whole group disabled">
                <Field orientation="horizontal">
                    <RadioGroupItem value="standard" id="radio-group-disabled-group-standard" />
                    <FieldLabel htmlFor="radio-group-disabled-group-standard">Whole group disabled</FieldLabel>
                </Field>
                <Field orientation="horizontal">
                    <RadioGroupItem value="express" id="radio-group-disabled-group-express" />
                    <FieldLabel htmlFor="radio-group-disabled-group-express">Express shipping</FieldLabel>
                </Field>
            </RadioGroup>
            <RadioGroup defaultValue="standard" aria-label="One item disabled">
                <Field orientation="horizontal">
                    <RadioGroupItem value="standard" id="radio-group-disabled-item-standard" />
                    <FieldLabel htmlFor="radio-group-disabled-item-standard">Standard shipping</FieldLabel>
                </Field>
                <Field orientation="horizontal">
                    <RadioGroupItem value="express" id="radio-group-disabled-item-express" disabled />
                    <FieldLabel htmlFor="radio-group-disabled-item-express">Express shipping (unavailable)</FieldLabel>
                </Field>
            </RadioGroup>
        </Stack>
    );
}
