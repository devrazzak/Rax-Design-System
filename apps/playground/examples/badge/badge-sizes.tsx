import { Badge, Row } from '@rax-ds/ui';

export default function BadgeSizes() {
    return (
        <Row gap="md" wrap justify="center">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
            <Badge size="xl">Extra large</Badge>
        </Row>
    );
}
