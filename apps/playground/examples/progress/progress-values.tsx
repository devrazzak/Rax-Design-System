import { Progress, Stack } from '@rax-ds/ui';

export default function ProgressValues() {
    return (
        <Stack gap="lg" className="w-full max-w-sm">
            <Progress value={0} aria-label="0 percent" />
            <Progress value={25} aria-label="25 percent" />
            <Progress value={100} aria-label="100 percent" />
            <Progress value={30} max={60} aria-label="30 of 60 steps" />
        </Stack>
    );
}
