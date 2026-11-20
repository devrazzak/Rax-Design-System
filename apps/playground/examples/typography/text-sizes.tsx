import { Stack, Text } from '@rax-ds/ui';

export default function TextSizes() {
    return (
        <Stack gap="sm">
            <Text size="xl">Extra large text</Text>
            <Text size="lg">Large text</Text>
            <Text size="md">Medium text, the default</Text>
            <Text size="sm">Small text</Text>
            <Text size="xs">Extra small text</Text>
        </Stack>
    );
}
