import { Card, Row, Stack, Text } from '@rax-ds/ui';

export default function RowAlign() {
    return (
        <Stack gap="md" className="w-full max-w-md">
            <Row align="start">
                <Card padding="sm">
                    <Text>start</Text>
                </Card>
                <Card padding="lg">
                    <Text>Taller</Text>
                </Card>
            </Row>
            <Row align="center">
                <Card padding="sm">
                    <Text>center, the default</Text>
                </Card>
                <Card padding="lg">
                    <Text>Taller</Text>
                </Card>
            </Row>
            <Row align="end">
                <Card padding="sm">
                    <Text>end</Text>
                </Card>
                <Card padding="lg">
                    <Text>Taller</Text>
                </Card>
            </Row>
            <Row align="stretch">
                <Card padding="sm">
                    <Text>stretch</Text>
                </Card>
                <Card padding="lg">
                    <Text>Taller</Text>
                </Card>
            </Row>
        </Stack>
    );
}
