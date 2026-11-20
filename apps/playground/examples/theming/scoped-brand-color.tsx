import { Button, Row, Stack, Text } from '@rax-ds/ui';

export default function ScopedBrandColor() {
    return (
        <Row gap="xl" wrap>
            <Stack gap="sm" align="start">
                <Text size="sm" color="muted">
                    Default
                </Text>
                <Button>Primary</Button>
            </Stack>
            <Stack gap="sm" align="start" className="[--rax-color-primary:oklch(0.55_0.2_260)]">
                <Text size="sm" color="muted">
                    Overridden
                </Text>
                <Button>Primary</Button>
            </Stack>
        </Row>
    );
}
