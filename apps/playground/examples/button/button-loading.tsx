import { Button, Row } from '@rax-ds/ui';

export default function ButtonLoading() {
    return (
        <Row gap="md" wrap justify="center">
            <Button loading>Saving</Button>
            <Button loading loadingPosition="start" variant="outline">
                Saving
            </Button>
        </Row>
    );
}
