import { Field, FieldLabel, RadioGroup, RadioGroupItem } from '@rax-ds/ui';

export default function RadioGroupDemo() {
    return (
        <RadioGroup defaultValue="standard" aria-label="Delivery method">
            <Field orientation="horizontal">
                <RadioGroupItem value="standard" id="radio-group-demo-standard" />
                <FieldLabel htmlFor="radio-group-demo-standard">Standard shipping</FieldLabel>
            </Field>
            <Field orientation="horizontal">
                <RadioGroupItem value="express" id="radio-group-demo-express" />
                <FieldLabel htmlFor="radio-group-demo-express">Express shipping</FieldLabel>
            </Field>
            <Field orientation="horizontal">
                <RadioGroupItem value="pickup" id="radio-group-demo-pickup" />
                <FieldLabel htmlFor="radio-group-demo-pickup">Pick up in store</FieldLabel>
            </Field>
        </RadioGroup>
    );
}
