import { Section, Stack, Text } from '@rax-ds/ui';

export default function SectionTones() {
    return (
        <Stack gap="md" className="w-full">
            <Section spacing="sm" tone="default" className="rounded-md border border-border px-6">
                <Text>default, the page background</Text>
            </Section>
            <Section spacing="sm" tone="muted" className="rounded-md px-6">
                <Text>muted</Text>
            </Section>
            <Section spacing="sm" tone="primary" className="rounded-md px-6">
                <Text color="white">primary</Text>
            </Section>
            <Section spacing="sm" tone="secondary" className="rounded-md px-6">
                <Text color="white">secondary</Text>
            </Section>
            <Section spacing="sm" tone="foreground" className="rounded-md px-6">
                <Text className="text-background">foreground</Text>
            </Section>
        </Stack>
    );
}
