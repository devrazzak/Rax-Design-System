import {
    Field,
    FieldDescription,
    FieldLabel,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@rax-ds/ui';

export default function SelectWithField() {
    return (
        <Field className="w-full max-w-sm">
            <FieldLabel htmlFor="select-with-field-country">Country</FieldLabel>
            <Select>
                <SelectTrigger id="select-with-field-country" aria-describedby="select-with-field-country-hint">
                    <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                </SelectContent>
            </Select>
            <FieldDescription id="select-with-field-country-hint">Used to calculate shipping costs.</FieldDescription>
        </Field>
    );
}
