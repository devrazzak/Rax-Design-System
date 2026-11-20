import { BookmarkIcon } from 'lucide-react';

import { IconButton, Row } from '@rax-ds/ui';

export default function IconButtonTooltip() {
    return (
        <Row gap="md" wrap justify="center">
            <IconButton label="Save for later" variant="outline">
                <BookmarkIcon />
            </IconButton>
            <IconButton label="Save for later, no tooltip" variant="outline" tooltip={false}>
                <BookmarkIcon />
            </IconButton>
        </Row>
    );
}
