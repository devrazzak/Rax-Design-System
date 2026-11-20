import { Card, Container, Heading, Stack, Text } from '@rax-ds/ui';

export default function ContainerNested() {
    return (
        <Container size="lg">
            <Stack gap="md">
                <Heading as="h3" size="xl">
                    Dashboard
                </Heading>
                <Container size="sm">
                    <Card padding="sm">
                        <Text>A narrower container inside a wider one keeps long text readable.</Text>
                    </Card>
                </Container>
            </Stack>
        </Container>
    );
}
