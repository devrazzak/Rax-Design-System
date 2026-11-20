import { SettingsIcon } from 'lucide-react';
import Link from 'next/link';

import { IconButton } from '@rax-ds/ui';

export default function IconButtonAsChild() {
    return (
        <IconButton asChild label="Open installation guide" variant="outline">
            <Link href="/docs/installation">
                <SettingsIcon />
            </Link>
        </IconButton>
    );
}
