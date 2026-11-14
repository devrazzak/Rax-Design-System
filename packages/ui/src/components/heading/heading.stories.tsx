import type { Meta, StoryObj } from '@storybook/react-vite';

import { Heading } from './heading';
import { HEADING_COLORS, HEADING_SIZES, HEADING_TAGS, HEADING_WEIGHTS } from './heading.variants';

const meta = {
    title: 'Components/Heading',
    component: Heading,
    tags: ['autodocs'],
    args: { children: 'The quick brown fox' },
    argTypes: {
        as: { control: 'select', options: HEADING_TAGS },
        size: { control: 'select', options: HEADING_SIZES },
        weight: { control: 'inline-radio', options: HEADING_WEIGHTS },
        color: { control: 'select', options: HEADING_COLORS },
        children: { control: 'text' },
    },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Tags: Story = {
    render: args => (
        <div className="flex flex-col gap-4">
            {HEADING_TAGS.map(tag => (
                <Heading key={tag} {...args} as={tag}>
                    {tag} heading
                </Heading>
            ))}
        </div>
    ),
};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-4">
            {HEADING_SIZES.map(size => (
                <Heading key={size} {...args} size={size}>
                    {size} size
                </Heading>
            ))}
        </div>
    ),
};

export const Weights: Story = {
    render: args => (
        <div className="flex flex-col gap-4">
            {HEADING_WEIGHTS.map(weight => (
                <Heading key={weight} {...args} weight={weight}>
                    {weight} weight
                </Heading>
            ))}
        </div>
    ),
};

export const Colors: Story = {
    render: args => (
        <div className="flex flex-col gap-4">
            {HEADING_COLORS.map(color => (
                <div key={color} className={color === 'white' ? 'rounded-md bg-black p-3' : 'p-3'}>
                    <Heading {...args} color={color}>
                        {color} color
                    </Heading>
                </div>
            ))}
        </div>
    ),
};

export const SizeIndependentOfTag: Story = {
    render: args => (
        <Heading {...args} as="h3" size="5xl">
            h3 tag with the 5xl size
        </Heading>
    ),
};
