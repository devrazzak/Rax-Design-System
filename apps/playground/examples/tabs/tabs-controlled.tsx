'use client';

import { useState } from 'react';

import { Button, Stack, Tabs, TabsContent, TabsList, TabsTrigger, Text } from '@rax-ds/ui';

export default function TabsControlled() {
    const [tab, setTab] = useState('overview');

    return (
        <Stack gap="md" align="start" className="w-full max-w-md">
            <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <Text>A summary of your store this week.</Text>
                </TabsContent>
                <TabsContent value="orders">
                    <Text>Your recent orders appear here.</Text>
                </TabsContent>
            </Tabs>
            <Button
                variant="outline"
                size="sm"
                onClick={() => {
                    setTab('orders');
                }}
            >
                Go to orders
            </Button>
        </Stack>
    );
}
