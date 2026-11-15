import type { ComponentProps } from 'react';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '@/components/label/label';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from './select';
import { SELECT_SIZES } from './select.variants';

type SelectDemoProps = Pick<ComponentProps<typeof SelectTrigger>, 'size' | 'id' | 'aria-invalid'> & {
    disabled?: boolean;
    position?: ComponentProps<typeof SelectContent>['position'];
};

/** Select is a set of parts, so the stories use one small demo to show its props together. */
function SelectDemo({ size, id, disabled, position, 'aria-invalid': ariaInvalid }: SelectDemoProps) {
    return (
        <Select disabled={disabled}>
            <SelectTrigger id={id} size={size} aria-invalid={ariaInvalid}>
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent position={position}>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
        </Select>
    );
}

/** Keeps the chosen value in state, so the story can show what the parent receives. */
function ControlledSelect() {
    const [value, setValue] = useState('');

    return (
        <div className="flex flex-col gap-3">
            <Select value={value} onValueChange={setValue}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Value: {value || 'none'}</p>
        </div>
    );
}

const meta = {
    title: 'Components/Select',
    component: SelectDemo,
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'inline-radio', options: SELECT_SIZES },
        position: { control: 'inline-radio', options: ['popper', 'item-aligned'] },
        disabled: { control: 'boolean' },
        'aria-invalid': { control: 'boolean' },
    },
    decorators: [
        Story => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof SelectDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-3">
            {SELECT_SIZES.map(size => (
                <SelectDemo key={size} {...args} size={size} />
            ))}
        </div>
    ),
};

export const WithLabel: Story = {
    render: args => (
        <div className="flex flex-col gap-2">
            <Label htmlFor="select-story-fruit">Favorite fruit</Label>
            <SelectDemo {...args} id="select-story-fruit" />
        </div>
    ),
};

/** onValueChange receives the item's value ("banana"), not its label ("Banana"). */
export const Controlled: Story = { render: () => <ControlledSelect /> };

export const WithGroups: Story = {
    render: () => (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Select a food" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                    <SelectLabel>Vegetables</SelectLabel>
                    <SelectItem value="carrot">Carrot</SelectItem>
                    <SelectItem value="potato">Potato</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    ),
};

const NUMBERED_OPTIONS = Array.from({ length: 30 }, (_, index) => `Option ${String(index + 1)}`);

/** The list scrolls when it is taller than the space available on screen. */
export const Scrollable: Story = {
    render: () => (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
                {NUMBERED_OPTIONS.map(option => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    ),
};

export const DisabledItem: Story = {
    render: () => (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="enterprise" disabled>
                    Enterprise
                </SelectItem>
            </SelectContent>
        </Select>
    ),
};

export const ItemAligned: Story = { args: { position: 'item-aligned' } };

export const Disabled: Story = { args: { disabled: true } };

export const Invalid: Story = { args: { 'aria-invalid': true } };
