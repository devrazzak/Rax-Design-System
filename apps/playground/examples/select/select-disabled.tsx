import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Stack } from '@rax-ds/ui';

export default function SelectDisabled() {
    return (
        <Stack className="w-full max-w-sm">
            <Select disabled>
                <SelectTrigger aria-label="Disabled select">
                    <SelectValue placeholder="Disabled select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger aria-label="Status with a disabled item">
                    <SelectValue placeholder="Disabled item" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="cancelled" disabled>
                        Cancelled
                    </SelectItem>
                </SelectContent>
            </Select>
        </Stack>
    );
}
