import { Card, Container, Stack, Text } from '@rax-ds/ui';

export default function ContainerSizes() {
    return (
        <Stack gap="md" className="w-full">
            <Container size="sm">
                <Card padding="sm">
                    <Text>sm</Text>
                </Card>
            </Container>
            <Container size="md">
                <Card padding="sm">
                    <Text>md</Text>
                </Card>
            </Container>
            <Container size="lg">
                <Card padding="sm">
                    <Text>lg</Text>
                </Card>
            </Container>
            <Container size="xl">
                <Card padding="sm">
                    <Text>xl, the default</Text>
                </Card>
            </Container>
            <Container size="full">
                <Card padding="sm">
                    <Text>full</Text>
                </Card>
            </Container>
        </Stack>
    );
}
