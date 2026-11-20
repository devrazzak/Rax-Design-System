import { CheckIcon } from 'lucide-react';

import { Badge } from '@rax-ds/ui';

export default function BadgeWithIcon() {
    return (
        <Badge variant="secondary">
            <CheckIcon />
            Verified
        </Badge>
    );
}
