import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from './text';
import { TEXT_COLORS, TEXT_SIZES, TEXT_TAGS, TEXT_WEIGHTS } from './text.variants';

const meta = {
    title: 'Components/Text',
    component: Text,
    tags: ['autodocs'],
    args: { children: 'The quick brown fox jumps over the lazy dog' },
    argTypes: {
        as: { control: 'inline-radio', options: TEXT_TAGS },
        size: { control: 'select', options: TEXT_SIZES },
        weight: { control: 'inline-radio', options: TEXT_WEIGHTS },
        color: { control: 'select', options: TEXT_COLORS },
        children: { control: 'text' },
    },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-3">
            {TEXT_SIZES.map(size => (
                <Text key={size} {...args} size={size}>
                    {size} size
                </Text>
            ))}
        </div>
    ),
};

export const Weights: Story = {
    render: args => (
        <div className="flex flex-col gap-3">
            {TEXT_WEIGHTS.map(weight => (
                <Text key={weight} {...args} weight={weight}>
                    {weight} weight
                </Text>
            ))}
        </div>
    ),
};

export const Colors: Story = {
    render: args => (
        <div className="flex flex-col gap-3">
            {TEXT_COLORS.map(color => (
                <div key={color} className={color === 'white' ? 'rounded-md bg-black p-3' : 'p-3'}>
                    <Text {...args} color={color}>
                        {color} color
                    </Text>
                </div>
            ))}
        </div>
    ),
};

export const Inline: Story = {
    render: args => (
        <Text {...args}>
            Some text with{' '}
            <Text as="span" weight="bold">
                bold inline
            </Text>{' '}
            words inside.
        </Text>
    ),
};
