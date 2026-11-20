import Link from 'next/link';

import { Badge } from '@rax-ds/ui';

export default function BadgeAsChild() {
    return (
        <Badge asChild variant="outline">
            <Link href="/docs/installation">Installation</Link>
        </Badge>
    );
}
