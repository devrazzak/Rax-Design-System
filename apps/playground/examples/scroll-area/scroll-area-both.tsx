import { Card, Grid, ScrollArea, ScrollBar, Text } from '@rax-ds/ui';

const cells = Array.from({ length: 24 }, (_, index) => `Item ${String(index + 1)}`);

export default function ScrollAreaBoth() {
    return (
        <ScrollArea className="h-48 w-full max-w-sm rounded-md border border-border">
            <Grid columns={6} className="w-max p-4">
                {cells.map(cell => (
                    <Card key={cell} padding="sm">
                        <Text size="sm">{cell}</Text>
                    </Card>
                ))}
            </Grid>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}
