import { PlusIcon } from 'lucide-react';

import { IconButton, Row } from '@rax-ds/ui';

export default function IconButtonSizes() {
    return (
        <Row gap="md" wrap justify="center">
            <IconButton label="Add extra small" size="xs">
                <PlusIcon />
            </IconButton>
            <IconButton label="Add small" size="sm">
                <PlusIcon />
            </IconButton>
            <IconButton label="Add medium" size="md">
                <PlusIcon />
            </IconButton>
            <IconButton label="Add large" size="lg">
                <PlusIcon />
            </IconButton>
            <IconButton label="Add extra large" size="xl">
                <PlusIcon />
            </IconButton>
        </Row>
    );
}
