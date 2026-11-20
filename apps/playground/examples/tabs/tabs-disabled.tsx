import { Tabs, TabsContent, TabsList, TabsTrigger, Text } from '@rax-ds/ui';

export default function TabsDisabled() {
    return (
        <Tabs defaultValue="overview" className="w-full max-w-md">
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reports" disabled>
                    Reports
                </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <Text>A summary of your store this week.</Text>
            </TabsContent>
            <TabsContent value="reports">
                <Text>Reports are not available on your plan.</Text>
            </TabsContent>
        </Tabs>
    );
}
