import { colorTokens } from '@/config/tokens';

import { Grid, Stack, Text } from '@rax-ds/ui';

import type { ColorTokenGroup } from '@/config/tokens';

interface ColorSwatchesProps {
    group: ColorTokenGroup;
}

export function ColorSwatches({ group }: ColorSwatchesProps) {
    return (
        <Grid columns={{ base: 2, sm: 3 }} gap="md" className="my-6">
            {colorTokens[group].map(name => (
                <Stack key={name} gap="sm">
                    {/* A color sample. The live CSS variable is used, so it follows the theme. */}
                    <div
                        className="h-16 rounded-md border border-border"
                        style={{ backgroundColor: `var(--rax-color-${name})` }}
                    />
                    <Stack gap="none">
                        <Text size="sm" weight="medium">
                            {name}
                        </Text>
                        <Text as="span" size="xs" color="muted" className="font-mono">
                            --rax-color-{name}
                        </Text>
                    </Stack>
                </Stack>
            ))}
        </Grid>
    );
}
