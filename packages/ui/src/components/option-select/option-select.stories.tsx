import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '@/components/label/label';
import { SELECT_SIZES } from '@/components/select/select.variants';

import type { OptionSelectOption } from './option-select';
import { OptionSelect } from './option-select';

const FRUITS: OptionSelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
];

/** Keeps the chosen value in state, so the story can show what the parent receives. */
function ControlledOptionSelect() {
    const [value, setValue] = useState('');

    return (
        <div className="flex flex-col gap-3">
            <OptionSelect options={FRUITS} placeholder="Select a fruit" value={value} onValueChange={setValue} />
            <p className="text-sm text-muted-foreground">Value: {value || 'none'}</p>
        </div>
    );
}

const meta = {
    title: 'Components/OptionSelect',
    component: OptionSelect,
    tags: ['autodocs'],
    args: { options: FRUITS, placeholder: 'Select a fruit' },
    argTypes: {
        size: { control: 'inline-radio', options: SELECT_SIZES },
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
} satisfies Meta<typeof OptionSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-3">
            {SELECT_SIZES.map(size => (
                <OptionSelect key={size} {...args} size={size} />
            ))}
        </div>
    ),
};

export const WithLabel: Story = {
    render: args => (
        <div className="flex flex-col gap-2">
            <Label htmlFor="option-select-story-fruit">Favorite fruit</Label>
            <OptionSelect {...args} id="option-select-story-fruit" />
        </div>
    ),
};

/** onValueChange receives the option's value ("banana"), not its label ("Banana"). */
export const Controlled: Story = { render: () => <ControlledOptionSelect /> };

/** Start from the `value` of an option. It shows the matching label in the trigger. */
export const WithDefaultValue: Story = { args: { defaultValue: 'banana' } };

/** The values are always strings. Convert an id with `String(id)` when building the options. */
export const FromData: Story = {
    render: args => {
        const categories = [
            { id: 1, name: 'News' },
            { id: 2, name: 'Events' },
            { id: 3, name: 'Stories' },
        ];

        return (
            <OptionSelect
                {...args}
                placeholder="Select a category"
                options={categories.map(category => ({ value: String(category.id), label: category.name }))}
            />
        );
    },
};

export const DisabledOption: Story = {
    args: {
        placeholder: 'Select a plan',
        options: [
            { value: 'free', label: 'Free' },
            { value: 'pro', label: 'Pro' },
            { value: 'enterprise', label: 'Enterprise', disabled: true },
        ],
    },
};

export const Disabled: Story = { args: { disabled: true } };

export const Invalid: Story = { args: { 'aria-invalid': true } };
