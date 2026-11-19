import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail } from 'lucide-react';

import { BUTTON_VARIANTS } from '@/components/button/button.variants';
import { TooltipProvider } from '@/components/tooltip/tooltip';

import { IconButton } from './icon-button';
import { ICON_BUTTON_ROUNDEDS, ICON_BUTTON_SIZES } from './icon-button.variants';

const meta = {
    title: 'Components/IconButton',
    component: IconButton,
    tags: ['autodocs'],
    args: { label: 'Send email', children: <Mail aria-hidden="true" /> },
    argTypes: {
        variant: { control: 'select', options: BUTTON_VARIANTS },
        size: { control: 'inline-radio', options: ICON_BUTTON_SIZES },
        rounded: { control: 'inline-radio', options: ICON_BUTTON_ROUNDEDS },
        tooltip: { control: 'boolean' },
        disabled: { control: 'boolean' },
        children: { control: false },
    },
    // Tooltips need one TooltipProvider above them. In an app it sits once at the root.
    decorators: [
        Story => (
            <TooltipProvider>
                <Story />
            </TooltipProvider>
        ),
    ],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Variants: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            {BUTTON_VARIANTS.filter(variant => variant !== 'linkWhite' && variant !== 'white').map(variant => (
                <IconButton key={variant} {...args} variant={variant} label={variant} />
            ))}
        </div>
    ),
};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            {ICON_BUTTON_SIZES.map(size => (
                <IconButton key={size} {...args} size={size} label={`${size} size`} />
            ))}
        </div>
    ),
};

export const Rounded: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            {ICON_BUTTON_ROUNDEDS.map(rounded => (
                <IconButton key={rounded} {...args} rounded={rounded} label={`${rounded} rounded`} />
            ))}
        </div>
    ),
};

export const WithoutTooltip: Story = { args: { tooltip: false } };

export const Disabled: Story = { args: { disabled: true } };
