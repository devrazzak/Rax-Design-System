import { Stack, Tabs, TabsList, TabsTrigger } from '@rax-ds/ui';

export default function TabsSizes() {
    return (
        <Stack gap="md" className="w-full max-w-md">
            <Tabs defaultValue="overview">
                <TabsList size="sm">
                    <TabsTrigger value="overview">Small</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
            </Tabs>
            <Tabs defaultValue="overview">
                <TabsList size="md">
                    <TabsTrigger value="overview">Medium</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
            </Tabs>
            <Tabs defaultValue="overview">
                <TabsList size="lg">
                    <TabsTrigger value="overview">Large</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
            </Tabs>
            <Tabs defaultValue="overview">
                <TabsList size="xl">
                    <TabsTrigger value="overview">Extra large</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
            </Tabs>
        </Stack>
    );
}
