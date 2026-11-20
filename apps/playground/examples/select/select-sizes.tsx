import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Stack } from '@rax-ds/ui';

export default function SelectSizes() {
    return (
        <Stack className="w-full max-w-sm">
            <Select>
                <SelectTrigger size="sm" aria-label="Small">
                    <SelectValue placeholder="Small" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger size="md" aria-label="Medium">
                    <SelectValue placeholder="Medium, the default" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger size="lg" aria-label="Large">
                    <SelectValue placeholder="Large" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger size="xl" aria-label="Extra large">
                    <SelectValue placeholder="Extra large" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
            </Select>
        </Stack>
    );
}
