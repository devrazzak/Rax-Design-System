import { Badge, Row } from '@rax-ds/ui';

export default function BadgeVariants() {
    return (
        <Row gap="md" wrap justify="center">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
        </Row>
    );
}
