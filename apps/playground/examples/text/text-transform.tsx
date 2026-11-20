import { Stack, Text } from '@rax-ds/ui';

export default function TextTransform() {
    return (
        <Stack gap="sm">
            <Text textTransform="uppercase">Uppercase</Text>
            <Text textTransform="lowercase">LOWERCASE</Text>
            <Text textTransform="capitalize">capitalize each word</Text>
        </Stack>
    );
}
