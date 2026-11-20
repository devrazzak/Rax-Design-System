import { Button, Row, Section } from '@rax-ds/ui';

export default function ButtonOnColor() {
    return (
        <Section tone="primary" className="rounded-md p-8">
            <Row gap="md" wrap>
                <Button variant="white">White</Button>
                <Button variant="linkWhite">Link white</Button>
            </Row>
        </Section>
    );
}
