import { Card, Stack, Text } from '@rax-ds/ui';

export default function StackAlign() {
    return (
        <Stack gap="lg" className="w-full max-w-sm">
            <Stack align="start">
                <Card padding="sm">
                    <Text>start</Text>
                </Card>
            </Stack>
            <Stack align="center">
                <Card padding="sm">
                    <Text>center</Text>
                </Card>
            </Stack>
            <Stack align="end">
                <Card padding="sm">
                    <Text>end</Text>
                </Card>
            </Stack>
            <Stack align="stretch">
                <Card padding="sm">
                    <Text>stretch, the default</Text>
                </Card>
            </Stack>
        </Stack>
    );
}
