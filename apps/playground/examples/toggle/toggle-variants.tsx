import { ItalicIcon } from 'lucide-react';

import { Row, Toggle } from '@rax-ds/ui';

export default function ToggleVariants() {
    return (
        <Row gap="md" wrap justify="center">
            <Toggle variant="default" aria-label="Default italic">
                <ItalicIcon />
            </Toggle>
            <Toggle variant="outline" aria-label="Outline italic">
                <ItalicIcon />
            </Toggle>
        </Row>
    );
}
