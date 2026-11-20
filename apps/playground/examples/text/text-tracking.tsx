import { Stack, Text } from '@rax-ds/ui';

export default function TextTracking() {
    return (
        <Stack gap="sm">
            <Text tracking="tight">Tight letter spacing</Text>
            <Text tracking="normal">Normal letter spacing</Text>
            <Text tracking="wide">Wide letter spacing</Text>
            <Text tracking="wider">Wider letter spacing</Text>
            <Text tracking="widest">Widest letter spacing</Text>
        </Stack>
    );
}
