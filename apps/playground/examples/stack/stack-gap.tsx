import { Card, Row, Stack, Text } from '@rax-ds/ui';

export default function StackGap() {
    return (
        <Row gap="lg" align="start" wrap justify="center">
            <Stack gap="none">
                <Card padding="sm">
                    <Text>none</Text>
                </Card>
                <Card padding="sm">
                    <Text>none</Text>
                </Card>
            </Stack>
            <Stack gap="sm">
                <Card padding="sm">
                    <Text>sm</Text>
                </Card>
                <Card padding="sm">
                    <Text>sm</Text>
                </Card>
            </Stack>
            <Stack gap="md">
                <Card padding="sm">
                    <Text>md</Text>
                </Card>
                <Card padding="sm">
                    <Text>md</Text>
                </Card>
            </Stack>
            <Stack gap="lg">
                <Card padding="sm">
                    <Text>lg</Text>
                </Card>
                <Card padding="sm">
                    <Text>lg</Text>
                </Card>
            </Stack>
            <Stack gap="xl">
                <Card padding="sm">
                    <Text>xl</Text>
                </Card>
                <Card padding="sm">
                    <Text>xl</Text>
                </Card>
            </Stack>
        </Row>
    );
}
