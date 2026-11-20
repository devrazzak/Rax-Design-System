import { Card, Stack, Text } from '@rax-ds/ui';

export default function StackDemo() {
    return (
        <Stack className="w-full max-w-sm">
            <Card padding="sm">
                <Text>First</Text>
            </Card>
            <Card padding="sm">
                <Text>Second</Text>
            </Card>
            <Card padding="sm">
                <Text>Third</Text>
            </Card>
        </Stack>
    );
}
