import { Card, Grid, Text } from '@rax-ds/ui';

export default function GridResponsive() {
    return (
        <Grid columns={{ base: 1, sm: 2, lg: 4 }} className="w-full">
            <Card padding="sm">
                <Text>Dashboard</Text>
            </Card>
            <Card padding="sm">
                <Text>Orders</Text>
            </Card>
            <Card padding="sm">
                <Text>Customers</Text>
            </Card>
            <Card padding="sm">
                <Text>Products</Text>
            </Card>
        </Grid>
    );
}
