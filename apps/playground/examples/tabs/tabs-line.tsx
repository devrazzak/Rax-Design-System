import { Tabs, TabsContent, TabsList, TabsTrigger, Text } from '@rax-ds/ui';

export default function TabsLine() {
    return (
        <Tabs defaultValue="overview" className="w-full max-w-md">
            <TabsList variant="line">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <Text>A summary of your store this week.</Text>
            </TabsContent>
            <TabsContent value="orders">
                <Text>Your recent orders appear here.</Text>
            </TabsContent>
            <TabsContent value="settings">
                <Text>Manage your store settings.</Text>
            </TabsContent>
        </Tabs>
    );
}
