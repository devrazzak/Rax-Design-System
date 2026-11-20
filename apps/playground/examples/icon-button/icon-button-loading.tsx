import { RefreshCwIcon } from 'lucide-react';

import { IconButton, Row } from '@rax-ds/ui';

export default function IconButtonLoading() {
    return (
        <Row gap="md" wrap justify="center">
            <IconButton label="Refreshing" variant="outline" loading>
                <RefreshCwIcon />
            </IconButton>
            <IconButton label="Refreshing" variant="primary" loading>
                <RefreshCwIcon />
            </IconButton>
        </Row>
    );
}
