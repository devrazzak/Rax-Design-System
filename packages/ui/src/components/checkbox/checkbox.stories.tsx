import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '@/components/label/label';

import { Checkbox } from './checkbox';
import { CHECKBOX_SIZES } from './checkbox.variants';

const FRUITS = ['Apple', 'Banana', 'Orange'];

/** A "select all" checkbox that shows a minus while only some items are selected. */
function SelectAllExample() {
    const [selected, setSelected] = useState<string[]>(['Apple']);
    const allSelected = selected.length === FRUITS.length;
    const someSelected = selected.length > 0 && !allSelected;

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <Checkbox
                    id="checkbox-story-all"
                    checked={allSelected || (someSelected && 'indeterminate')}
                    onCheckedChange={checked => {
                        setSelected(checked === true ? FRUITS : []);
                    }}
                />
                <Label htmlFor="checkbox-story-all">Select all</Label>
            </div>
            {FRUITS.map(fruit => (
                <div key={fruit} className="flex items-center gap-2 pl-6">
                    <Checkbox
                        id={`checkbox-story-${fruit}`}
                        checked={selected.includes(fruit)}
                        onCheckedChange={checked => {
                            setSelected(current =>
                                checked === true ? [...current, fruit] : current.filter(item => item !== fruit),
                            );
                        }}
                    />
                    <Label htmlFor={`checkbox-story-${fruit}`}>{fruit}</Label>
                </div>
            ))}
        </div>
    );
}

const meta = {
    title: 'Components/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    args: { 'aria-label': 'Accept terms' },
    argTypes: {
        size: { control: 'inline-radio', options: CHECKBOX_SIZES },
        disabled: { control: 'boolean' },
        checked: { control: 'inline-radio', options: [true, false, 'indeterminate'] },
    },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Checked: Story = { args: { defaultChecked: true } };

export const Indeterminate: Story = { args: { checked: 'indeterminate' } };

export const Sizes: Story = {
    render: args => (
        <div className="flex items-center gap-4">
            {CHECKBOX_SIZES.map(size => (
                <Checkbox key={size} {...args} size={size} defaultChecked aria-label={`${size} size`} />
            ))}
        </div>
    ),
};

export const WithLabel: Story = {
    render: args => (
        <div className="flex items-center gap-2">
            <Checkbox {...args} id="checkbox-story-terms" aria-label={undefined} />
            <Label htmlFor="checkbox-story-terms">Accept terms and conditions</Label>
        </div>
    ),
};

export const SelectAll: Story = { render: () => <SelectAllExample /> };

export const Disabled: Story = {
    render: args => (
        <div className="flex items-center gap-4">
            <Checkbox {...args} disabled aria-label="Disabled unchecked" />
            <Checkbox {...args} disabled defaultChecked aria-label="Disabled checked" />
        </div>
    ),
};

export const Invalid: Story = {
    render: args => (
        <div className="flex items-center gap-4">
            <Checkbox {...args} aria-invalid aria-label="Invalid unchecked" />
            <Checkbox {...args} aria-invalid defaultChecked aria-label="Invalid checked" />
        </div>
    ),
};
