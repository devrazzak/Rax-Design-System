import { Row, Switch } from '@rax-ds/ui';

export default function SwitchSizes() {
    return (
        <Row gap="md" wrap justify="center">
            <Switch size="sm" defaultChecked aria-label="Small" />
            <Switch size="md" defaultChecked aria-label="Medium" />
            <Switch size="lg" defaultChecked aria-label="Large" />
            <Switch size="xl" defaultChecked aria-label="Extra large" />
        </Row>
    );
}
