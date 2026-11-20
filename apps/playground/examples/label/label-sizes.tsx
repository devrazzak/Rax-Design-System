import { Label, Stack } from '@rax-ds/ui';

export default function LabelSizes() {
    return (
        <Stack gap="sm">
            <Label size="sm">Small label</Label>
            <Label size="md">Medium label, the default</Label>
        </Stack>
    );
}
