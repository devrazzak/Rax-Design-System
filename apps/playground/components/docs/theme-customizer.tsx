'use client';

import { useState } from 'react';

import {
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Field,
    FieldLabel,
    Input,
    Progress,
    Row,
    Stack,
    Switch,
    Text,
    ToggleGroup,
    ToggleGroupItem,
} from '@rax-ds/ui';

import { CopyButton } from '@/components/code/copy-button';

// `null` means "keep the default tokens", so nothing is overridden or printed
const brandColors = {
    default: null,
    blue: { base: 'oklch(0.55 0.2 260)', hover: 'oklch(0.48 0.2 260)' },
    green: { base: 'oklch(0.55 0.15 150)', hover: 'oklch(0.48 0.15 150)' },
    violet: { base: 'oklch(0.55 0.22 295)', hover: 'oklch(0.48 0.22 295)' },
    orange: { base: 'oklch(0.58 0.19 45)', hover: 'oklch(0.51 0.19 45)' },
} as const;

const radiusScales = {
    sharp: { sm: '0', md: '0', lg: '0', xl: '0' },
    default: null,
    round: { sm: '0.5rem', md: '0.75rem', lg: '1rem', xl: '1.25rem' },
} as const;

type BrandColor = keyof typeof brandColors;
type RadiusScale = keyof typeof radiusScales;

function getOverrides(color: BrandColor, radius: RadiusScale): Record<string, string> {
    const brand = brandColors[color];
    const scale = radiusScales[radius];

    return {
        ...(brand && {
            '--rax-color-primary': brand.base,
            '--rax-color-primary-hover': brand.hover,
            '--rax-color-primary-outline-hover': brand.base,
            '--rax-color-link': brand.base,
            '--rax-color-link-hover': brand.hover,
        }),
        ...(scale && {
            '--rax-radius-sm': scale.sm,
            '--rax-radius-md': scale.md,
            '--rax-radius-lg': scale.lg,
            '--rax-radius-xl': scale.xl,
        }),
    };
}

function toCss(overrides: Record<string, string>): string {
    const lines = Object.entries(overrides).map(([name, value]) => `    ${name}: ${value};`);
    if (lines.length === 0) return '/* The default theme: nothing to override */';
    return `:root {\n${lines.join('\n')}\n}`;
}

/** Pick a brand color and a radius scale, see real components update, and copy the CSS. */
export function ThemeCustomizer() {
    const [color, setColor] = useState<BrandColor>('blue');
    const [radius, setRadius] = useState<RadiusScale>('default');

    const overrides = getOverrides(color, radius);
    const css = toCss(overrides);

    return (
        <Stack gap="lg" className="my-6">
            <Row gap="xl" wrap align="start">
                <Stack gap="sm">
                    <Text size="sm" weight="medium">
                        Brand color
                    </Text>
                    {/* ToggleGroup calls back with an empty string when the active item is clicked again, so that is ignored */}
                    <ToggleGroup
                        type="single"
                        variant="outline"
                        size="sm"
                        value={color}
                        onValueChange={value => value && setColor(value as BrandColor)}
                        aria-label="Brand color"
                    >
                        {Object.entries(brandColors).map(([name, value]) => (
                            <ToggleGroupItem key={name} value={name} className="capitalize">
                                {/* A small color sample next to the name */}
                                <span
                                    aria-hidden="true"
                                    className="size-3 rounded-full border border-border"
                                    style={{ backgroundColor: value?.base ?? 'var(--rax-color-primary)' }}
                                />
                                {name}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </Stack>
                <Stack gap="sm">
                    <Text size="sm" weight="medium">
                        Radius
                    </Text>
                    <ToggleGroup
                        type="single"
                        variant="outline"
                        size="sm"
                        value={radius}
                        onValueChange={value => value && setRadius(value as RadiusScale)}
                        aria-label="Radius"
                    >
                        {Object.keys(radiusScales).map(name => (
                            <ToggleGroupItem key={name} value={name} className="capitalize">
                                {name}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </Stack>
            </Row>

            {/* The overrides are CSS variables on this wrapper, so only the preview below changes */}
            <Stack style={overrides}>
                <Card padding="lg" className="gap-4">
                    <CardHeader>
                        <CardTitle>Create a project</CardTitle>
                        <CardDescription>Invite your team and start collaborating.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Stack gap="md">
                            <Field>
                                <FieldLabel htmlFor="customizer-project-name">Project name</FieldLabel>
                                <Input id="customizer-project-name" placeholder="Website redesign" />
                            </Field>
                            <Field orientation="horizontal">
                                <Switch id="customizer-notify" defaultChecked />
                                <FieldLabel htmlFor="customizer-notify">Notify the team</FieldLabel>
                            </Field>
                            <Progress value={40} aria-label="Setup progress" />
                            <Row gap="sm" wrap>
                                <Button>Create project</Button>
                                <Button variant="outline">Cancel</Button>
                                <Badge>New</Badge>
                                <Button variant="link">Learn more</Button>
                            </Row>
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>

            {/* Plain text, because the server-side highlighter cannot run in this client component */}
            <Stack gap="sm">
                <Text size="sm" weight="medium">
                    CSS
                </Text>
                <Stack className="relative rounded-xl border border-border bg-muted">
                    <pre className="overflow-x-auto p-4 pr-12 font-mono text-sm leading-6">{css}</pre>
                    <CopyButton value={css} className="absolute top-2 right-2" />
                </Stack>
            </Stack>
        </Stack>
    );
}
