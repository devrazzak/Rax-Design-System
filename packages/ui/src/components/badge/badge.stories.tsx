import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckIcon } from '@/icons';

import { Badge } from './badge';
import { BADGE_SIZES, BADGE_VARIANTS } from './badge.variants';

const meta = {
    title: 'Components/Badge',
    component: Badge,
    tags: ['autodocs'],
    args: { children: 'Badge' },
    argTypes: {
        variant: { control: 'select', options: BADGE_VARIANTS },
        size: { control: 'inline-radio', options: BADGE_SIZES },
        asChild: { control: false },
    },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Variants: Story = {
    render: args => (
        // A muted background, so the white variant can be seen
        <div className="flex flex-wrap items-center gap-3 rounded-md bg-muted p-4">
            {BADGE_VARIANTS.map(variant => (
                <Badge key={variant} {...args} variant={variant}>
                    {variant}
                </Badge>
            ))}
        </div>
    ),
};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            {BADGE_SIZES.map(size => (
                <Badge key={size} {...args} size={size}>
                    {size}
                </Badge>
            ))}
        </div>
    ),
};

export const WithIcon: Story = {
    args: {
        children: (
            <>
                <CheckIcon />
                Verified
            </>
        ),
    },
};

/** With `asChild` the badge becomes a link and gets a hover color. A plain badge has none. */
export const AsLink: Story = {
    args: { asChild: true },
    render: args => (
        <Badge {...args}>
            <a href="#details">Details</a>
        </Badge>
    ),
};
