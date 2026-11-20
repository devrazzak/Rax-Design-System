import { Card, CardContent, CardHeader, Skeleton, Stack } from '@rax-ds/ui';

export default function SkeletonCard() {
    return (
        <Card className="w-full max-w-sm">
            <Skeleton className="h-36 w-full rounded-none" />
            <CardHeader>
                <Skeleton className="h-5 w-2/3" />
            </CardHeader>
            <CardContent>
                <Stack gap="sm">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </Stack>
            </CardContent>
        </Card>
    );
}
