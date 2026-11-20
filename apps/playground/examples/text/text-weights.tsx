import { Stack, Text } from '@rax-ds/ui';

export default function TextWeights() {
    return (
        <Stack gap="sm">
            <Text weight="regular">Regular, the default</Text>
            <Text weight="medium">Medium</Text>
            <Text weight="semibold">Semibold</Text>
            <Text weight="bold">Bold</Text>
        </Stack>
    );
}
