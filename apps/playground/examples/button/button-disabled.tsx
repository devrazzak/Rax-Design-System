import { Button, Row } from '@rax-ds/ui';

export default function ButtonDisabled() {
    return (
        <Row gap="md" wrap justify="center">
            <Button disabled>Primary</Button>
            <Button disabled variant="outline">
                Outline
            </Button>
        </Row>
    );
}
