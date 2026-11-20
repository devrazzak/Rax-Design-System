import { Input, Stack } from '@rax-ds/ui';

export default function InputSizes() {
    return (
        <Stack className="w-full max-w-sm">
            <Input size="sm" placeholder="Small" aria-label="Small" />
            <Input size="md" placeholder="Medium, the default" aria-label="Medium" />
            <Input size="lg" placeholder="Large" aria-label="Large" />
            <Input size="xl" placeholder="Extra large" aria-label="Extra large" />
        </Stack>
    );
}
