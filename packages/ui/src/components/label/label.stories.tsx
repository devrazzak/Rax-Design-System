import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from './label';
import { LABEL_SIZES } from './label.variants';

const meta = {
    title: 'Components/Label',
    component: Label,
    tags: ['autodocs'],
    args: { children: 'Email address' },
    argTypes: {
        size: { control: 'inline-radio', options: LABEL_SIZES },
        children: { control: 'text' },
    },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-3">
            {LABEL_SIZES.map(size => (
                <Label key={size} {...args} size={size}>
                    {size} size
                </Label>
            ))}
        </div>
    ),
};

export const WithControl: Story = {
    render: args => (
        <div className="flex flex-col gap-2">
            <Label {...args} htmlFor="label-story-email" />
            <input id="label-story-email" type="email" className="h-10 rounded-md border border-border px-3" />
        </div>
    ),
};

export const DisabledControl: Story = {
    render: args => (
        <div className="flex flex-col gap-2">
            <input
                id="label-story-disabled"
                type="email"
                disabled
                className="peer order-2 h-10 rounded-md border border-border px-3"
            />
            <Label {...args} htmlFor="label-story-disabled" className="order-1" />
        </div>
    ),
};
