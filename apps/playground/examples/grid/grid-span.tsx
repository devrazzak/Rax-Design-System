import { Card, Grid, GridItem, Text } from '@rax-ds/ui';

export default function GridSpan() {
    return (
        <Grid columns={12} className="w-full">
            <GridItem span={8}>
                <Card padding="sm">
                    <Text>Recent orders (span 8)</Text>
                </Card>
            </GridItem>
            <GridItem span={4}>
                <Card padding="sm">
                    <Text>Summary (span 4)</Text>
                </Card>
            </GridItem>
            <GridItem span={3}>
                <Card padding="sm">
                    <Text>3</Text>
                </Card>
            </GridItem>
            <GridItem span={3}>
                <Card padding="sm">
                    <Text>3</Text>
                </Card>
            </GridItem>
            <GridItem span={6}>
                <Card padding="sm">
                    <Text>6</Text>
                </Card>
            </GridItem>
            <GridItem span={12}>
                <Card padding="sm">
                    <Text>Full width (span 12)</Text>
                </Card>
            </GridItem>
        </Grid>
    );
}
