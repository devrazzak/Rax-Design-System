import { Alert, AlertDescription, AlertTitle, Stack } from '@rax-ds/ui';

export default function AlertVariants() {
    return (
        <Stack className="w-full max-w-md">
            <Alert variant="default">
                <AlertTitle>Default</AlertTitle>
                <AlertDescription>The card background with normal text.</AlertDescription>
            </Alert>
            <Alert variant="info">
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>A new version is available.</AlertDescription>
            </Alert>
            <Alert variant="warning">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>Your plan expires in 3 days.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
                <AlertTitle>Destructive</AlertTitle>
                <AlertDescription>The payment could not be processed.</AlertDescription>
            </Alert>
        </Stack>
    );
}
