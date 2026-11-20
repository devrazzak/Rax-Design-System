import { Row, Section, Spinner, Text } from '@rax-ds/ui';

export default function SpinnerColors() {
    return (
        <Row gap="lg" wrap justify="center">
            <Spinner size="xl" color="primary" label="Primary" />
            <Spinner size="xl" color="secondary" label="Secondary" />
            <Spinner size="xl" color="muted" label="Muted" />
            <Text color="primary">
                <Spinner size="xl" color="current" label="Current color" />
            </Text>
            <Section tone="primary" className="rounded-md p-4">
                <Spinner size="xl" color="inverse" label="Inverse" />
            </Section>
        </Row>
    );
}
