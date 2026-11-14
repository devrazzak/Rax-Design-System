import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRightIcon, Mail } from 'lucide-react';

import { Button } from './button';
import { BUTTON_SIZES, BUTTON_VARIANTS } from './button.variants';

const meta = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    args: { children: 'Button' },
    argTypes: {
        variant: {
            control: 'select',
            options: BUTTON_VARIANTS,
        },
        size: {
            control: 'inline-radio',
            options: BUTTON_SIZES,
        },
        disabled: { control: 'boolean' },
        loading: {
            control: 'boolean',
            description:
                'Shows a spinner, blocks clicks and form submission, and keeps keyboard focus. Every icon passed as children is hidden while loading, so only the spinner shows.',
        },
        loadingPosition: {
            control: 'inline-radio',
            options: ['start', 'end'],
            description: 'Which side of the label the spinner appears on while loading.',
        },
        asChild: { control: false },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Primary: Story = { args: { variant: 'primary' } };

export const Secondary: Story = { args: { variant: 'secondary' } };

export const Outline: Story = { args: { variant: 'outline' } };

export const Ghost: Story = { args: { variant: 'ghost' } };

export const Destructive: Story = { args: { variant: 'destructive' } };

export const Link: Story = { args: { variant: 'link' } };

export const LinkInverse: Story = {
    args: { variant: 'linkInverse' },
    decorators: [
        Story => (
            <div className="rounded-lg bg-foreground p-4">
                <Story />
            </div>
        ),
    ],
};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            {BUTTON_SIZES.map(size => (
                <Button key={size} {...args} size={size}>
                    {size}
                </Button>
            ))}
        </div>
    ),
};

export const IconStart: Story = {
    args: {
        children: (
            <>
                <Mail data-icon="inline-start" aria-hidden="true" />
                Send email
            </>
        ),
    },
};

export const IconEnd: Story = {
    args: {
        children: (
            <>
                Continue
                <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
            </>
        ),
    },
};

export const IconOnly: Story = { args: { 'aria-label': 'Send email', children: <Mail aria-hidden="true" /> } };

export const Disabled: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            {BUTTON_VARIANTS.filter(variant => variant !== 'linkInverse').map(variant => (
                <Button key={variant} {...args} variant={variant} disabled>
                    {variant}
                </Button>
            ))}
        </div>
    ),
};

export const Invalid: Story = { args: { variant: 'outline', 'aria-invalid': true } };

export const AsChildLink: Story = { args: { asChild: true, children: <a href="/dashboard">Go to dashboard</a> } };

/** While loading, the button ignores clicks, keeps keyboard focus, and hides every icon passed as children: only the spinner shows. */
export const Loading: Story = { args: { loading: true, children: 'Save' } };

export const LoadingPosition: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            <Button {...args} loading loadingPosition="start">
                Start
            </Button>
            <Button {...args} loading>
                End (default)
            </Button>
        </div>
    ),
};
