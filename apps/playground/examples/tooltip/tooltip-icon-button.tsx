import { PlusIcon } from 'lucide-react';

import { IconButton } from '@rax-ds/ui';

export default function TooltipIconButton() {
    return (
        // IconButton already wraps itself in a Tooltip that shows its label
        <IconButton label="Add to library" variant="outline">
            <PlusIcon />
        </IconButton>
    );
}
