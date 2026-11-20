import Link from 'next/link';

import { Button } from '@rax-ds/ui';

export default function ButtonAsChild() {
    return (
        <Button asChild>
            <Link href="/docs/installation">Read the installation guide</Link>
        </Button>
    );
}
