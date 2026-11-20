import { Checkbox, Row } from '@rax-ds/ui';

export default function CheckboxSizes() {
    return (
        <Row gap="md" wrap justify="center">
            <Checkbox size="sm" defaultChecked aria-label="Small" />
            <Checkbox size="md" defaultChecked aria-label="Medium" />
            <Checkbox size="lg" defaultChecked aria-label="Large" />
            <Checkbox size="xl" defaultChecked aria-label="Extra large" />
        </Row>
    );
}
