import { Row, Spinner, Text } from '@rax-ds/ui';

export default function SpinnerWithText() {
    return (
        <Row gap="sm">
            <Spinner color="muted" />
            <Text color="muted">Loading results</Text>
        </Row>
    );
}
