import { BoldIcon } from 'lucide-react';

import { Toggle } from '@rax-ds/ui';

export default function ToggleDemo() {
    return (
        <Toggle aria-label="Toggle bold">
            <BoldIcon />
        </Toggle>
    );
}
