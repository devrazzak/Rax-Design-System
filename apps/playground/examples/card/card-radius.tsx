import { Card, CardContent, Stack } from '@rax-ds/ui';

export default function CardRadius() {
    return (
        <Stack className="w-full max-w-sm">
            <Card radius="md">
                <CardContent>md, 8px</CardContent>
            </Card>
            <Card radius="lg">
                <CardContent>lg, 12px</CardContent>
            </Card>
            <Card radius="xl">
                <CardContent>xl, 16px, the default</CardContent>
            </Card>
        </Stack>
    );
}
