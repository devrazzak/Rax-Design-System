import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/button/button';
import { Field, FieldLabel } from '@/components/field/field';
import { Input } from '@/components/input/input';

import {
    Popover,
    PopoverAnchor,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from './popover';

const SIDES = ['top', 'right', 'bottom', 'left'] as const;
const ALIGNS = ['start', 'center', 'end'] as const;

// The controls belong to PopoverContent, so each story wraps it in Popover.
const meta = {
    title: 'Components/Popover',
    component: PopoverContent,
    tags: ['autodocs'],
    argTypes: {
        side: { control: 'inline-radio', options: SIDES },
        align: { control: 'inline-radio', options: ALIGNS },
        sideOffset: { control: 'number' },
    },
    decorators: [
        Story => (
            <div className="flex min-h-72 items-center justify-center">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof PopoverContent>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
/** Opens on click and closes on outside click or Escape. Use the controls to change side, align and offset. */
export const Default: Story = {
    render: args => (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent {...args}>
                <PopoverHeader>
                    <PopoverTitle>Dimensions</PopoverTitle>
                    <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
                </PopoverHeader>
            </PopoverContent>
        </Popover>
    ),
};

/** Opens at once, so the popover can be checked without clicking. */
export const Open: Story = {
    render: args => (
        <Popover defaultOpen>
            <PopoverTrigger asChild>
                <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent {...args}>
                <PopoverHeader>
                    <PopoverTitle>Dimensions</PopoverTitle>
                    <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
                </PopoverHeader>
            </PopoverContent>
        </Popover>
    ),
};

/** A popover with a small form. Focus moves into the content when it opens and returns to the trigger on close. */
export const WithForm: Story = {
    render: args => (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Edit size</Button>
            </PopoverTrigger>
            <PopoverContent {...args}>
                <PopoverHeader>
                    <PopoverTitle>Dimensions</PopoverTitle>
                    <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
                </PopoverHeader>
                <Field>
                    <FieldLabel htmlFor="popover-width">Width</FieldLabel>
                    <Input id="popover-width" defaultValue="100%" />
                </Field>
                <Field>
                    <FieldLabel htmlFor="popover-height">Height</FieldLabel>
                    <Input id="popover-height" defaultValue="25px" />
                </Field>
            </PopoverContent>
        </Popover>
    ),
};

/** The four sides, opened at once. Radix flips the popover when there is no room on the chosen side. */
export const Sides: Story = {
    decorators: [
        Story => (
            <div className="grid grid-cols-2 gap-x-96 gap-y-48 p-48">
                <Story />
            </div>
        ),
    ],
    render: args => (
        <>
            {SIDES.map(side => (
                <Popover key={side} defaultOpen>
                    <PopoverTrigger asChild>
                        <Button variant="outline">{side}</Button>
                    </PopoverTrigger>
                    <PopoverContent {...args} side={side}>
                        <PopoverDescription>Opens on the {side} side.</PopoverDescription>
                    </PopoverContent>
                </Popover>
            ))}
        </>
    ),
};

/** The content is aligned to the start, center or end of the trigger. */
export const Alignments: Story = {
    decorators: [
        Story => (
            <div className="flex gap-48 p-32">
                <Story />
            </div>
        ),
    ],
    render: args => (
        <>
            {ALIGNS.map(align => (
                <Popover key={align} defaultOpen>
                    <PopoverTrigger asChild>
                        <Button variant="outline">{align}</Button>
                    </PopoverTrigger>
                    <PopoverContent {...args} align={align} className="w-40">
                        <PopoverDescription>Align {align}.</PopoverDescription>
                    </PopoverContent>
                </Popover>
            ))}
        </>
    ),
};

/** `PopoverAnchor` positions the content against another element instead of the trigger. */
export const WithAnchor: Story = {
    render: args => (
        <Popover>
            <PopoverAnchor asChild>
                <div className="flex items-center gap-2 rounded-md border border-border p-2">
                    <span className="text-sm">Anchor element</span>
                    <PopoverTrigger asChild>
                        <Button size="sm" variant="outline">
                            Open
                        </Button>
                    </PopoverTrigger>
                </div>
            </PopoverAnchor>
            <PopoverContent {...args}>
                <PopoverDescription>Positioned against the anchor, not the button.</PopoverDescription>
            </PopoverContent>
        </Popover>
    ),
};

/** The width comes from `className`, because the default is `w-72`. */
export const CustomWidth: Story = {
    render: args => (
        <Popover defaultOpen>
            <PopoverTrigger asChild>
                <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent {...args} className="w-96">
                <PopoverHeader>
                    <PopoverTitle>Wide popover</PopoverTitle>
                    <PopoverDescription>This content uses `w-96` instead of the default width.</PopoverDescription>
                </PopoverHeader>
            </PopoverContent>
        </Popover>
    ),
};
