import { TrashIcon } from 'lucide-react';

import { IconButton } from '@rax-ds/ui';

export default function IconButtonDisabled() {
    return (
        <IconButton label="Delete" variant="outline" disabled>
            <TrashIcon />
        </IconButton>
    );
}
