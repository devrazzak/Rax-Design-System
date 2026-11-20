import Link from 'next/link';

import { Alert, AlertDescription, AlertTitle } from '@rax-ds/ui';

export default function AlertWithLink() {
    return (
        <Alert variant="info" className="w-full max-w-md">
            <AlertTitle>Setup required</AlertTitle>
            <AlertDescription>
                Follow the <Link href="/docs/installation">installation guide</Link> to finish.
            </AlertDescription>
        </Alert>
    );
}
