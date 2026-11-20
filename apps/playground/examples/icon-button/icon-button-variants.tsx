import { PlusIcon } from 'lucide-react';

import { IconButton, Row } from '@rax-ds/ui';

export default function IconButtonVariants() {
    return (
        <Row gap="md" wrap justify="center">
            <IconButton label="Add primary" variant="primary">
                <PlusIcon />
            </IconButton>
            <IconButton label="Add secondary" variant="secondary">
                <PlusIcon />
            </IconButton>
            <IconButton label="Add outline" variant="outline">
                <PlusIcon />
            </IconButton>
            <IconButton label="Add surface" variant="surface">
                <PlusIcon />
            </IconButton>
            <IconButton label="Add ghost" variant="ghost">
                <PlusIcon />
            </IconButton>
            <IconButton label="Add destructive" variant="destructive">
                <PlusIcon />
            </IconButton>
        </Row>
    );
}
