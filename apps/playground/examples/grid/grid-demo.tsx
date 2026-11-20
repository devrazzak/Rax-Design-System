import { Card, Grid, Text } from '@rax-ds/ui';

export default function GridDemo() {
    return (
        <Grid columns={3} className="w-full">
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
            <Card padding="sm">
                <Text>Reports</Text>
            </Card>
            <Card padding="sm">
                <Text>Settings</Text>
            </Card>
        </Grid>
    );
}
