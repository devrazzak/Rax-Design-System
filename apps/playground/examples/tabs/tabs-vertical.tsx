import { Tabs, TabsContent, TabsList, TabsTrigger, Text } from '@rax-ds/ui';

export default function TabsVertical() {
    return (
        <Tabs defaultValue="profile" orientation="vertical" className="w-full max-w-md">
            <TabsList variant="line">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
                <Text>Update your name and photo.</Text>
            </TabsContent>
            <TabsContent value="billing">
                <Text>See your invoices and payment method.</Text>
            </TabsContent>
            <TabsContent value="security">
                <Text>Change your password.</Text>
            </TabsContent>
        </Tabs>
    );
}
