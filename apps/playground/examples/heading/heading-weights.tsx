import { Heading, Stack } from '@rax-ds/ui';

export default function HeadingWeights() {
    return (
        <Stack gap="sm">
            <Heading as="h3" weight="regular">
                Regular
            </Heading>
            <Heading as="h3" weight="medium">
                Medium
            </Heading>
            <Heading as="h3" weight="semibold">
                Semibold, the default
            </Heading>
            <Heading as="h3" weight="bold">
                Bold
            </Heading>
        </Stack>
    );
}
