import { Container, Heading, Section, Stack, Text } from '@rax-ds/ui';

export default function SectionDemo() {
    return (
        <Section spacing="md" tone="muted" className="w-full rounded-md">
            <Container size="sm">
                <Stack gap="sm">
                    <Heading as="h3" size="xl">
                        Recent orders
                    </Heading>
                    <Text color="muted">A section adds vertical padding and a background to a block of the page.</Text>
                </Stack>
            </Container>
        </Section>
    );
}
