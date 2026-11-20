import { InfoIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@rax-ds/ui';

export default function AlertDemo() {
    return (
        <Alert className="w-full max-w-md">
            <InfoIcon />
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>Your changes are saved automatically.</AlertDescription>
        </Alert>
    );
}
