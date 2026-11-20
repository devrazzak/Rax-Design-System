import { Card, Container, Text } from '@rax-ds/ui';

export default function ContainerDemo() {
    return (
        <Container size="sm">
            <Card padding="sm">
                <Text>Page content stays centered and never grows wider than the container.</Text>
            </Card>
        </Container>
    );
}
