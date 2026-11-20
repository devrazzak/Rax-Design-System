import { Alert, AlertDescription, AlertTitle, Stack } from '@rax-ds/ui';

export default function AlertSubtle() {
    return (
        <Stack className="w-full max-w-md">
            <Alert variant="info-subtle">
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>A new version is available.</AlertDescription>
            </Alert>
            <Alert variant="warning-subtle">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>Your plan expires in 3 days.</AlertDescription>
            </Alert>
            <Alert variant="destructive-subtle">
                <AlertTitle>Destructive</AlertTitle>
                <AlertDescription>The payment could not be processed.</AlertDescription>
            </Alert>
        </Stack>
    );
}
