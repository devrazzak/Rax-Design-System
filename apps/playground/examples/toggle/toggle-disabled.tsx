import { BoldIcon } from 'lucide-react';

import { Toggle } from '@rax-ds/ui';

export default function ToggleDisabled() {
    return (
        <Toggle disabled aria-label="Toggle bold">
            <BoldIcon />
        </Toggle>
    );
}
