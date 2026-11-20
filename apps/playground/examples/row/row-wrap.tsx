import { Card, Row, Text } from '@rax-ds/ui';

export default function RowWrap() {
    return (
        <Row wrap className="w-full max-w-sm">
            <Card padding="sm">
                <Text>Dashboard</Text>
            </Card>
            <Card padding="sm">
                <Text>Recent orders</Text>
            </Card>
            <Card padding="sm">
                <Text>Customers</Text>
            </Card>
            <Card padding="sm">
                <Text>Settings</Text>
            </Card>
            <Card padding="sm">
                <Text>Billing</Text>
            </Card>
        </Row>
    );
}
