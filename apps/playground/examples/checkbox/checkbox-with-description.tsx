import { Checkbox, Field, FieldContent, FieldDescription, FieldLabel } from '@rax-ds/ui';

export default function CheckboxWithDescription() {
    return (
        <Field orientation="horizontal" className="w-full max-w-sm">
            <Checkbox id="checkbox-with-description-news" aria-describedby="checkbox-with-description-news-hint" />
            <FieldContent>
                <FieldLabel htmlFor="checkbox-with-description-news">Newsletter</FieldLabel>
                <FieldDescription id="checkbox-with-description-news-hint">
                    Product updates once a month.
                </FieldDescription>
            </FieldContent>
        </Field>
    );
}
