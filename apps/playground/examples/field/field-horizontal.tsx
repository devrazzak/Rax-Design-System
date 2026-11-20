import { Checkbox, Field, FieldContent, FieldDescription, FieldLabel, Stack } from '@rax-ds/ui';

export default function FieldHorizontal() {
    return (
        <Stack className="w-full max-w-sm">
            <Field orientation="horizontal">
                <Checkbox id="field-horizontal-terms" />
                <FieldLabel htmlFor="field-horizontal-terms">Accept terms and conditions</FieldLabel>
            </Field>
            <Field orientation="horizontal">
                <Checkbox id="field-horizontal-news" aria-describedby="field-horizontal-news-hint" />
                <FieldContent>
                    <FieldLabel htmlFor="field-horizontal-news">Newsletter</FieldLabel>
                    <FieldDescription id="field-horizontal-news-hint">Product updates once a month.</FieldDescription>
                </FieldContent>
            </Field>
        </Stack>
    );
}
