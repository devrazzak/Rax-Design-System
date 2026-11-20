import { Card, Row, Stack, Text } from '@rax-ds/ui';

export default function RowGap() {
    return (
        <Stack gap="md">
            <Row gap="none">
                <Card padding="sm">
                    <Text>none</Text>
                </Card>
                <Card padding="sm">
                    <Text>none</Text>
                </Card>
            </Row>
            <Row gap="sm">
                <Card padding="sm">
                    <Text>sm</Text>
                </Card>
                <Card padding="sm">
                    <Text>sm</Text>
                </Card>
            </Row>
            <Row gap="md">
                <Card padding="sm">
                    <Text>md</Text>
                </Card>
                <Card padding="sm">
                    <Text>md</Text>
                </Card>
            </Row>
            <Row gap="lg">
                <Card padding="sm">
                    <Text>lg</Text>
                </Card>
                <Card padding="sm">
                    <Text>lg</Text>
                </Card>
            </Row>
            <Row gap="xl">
                <Card padding="sm">
                    <Text>xl</Text>
                </Card>
                <Card padding="sm">
                    <Text>xl</Text>
                </Card>
            </Row>
        </Stack>
    );
}
