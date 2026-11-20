import Link from 'next/link';

import { Button, Container, Heading, Section, Stack, Text } from '@rax-ds/ui';

export default function NotFound() {
    return (
        // The design system has no component for the main landmark, so the native element is used
        <main>
            <Section spacing="lg">
                <Container>
                    <Stack align="start" gap="md">
                        <Heading as="h1" size="4xl">
                            Page not found
                        </Heading>
                        <Text color="muted">The page you are looking for does not exist or has moved.</Text>
                        <Button asChild>
                            <Link href="/docs">Go to the docs</Link>
                        </Button>
                    </Stack>
                </Container>
            </Section>
        </main>
    );
}
