import { Button, Row } from '@rax-ds/ui';

export default function ButtonVariants() {
    return (
        <Row gap="md" wrap justify="center">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="surface">Surface</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
        </Row>
    );
}
