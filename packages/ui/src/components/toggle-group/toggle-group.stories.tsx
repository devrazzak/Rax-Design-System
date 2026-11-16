import type { ReactNode } from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { EyeIcon, InfoIcon, SearchIcon } from '@/icons';

import { TOGGLE_SIZES, TOGGLE_VARIANTS } from '@/components/toggle/toggle.variants';

import type { ToggleGroupProps } from './toggle-group';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';

const SPACINGS = ['default', 'none'] as const;

const FORMATS = ['Bold', 'Italic', 'Underline'];

/** Radix props that depend on `type`. The stories set them through `selected`, so the controls stay simple. */
type GroupProps = Omit<ToggleGroupProps, 'value' | 'defaultValue' | 'onValueChange'>;

function FormatItems() {
    return FORMATS.map(format => (
        <ToggleGroupItem key={format} value={format.toLowerCase()}>
            {format}
        </ToggleGroupItem>
    ));
}

/**
 * Radix needs a different `defaultValue` for each `type`. This demo takes a list in `selected`,
 * so the stories do not repeat the single and multiple branches.
 */
function Group({
    selected = [],
    children = <FormatItems />,
    ...props
}: GroupProps & { selected?: string[]; children?: ReactNode }) {
    return props.type === 'single' ? (
        <ToggleGroup {...props} type="single" defaultValue={selected[0]}>
            {children}
        </ToggleGroup>
    ) : (
        <ToggleGroup {...props} type="multiple" defaultValue={selected}>
            {children}
        </ToggleGroup>
    );
}

// The controls belong to ToggleGroup. Radix needs `type`, so every story passes it through the demo above.
const meta = {
    title: 'Components/ToggleGroup',
    component: ToggleGroup,
    tags: ['autodocs'],
    args: { type: 'multiple' },
    argTypes: {
        type: { control: 'inline-radio', options: ['single', 'multiple'] },
        variant: { control: 'inline-radio', options: TOGGLE_VARIANTS },
        size: { control: 'inline-radio', options: TOGGLE_SIZES },
        spacing: { control: 'inline-radio', options: SPACINGS },
        orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
        disabled: { control: 'boolean' },
    },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Keeps the selected value in the parent, so the text below can follow it. */
function ControlledGroup(args: GroupProps) {
    const [value, setValue] = useState('left');

    return (
        <div className="flex flex-col gap-3">
            <ToggleGroup
                {...args}
                type="single"
                value={value}
                // Radix sends an empty string when the pressed item is pressed again, so the last value is kept.
                onValueChange={next => {
                    if (next) setValue(next);
                }}
            >
                <ToggleGroupItem value="left">Left</ToggleGroupItem>
                <ToggleGroupItem value="center">Center</ToggleGroupItem>
                <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>
            <p className="text-sm text-muted-foreground">Selected: {value}</p>
        </div>
    );
}

/* stories */
/** Several items can be on at the same time. Use the controls to change every prop. */
export const Default: Story = {
    render: args => <Group {...args} />,
};

/** Only one item can be on. Pressing the active item again turns it off. */
export const Single: Story = {
    args: { type: 'single' },
    render: args => <Group {...args} selected={['bold']} />,
};

/** The group sets the variant for every item. */
export const Variants: Story = {
    render: args => (
        <div className="flex flex-col items-start gap-4">
            {TOGGLE_VARIANTS.map(variant => (
                <Group key={variant} {...args} variant={variant} selected={['bold']} />
            ))}
        </div>
    ),
};

/** The group sets the size for every item. */
export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col items-start gap-4">
            {TOGGLE_SIZES.map(size => (
                <Group key={size} {...args} variant="outline" size={size} />
            ))}
        </div>
    ),
};

/** `spacing="none"` joins the items into one bar. Only the outer corners are rounded. */
export const Spacing: Story = {
    render: args => (
        <div className="flex flex-col items-start gap-4">
            {SPACINGS.flatMap(spacing =>
                TOGGLE_VARIANTS.map(variant => (
                    <Group
                        key={`${spacing}-${variant}`}
                        {...args}
                        spacing={spacing}
                        variant={variant}
                        selected={['italic']}
                    />
                )),
            )}
        </div>
    ),
};

export const Vertical: Story = {
    args: { orientation: 'vertical' },
    render: args => (
        <div className="flex items-start gap-8">
            {SPACINGS.map(spacing => (
                <Group key={spacing} {...args} spacing={spacing} variant="outline" />
            ))}
        </div>
    ),
};

export const Disabled: Story = {
    args: { disabled: true, variant: 'outline' },
    render: args => <Group {...args} selected={['bold']} />,
};

/** Items with only an icon need an `aria-label`, because they have no visible text. Icons and text also work together. */
export const WithIcons: Story = {
    args: { variant: 'outline' },
    render: args => (
        <div className="flex flex-col items-start gap-4">
            <Group {...args}>
                <ToggleGroupItem value="search" aria-label="Search">
                    <SearchIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="view" aria-label="View">
                    <EyeIcon />
                </ToggleGroupItem>
                <ToggleGroupItem value="info" aria-label="Info">
                    <InfoIcon />
                </ToggleGroupItem>
            </Group>
            <Group {...args}>
                <ToggleGroupItem value="search">
                    <SearchIcon />
                    Search
                </ToggleGroupItem>
                <ToggleGroupItem value="view">
                    <EyeIcon />
                    View
                </ToggleGroupItem>
                <ToggleGroupItem value="info">
                    <InfoIcon />
                    Info
                </ToggleGroupItem>
            </Group>
        </div>
    ),
};

/** One item can be disabled while the others stay usable. */
export const DisabledItem: Story = {
    args: { variant: 'outline' },
    render: args => (
        <Group {...args}>
            <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
            <ToggleGroupItem value="italic" disabled>
                Italic
            </ToggleGroupItem>
            <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </Group>
    ),
};

/** The selected value lives in the parent. At least one item always stays selected. */
export const Controlled: Story = {
    args: { variant: 'outline' },
    render: args => <ControlledGroup {...args} />,
};
