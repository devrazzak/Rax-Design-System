import { Card, Grid, Stack, Text } from '@rax-ds/ui';

export default function GridColumns() {
    return (
        <Stack gap="lg" className="w-full">
            <Grid columns={1}>
                <Card padding="sm">
                    <Text>1 column</Text>
                </Card>
                <Card padding="sm">
                    <Text>1 column</Text>
                </Card>
            </Grid>
            <Grid columns={2}>
                <Card padding="sm">
                    <Text>2 columns, the default</Text>
                </Card>
                <Card padding="sm">
                    <Text>2 columns</Text>
                </Card>
            </Grid>
            <Grid columns={3}>
                <Card padding="sm">
                    <Text>3</Text>
                </Card>
                <Card padding="sm">
                    <Text>3</Text>
                </Card>
                <Card padding="sm">
                    <Text>3</Text>
                </Card>
            </Grid>
            <Grid columns={4}>
                <Card padding="sm">
                    <Text>4</Text>
                </Card>
                <Card padding="sm">
                    <Text>4</Text>
                </Card>
                <Card padding="sm">
                    <Text>4</Text>
                </Card>
                <Card padding="sm">
                    <Text>4</Text>
                </Card>
            </Grid>
            <Grid columns={6}>
                <Card padding="sm">
                    <Text>6</Text>
                </Card>
                <Card padding="sm">
                    <Text>6</Text>
                </Card>
                <Card padding="sm">
                    <Text>6</Text>
                </Card>
                <Card padding="sm">
                    <Text>6</Text>
                </Card>
                <Card padding="sm">
                    <Text>6</Text>
                </Card>
                <Card padding="sm">
                    <Text>6</Text>
                </Card>
            </Grid>
            <Grid columns={12}>
                <Card padding="sm">
                    <Text>12</Text>
                </Card>
                <Card padding="sm">
                    <Text>12</Text>
                </Card>
                <Card padding="sm">
                    <Text>12</Text>
                </Card>
                <Card padding="sm">
                    <Text>12</Text>
                </Card>
            </Grid>
        </Stack>
    );
}
