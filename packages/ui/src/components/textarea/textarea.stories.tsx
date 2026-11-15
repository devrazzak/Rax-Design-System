import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '@/components/label/label';

import { Textarea } from './textarea';
import { TEXTAREA_SIZES } from './textarea.variants';

const meta = {
    title: 'Components/Textarea',
    component: Textarea,
    tags: ['autodocs'],
    args: { placeholder: 'Write your message' },
    argTypes: {
        size: { control: 'inline-radio', options: TEXTAREA_SIZES },
        disabled: { control: 'boolean' },
        placeholder: { control: 'text' },
        rows: { control: 'number' },
    },
    decorators: [
        Story => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-3">
            {TEXTAREA_SIZES.map(size => (
                <Textarea key={size} {...args} size={size} placeholder={`${size} size`} />
            ))}
        </div>
    ),
};

export const WithLabel: Story = {
    render: args => (
        <div className="flex flex-col gap-2">
            <Label htmlFor="textarea-story-message">Message</Label>
            <Textarea {...args} id="textarea-story-message" />
        </div>
    ),
};

/** The textarea grows with its content in browsers that support `field-sizing`. */
export const AutoGrow: Story = {
    args: {
        defaultValue: 'Keep typing and this field gets taller.\nEach new line adds more height.\nTry it.',
    },
};

/** Past the maximum height the textarea stops growing and scrolls instead. */
export const MaxHeight: Story = {
    args: {
        defaultValue: Array.from({ length: 20 }, (_, index) => `Line ${String(index + 1)}`).join('\n'),
    },
};

export const WithRows: Story = { args: { rows: 6 } };

export const Disabled: Story = {
    args: { disabled: true, defaultValue: 'Disabled value' },
};

export const Invalid: Story = {
    args: { 'aria-invalid': true, defaultValue: 'Too short' },
};
