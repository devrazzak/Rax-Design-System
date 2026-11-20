import { XIcon } from 'lucide-react';

import { Alert, AlertAction, AlertDescription, AlertTitle, IconButton } from '@rax-ds/ui';

export default function AlertWithAction() {
    return (
        <Alert variant="info-subtle" className="w-full max-w-md">
            <AlertTitle>New feature</AlertTitle>
            <AlertDescription>You can now export reports as CSV.</AlertDescription>
            <AlertAction>
                <IconButton label="Dismiss" variant="ghost" size="xs">
                    <XIcon />
                </IconButton>
            </AlertAction>
        </Alert>
    );
}
