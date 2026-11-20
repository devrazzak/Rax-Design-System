import { Card, Row, Text } from '@rax-ds/ui';

export default function RowDemo() {
    return (
        <Row>
            <Card padding="sm">
                <Text>First</Text>
            </Card>
            <Card padding="sm">
                <Text>Second</Text>
            </Card>
            <Card padding="sm">
                <Text>Third</Text>
            </Card>
        </Row>
    );
}
