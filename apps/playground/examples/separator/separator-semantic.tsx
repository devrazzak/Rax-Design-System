import { Separator, Stack, Text } from '@rax-ds/ui';

export default function SeparatorSemantic() {
    return (
        <Stack className="w-full max-w-sm">
            <Text>Billing details</Text>
            <Separator decorative={false} />
            <Text>Shipping details</Text>
        </Stack>
    );
}
