import { Card, Row, ScrollArea, ScrollBar, Text } from '@rax-ds/ui';

const items = ['Dashboard', 'Orders', 'Customers', 'Products', 'Reports', 'Invoices', 'Settings', 'Billing'];

export default function ScrollAreaHorizontal() {
    return (
        <ScrollArea className="w-full max-w-sm rounded-md border border-border">
            <Row gap="sm" className="w-max p-4">
                {items.map(item => (
                    <Card key={item} padding="sm">
                        <Text size="sm">{item}</Text>
                    </Card>
                ))}
            </Row>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}
