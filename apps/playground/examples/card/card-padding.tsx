import { Card, CardContent, CardHeader, CardTitle, Stack } from '@rax-ds/ui';

export default function CardPadding() {
    return (
        <Stack className="w-full max-w-sm">
            <Card padding="sm">
                <CardHeader>
                    <CardTitle>sm</CardTitle>
                </CardHeader>
                <CardContent>12px padding.</CardContent>
            </Card>
            <Card padding="md">
                <CardHeader>
                    <CardTitle>md, the default</CardTitle>
                </CardHeader>
                <CardContent>16px padding.</CardContent>
            </Card>
            <Card padding="lg">
                <CardHeader>
                    <CardTitle>lg</CardTitle>
                </CardHeader>
                <CardContent>24px padding.</CardContent>
            </Card>
            <Card padding="xl">
                <CardHeader>
                    <CardTitle>xl</CardTitle>
                </CardHeader>
                <CardContent>32px padding.</CardContent>
            </Card>
        </Stack>
    );
}
