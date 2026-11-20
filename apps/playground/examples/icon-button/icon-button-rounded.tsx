import { HeartIcon } from 'lucide-react';

import { IconButton, Row } from '@rax-ds/ui';

export default function IconButtonRounded() {
    return (
        <Row gap="md" wrap justify="center">
            <IconButton label="Like, rounded corners" variant="outline" rounded="md">
                <HeartIcon />
            </IconButton>
            <IconButton label="Like, circle" variant="outline" rounded="full">
                <HeartIcon />
            </IconButton>
        </Row>
    );
}
