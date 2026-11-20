import { Field, FieldContent, FieldDescription, FieldLabel, Switch } from '@rax-ds/ui';

export default function SwitchWithDescription() {
    return (
        <Field orientation="horizontal" className="w-full max-w-sm">
            <FieldContent>
                <FieldLabel htmlFor="switch-with-description-marketing">Marketing emails</FieldLabel>
                <FieldDescription id="switch-with-description-marketing-hint">
                    Receive news and offers once a month.
                </FieldDescription>
            </FieldContent>
            <Switch id="switch-with-description-marketing" aria-describedby="switch-with-description-marketing-hint" />
        </Field>
    );
}
