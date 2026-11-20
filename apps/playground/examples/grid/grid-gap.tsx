import { Card, Grid, Stack, Text } from '@rax-ds/ui';

export default function GridGap() {
    return (
        <Stack gap="lg" className="w-full">
            <Grid columns={2} gap="none">
                <Card padding="sm">
                    <Text>none</Text>
                </Card>
                <Card padding="sm">
                    <Text>none</Text>
                </Card>
            </Grid>
            <Grid columns={2} gap="sm">
                <Card padding="sm">
                    <Text>sm</Text>
                </Card>
                <Card padding="sm">
                    <Text>sm</Text>
                </Card>
            </Grid>
            <Grid columns={2} gap="md">
                <Card padding="sm">
                    <Text>md, the default</Text>
                </Card>
                <Card padding="sm">
                    <Text>md</Text>
                </Card>
            </Grid>
            <Grid columns={2} gap="lg">
                <Card padding="sm">
                    <Text>lg</Text>
                </Card>
                <Card padding="sm">
                    <Text>lg</Text>
                </Card>
            </Grid>
            <Grid columns={2} gap="xl">
                <Card padding="sm">
                    <Text>xl</Text>
                </Card>
                <Card padding="sm">
                    <Text>xl</Text>
                </Card>
            </Grid>
        </Stack>
    );
}
