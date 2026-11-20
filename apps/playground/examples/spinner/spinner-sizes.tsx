import { Row, Spinner } from '@rax-ds/ui';

export default function SpinnerSizes() {
    return (
        <Row gap="lg" wrap justify="center">
            <Spinner size="xs" color="primary" label="Loading, extra small" />
            <Spinner size="sm" color="primary" label="Loading, small" />
            <Spinner size="md" color="primary" label="Loading, medium" />
            <Spinner size="lg" color="primary" label="Loading, large" />
            <Spinner size="xl" color="primary" label="Loading, extra large" />
            <Spinner size="2xl" color="primary" label="Loading, 2xl" />
        </Row>
    );
}
