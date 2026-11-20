import { Section, Stack, Text } from '@rax-ds/ui';

export default function TextColors() {
    return (
        <Stack gap="md">
            <Text color="foreground">Foreground, the default</Text>
            <Text color="muted">Muted</Text>
            <Text color="primary">Primary</Text>
            <Text color="secondary">Secondary</Text>
            <Section tone="primary" className="rounded-md p-4">
                <Text color="white">White, for colored backgrounds</Text>
            </Section>
        </Stack>
    );
}
