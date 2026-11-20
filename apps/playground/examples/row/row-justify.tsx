import { Card, Row, Stack, Text } from '@rax-ds/ui';

export default function RowJustify() {
    return (
        <Stack gap="md" className="w-full max-w-md">
            <Row justify="start">
                <Card padding="sm">
                    <Text>start</Text>
                </Card>
                <Card padding="sm">
                    <Text>start</Text>
                </Card>
            </Row>
            <Row justify="center">
                <Card padding="sm">
                    <Text>center</Text>
                </Card>
                <Card padding="sm">
                    <Text>center</Text>
                </Card>
            </Row>
            <Row justify="end">
                <Card padding="sm">
                    <Text>end</Text>
                </Card>
                <Card padding="sm">
                    <Text>end</Text>
                </Card>
            </Row>
            <Row justify="between">
                <Card padding="sm">
                    <Text>between</Text>
                </Card>
                <Card padding="sm">
                    <Text>between</Text>
                </Card>
            </Row>
        </Stack>
    );
}
