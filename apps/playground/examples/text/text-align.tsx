import { Stack, Text } from '@rax-ds/ui';

export default function TextAlign() {
    return (
        <Stack gap="md" className="w-full max-w-sm">
            <Text textAlign="start">Start, follows the reading direction</Text>
            <Text textAlign="center">Center</Text>
            <Text textAlign="end">End, follows the reading direction</Text>
            <Text textAlign="justify">
                Justify spreads the words so every full line reaches both edges of the paragraph.
            </Text>
        </Stack>
    );
}
