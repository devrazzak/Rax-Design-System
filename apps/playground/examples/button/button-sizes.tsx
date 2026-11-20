import { Button, Row } from '@rax-ds/ui';

export default function ButtonSizes() {
    return (
        <Row gap="md" wrap justify="center">
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra large</Button>
        </Row>
    );
}
