import { Row, Skeleton, Stack } from '@rax-ds/ui';

export default function SkeletonDemo() {
    return (
        <Row gap="md" className="w-full max-w-sm">
            <Skeleton className="size-12 rounded-full" />
            <Stack gap="sm" className="flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </Stack>
        </Row>
    );
}
