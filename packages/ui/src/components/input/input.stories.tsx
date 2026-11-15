import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '@/components/label/label';

import { Input } from './input';
import { INPUT_SIZES } from './input.variants';

const meta = {
    title: 'Components/Input',
    component: Input,
    tags: ['autodocs'],
    args: { placeholder: 'Enter text' },
    argTypes: {
        size: { control: 'inline-radio', options: INPUT_SIZES },
        disabled: { control: 'boolean' },
        placeholder: { control: 'text' },
    },
    decorators: [
        Story => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-3">
            {INPUT_SIZES.map(size => (
                <Input key={size} {...args} size={size} placeholder={`${size} size`} />
            ))}
        </div>
    ),
};

export const WithLabel: Story = {
    render: args => (
        <div className="flex flex-col gap-2">
            <Label htmlFor="input-story-email">Email address</Label>
            <Input {...args} id="input-story-email" type="email" placeholder="name@example.com" />
        </div>
    ),
};

export const Invalid: Story = {
    args: { 'aria-invalid': true, defaultValue: 'not-an-email' },
};

export const Disabled: Story = {
    args: { disabled: true, defaultValue: 'Disabled value' },
};
