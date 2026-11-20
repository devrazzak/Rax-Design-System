import { ScrollArea, Separator, Stack, Text } from '@rax-ds/ui';

const orders = ['Order 1042', 'Order 1041', 'Order 1040', 'Order 1039', 'Order 1038', 'Order 1037', 'Order 1036'];

export default function ScrollAreaDemo() {
    return (
        <ScrollArea className="h-48 w-full max-w-sm rounded-md border border-border">
            <Stack gap="sm" className="p-4">
                <Text weight="medium">Recent orders</Text>
                {orders.map(order => (
                    <Stack key={order} gap="sm">
                        <Text size="sm">{order}</Text>
                        <Separator />
                    </Stack>
                ))}
            </Stack>
        </ScrollArea>
    );
}
