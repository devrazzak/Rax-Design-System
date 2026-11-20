import { radiusTokens } from '@/config/tokens';

import { Grid, Stack, Text } from '@rax-ds/ui';

export function RadiusScale() {
    return (
        <Grid columns={{ base: 2, sm: 4 }} gap="md" className="my-6">
            {radiusTokens.map(radius => (
                <Stack key={radius.name} gap="sm" align="start">
                    {/* A shape sample using the live radius variable */}
                    <div
                        className="size-20 border-2 border-foreground bg-muted"
                        style={{ borderRadius: `var(--rax-radius-${radius.name})` }}
                    />
                    <Stack gap="none">
                        <Text size="sm" weight="medium" className="font-mono">
                            rounded-{radius.name}
                        </Text>
                        <Text as="span" size="xs" color="muted">
                            {radius.value}
                        </Text>
                    </Stack>
                </Stack>
            ))}
        </Grid>
    );
}
