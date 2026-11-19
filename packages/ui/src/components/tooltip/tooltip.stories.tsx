import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/button/button';

import type { TooltipContentProps } from './tooltip';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { TOOLTIP_SIZES, TOOLTIP_VARIANTS } from './tooltip.variants';

const SIDES = ['top', 'right', 'bottom', 'left'] as const;

/**
 * Opens only on click. Radix closes a tooltip when its trigger is pressed or clicked, and opens it on hover and
 * focus. Calling `preventDefault` in the two press handlers skips the closing, ignoring `open: true` from Radix
 * skips the hover and focus opening, and the click toggles the `open` state.
 */
function ClickTooltip(args: TooltipContentProps) {
    const [open, setOpen] = useState(false);

    return (
        <Tooltip
            open={open}
            onOpenChange={next => {
                if (!next) setOpen(false);
            }}
        >
            <TooltipTrigger
                asChild
                onPointerDown={event => event.preventDefault()}
                onClick={event => {
                    event.preventDefault();
                    setOpen(current => !current);
                }}
            >
                <Button variant="outline">Click me</Button>
            </TooltipTrigger>
            <TooltipContent {...args} />
        </Tooltip>
    );
}

// The controls belong to TooltipContent, so each story wraps it in Tooltip.
const meta = {
    title: 'Components/Tooltip',
    component: TooltipContent,
    tags: ['autodocs'],
    args: { children: 'Add to library' },
    argTypes: {
        variant: { control: 'select', options: TOOLTIP_VARIANTS },
        size: { control: 'inline-radio', options: TOOLTIP_SIZES },
        side: { control: 'inline-radio', options: SIDES },
    },
} satisfies Meta<typeof TooltipContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
/** Opens when the pointer hovers the button or when it gets keyboard focus. */
export const Default: Story = {
    render: args => (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent {...args} />
        </Tooltip>
    ),
};

/** Opens at once, so the tooltip can be checked without hovering. */
export const Open: Story = {
    render: args => (
        <div className="p-16">
            <Tooltip defaultOpen>
                <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent {...args} />
            </Tooltip>
        </div>
    ),
};

/**
 * Opens only when the button is clicked, not on hover. It closes on a second click, a click outside, Escape,
 * or when the pointer leaves. Made for touch screens, which have no hover. A tooltip should only explain
 * the button, so for content that opens on click, use a Popover instead.
 */
export const OpenOnClick: Story = {
    render: args => <ClickTooltip {...args} />,
};

/** All variants are open at once, so the colors and the arrows can be compared. */
export const Variants: Story = {
    render: args => (
        <div className="flex gap-24 p-16">
            {TOOLTIP_VARIANTS.map(variant => (
                <Tooltip key={variant} defaultOpen>
                    <TooltipTrigger asChild>
                        <Button variant="outline">{variant}</Button>
                    </TooltipTrigger>
                    <TooltipContent {...args} variant={variant}>
                        {variant}
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    ),
};

export const Sizes: Story = {
    render: args => (
        <div className="flex gap-24 p-16">
            {TOOLTIP_SIZES.map(size => (
                <Tooltip key={size} defaultOpen>
                    <TooltipTrigger asChild>
                        <Button variant="outline" size={size}>
                            {size}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent {...args} size={size}>
                        Size {size}
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    ),
};

/** All four sides are open at once, so the arrow of each can be checked. */
export const Sides: Story = {
    render: args => (
        <div className="flex gap-32 p-16">
            {SIDES.map(side => (
                <Tooltip key={side} defaultOpen>
                    <TooltipTrigger asChild>
                        <Button variant="outline">{side}</Button>
                    </TooltipTrigger>
                    <TooltipContent {...args} side={side}>
                        Tooltip on the {side}
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    ),
};

/** A disabled button fires no pointer events, so the tooltip goes on a wrapper around it. */
export const DisabledTrigger: Story = {
    args: { children: 'Add a title before you publish' },
    render: args => (
        <Tooltip>
            <TooltipTrigger asChild>
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- a disabled button cannot be focused, so keyboard users focus the wrapper */}
                <span tabIndex={0} className="inline-block w-fit">
                    <Button disabled className="pointer-events-none">
                        Publish
                    </Button>
                </span>
            </TooltipTrigger>
            <TooltipContent {...args} />
        </Tooltip>
    ),
};

export const LongText: Story = {
    args: {
        children: 'A longer explanation wraps onto a new line once it reaches the maximum width of the tooltip.',
    },
    render: args => (
        <div className="p-16">
            <Tooltip defaultOpen>
                <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent {...args} />
            </Tooltip>
        </div>
    ),
};
