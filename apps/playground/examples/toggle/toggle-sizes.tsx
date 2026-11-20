import { ItalicIcon } from 'lucide-react';

import { Row, Toggle } from '@rax-ds/ui';

export default function ToggleSizes() {
    return (
        <Row gap="md" wrap justify="center">
            <Toggle size="sm" variant="outline" aria-label="Small">
                <ItalicIcon />
            </Toggle>
            <Toggle size="md" variant="outline" aria-label="Medium">
                <ItalicIcon />
            </Toggle>
            <Toggle size="lg" variant="outline" aria-label="Large">
                <ItalicIcon />
            </Toggle>
            <Toggle size="xl" variant="outline" aria-label="Extra large">
                <ItalicIcon />
            </Toggle>
        </Row>
    );
}
