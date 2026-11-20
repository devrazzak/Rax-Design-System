import { SettingsIcon } from 'lucide-react';

import { IconButton } from '@rax-ds/ui';

export default function IconButtonDemo() {
    return (
        <IconButton label="Settings" variant="outline">
            <SettingsIcon />
        </IconButton>
    );
}
