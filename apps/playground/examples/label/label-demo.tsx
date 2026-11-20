import { Input, Label, Stack } from '@rax-ds/ui';

export default function LabelDemo() {
    return (
        <Stack gap="sm" className="w-full max-w-sm">
            <Label htmlFor="label-demo-email">Email</Label>
            <Input id="label-demo-email" type="email" placeholder="name@example.com" />
        </Stack>
    );
}
