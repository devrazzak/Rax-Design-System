import {
    Field,
    FieldError,
    FieldLabel,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@rax-ds/ui';

export default function SelectInvalid() {
    return (
        <Field data-invalid className="w-full max-w-sm">
            <FieldLabel htmlFor="select-invalid-status">Status</FieldLabel>
            <Select>
                <SelectTrigger id="select-invalid-status" aria-invalid aria-describedby="select-invalid-status-error">
                    <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                </SelectContent>
            </Select>
            <FieldError id="select-invalid-status-error">Select a status to continue.</FieldError>
        </Field>
    );
}
