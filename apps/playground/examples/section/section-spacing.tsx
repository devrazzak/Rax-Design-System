import { Card, Section, Stack, Text } from '@rax-ds/ui';

export default function SectionSpacing() {
    return (
        <Stack gap="md" className="w-full">
            <Section spacing="none" tone="muted" className="rounded-md">
                <Card padding="sm">
                    <Text>none, the default</Text>
                </Card>
            </Section>
            <Section spacing="sm" tone="muted" className="rounded-md">
                <Card padding="sm">
                    <Text>sm</Text>
                </Card>
            </Section>
            <Section spacing="md" tone="muted" className="rounded-md">
                <Card padding="sm">
                    <Text>md</Text>
                </Card>
            </Section>
            <Section spacing="lg" tone="muted" className="rounded-md">
                <Card padding="sm">
                    <Text>lg</Text>
                </Card>
            </Section>
            <Section spacing="xl" tone="muted" className="rounded-md">
                <Card padding="sm">
                    <Text>xl</Text>
                </Card>
            </Section>
        </Stack>
    );
}
