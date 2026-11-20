import { Progress, Stack } from '@rax-ds/ui';

export default function ProgressSizes() {
    return (
        <Stack gap="lg" className="w-full max-w-sm">
            <Progress size="sm" value={60} aria-label="Small" />
            <Progress size="md" value={60} aria-label="Medium" />
            <Progress size="lg" value={60} aria-label="Large" />
            <Progress size="xl" value={60} aria-label="Extra large" />
        </Stack>
    );
}
