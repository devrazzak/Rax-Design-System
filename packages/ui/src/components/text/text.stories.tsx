import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from './text';
import {
    TEXT_ALIGNS,
    TEXT_COLORS,
    TEXT_DISPLAYS,
    TEXT_JUSTIFIES,
    TEXT_SIZES,
    TEXT_TAGS,
    TEXT_TEXT_ALIGNS,
    TEXT_TRACKINGS,
    TEXT_TRANSFORMS,
    TEXT_WEIGHTS,
} from './text.variants';

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
        display: { control: 'select', options: TEXT_DISPLAYS },
        textAlign: { control: 'inline-radio', options: TEXT_TEXT_ALIGNS },
        textTransform: { control: 'inline-radio', options: TEXT_TRANSFORMS },
        tracking: { control: 'select', options: TEXT_TRACKINGS },
        align: { control: 'select', options: TEXT_ALIGNS },
        justify: { control: 'select', options: TEXT_JUSTIFIES },
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

export const TextTransforms: Story = {
    render: args => (
        <div className="flex flex-col gap-3">
            {TEXT_TRANSFORMS.map(textTransform => (
                <Text key={textTransform} {...args} textTransform={textTransform}>
                    {textTransform}: the quick brown fox
                </Text>
            ))}
        </div>
    ),
};

export const Trackings: Story = {
    render: args => (
        <div className="flex flex-col gap-3">
            {TEXT_TRACKINGS.map(tracking => (
                <Text key={tracking} {...args} tracking={tracking}>
                    {tracking}: the quick brown fox
                </Text>
            ))}
        </div>
    ),
};

export const Eyebrow: Story = {
    args: { size: 'xs', weight: 'semibold', textTransform: 'uppercase', tracking: 'widest', children: 'Eyebrow label' },
};

/** `align` only works with `display="flex"` or `display="inlineFlex"`. */
export const Aligns: Story = {
    render: args => (
        <div className="flex flex-col gap-3">
            {TEXT_ALIGNS.map(align => (
                <Text key={align} {...args} display="flex" align={align} className="h-16 gap-2 rounded-md border">
                    <span>{align}</span>
                    <span>aligned</span>
                </Text>
            ))}
        </div>
    ),
};

export const TextAligns: Story = {
    render: args => (
        <div className="flex flex-col gap-3">
            {TEXT_TEXT_ALIGNS.map(textAlign => (
                <Text key={textAlign} {...args} textAlign={textAlign} className="rounded-md border p-2">
                    {textAlign}: the quick brown fox jumps over the lazy dog
                </Text>
            ))}
        </div>
    ),
};

/** `justify` only works with `display="flex"` or `display="inlineFlex"`. */
export const Justifies: Story = {
    render: args => (
        <div className="flex flex-col gap-3">
            {TEXT_JUSTIFIES.map(justify => (
                <Text key={justify} {...args} display="flex" justify={justify} className="gap-2 rounded-md border p-2">
                    <span>{justify}</span>
                    <span>justified</span>
                </Text>
            ))}
        </div>
    ),
};
