import { Stack, Text } from '@rax-ds/ui';

export default function TextSizes() {
    return (
        <Stack gap="sm">
            <Text size="xl">Extra large (xl)</Text>
            <Text size="lg">Large (lg)</Text>
            <Text size="md">Medium (md), the default</Text>
            <Text size="sm">Small (sm)</Text>
            <Text size="xs">Extra small (xs)</Text>
        </Stack>
    );
}
