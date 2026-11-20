import { CircleAlertIcon, TriangleAlertIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle, Stack } from '@rax-ds/ui';

export default function AlertWithIcon() {
    return (
        <Stack className="w-full max-w-md">
            <Alert variant="warning">
                <TriangleAlertIcon />
                <AlertTitle>Storage almost full</AlertTitle>
                <AlertDescription>You have used 95% of your storage.</AlertDescription>
            </Alert>
            <Alert variant="destructive-subtle">
                <CircleAlertIcon />
                <AlertTitle>Upload failed</AlertTitle>
                <AlertDescription>The file is larger than 10 MB.</AlertDescription>
            </Alert>
        </Stack>
    );
}
