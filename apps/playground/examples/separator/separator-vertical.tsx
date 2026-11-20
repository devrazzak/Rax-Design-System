import { Row, Separator, Text } from '@rax-ds/ui';

export default function SeparatorVertical() {
    return (
        <Row gap="md" className="h-6">
            <Text size="sm">Dashboard</Text>
            <Separator orientation="vertical" />
            <Text size="sm">Orders</Text>
            <Separator orientation="vertical" />
            <Text size="sm">Customers</Text>
        </Row>
    );
}
