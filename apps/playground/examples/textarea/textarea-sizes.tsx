import { Stack, Textarea } from '@rax-ds/ui';

export default function TextareaSizes() {
    return (
        <Stack className="w-full max-w-sm">
            <Textarea size="sm" placeholder="Small" aria-label="Small" />
            <Textarea size="md" placeholder="Medium, the default" aria-label="Medium" />
            <Textarea size="lg" placeholder="Large" aria-label="Large" />
            <Textarea size="xl" placeholder="Extra large" aria-label="Extra large" />
        </Stack>
    );
}
