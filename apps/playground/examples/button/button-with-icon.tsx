import { ArrowRightIcon, MailIcon } from 'lucide-react';

import { Button, Row } from '@rax-ds/ui';

export default function ButtonWithIcon() {
    return (
        <Row gap="md" wrap justify="center">
            <Button>
                <MailIcon data-icon="inline-start" />
                Email us
            </Button>
            <Button variant="outline">
                Continue
                <ArrowRightIcon data-icon="inline-end" />
            </Button>
        </Row>
    );
}
