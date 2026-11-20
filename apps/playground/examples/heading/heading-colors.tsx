import { Heading, Section, Stack } from '@rax-ds/ui';

export default function HeadingColors() {
    return (
        <Stack gap="md">
            <Heading as="h3" color="foreground">
                Foreground
            </Heading>
            <Heading as="h3" color="muted">
                Muted
            </Heading>
            <Heading as="h3" color="primary">
                Primary
            </Heading>
            <Heading as="h3" color="secondary">
                Secondary
            </Heading>
            <Section tone="primary" className="rounded-md p-4">
                <Heading as="h3" color="white">
                    White, for colored backgrounds
                </Heading>
            </Section>
        </Stack>
    );
}
