import { Section, Stack, Text } from '@rax-ds/ui';

export default function SectionAs() {
    return (
        <Stack gap="sm" className="w-full">
            <Section as="header" spacing="sm" tone="muted" className="rounded-md px-6">
                <Text>header</Text>
            </Section>
            <Section as="article" spacing="sm" tone="muted" className="rounded-md px-6">
                <Text>article</Text>
            </Section>
            <Section as="aside" spacing="sm" tone="muted" className="rounded-md px-6">
                <Text>aside</Text>
            </Section>
            <Section as="section" spacing="sm" tone="muted" className="rounded-md px-6">
                <Text>section, the default</Text>
            </Section>
            <Section as="footer" spacing="sm" tone="muted" className="rounded-md px-6">
                <Text>footer</Text>
            </Section>
        </Stack>
    );
}
