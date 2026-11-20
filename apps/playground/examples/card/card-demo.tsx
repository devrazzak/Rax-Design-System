import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@rax-ds/ui';

export default function CardDemo() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Recent orders</CardTitle>
                <CardDescription>You have 3 orders waiting to be shipped.</CardDescription>
            </CardHeader>
            <CardContent>Orders 1040, 1041 and 1042 are ready for packing.</CardContent>
            <CardFooter className="gap-2">
                <Button size="sm">View orders</Button>
                <Button size="sm" variant="outline">
                    Dismiss
                </Button>
            </CardFooter>
        </Card>
    );
}
