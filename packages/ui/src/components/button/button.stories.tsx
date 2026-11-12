import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail, Trash2 } from 'lucide-react';

import { Button } from './button';

const meta = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    args: { children: 'Button' },
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'icon'],
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: 'secondary' } };

export const Outline: Story = { args: { variant: 'outline' } };

export const Ghost: Story = { args: { variant: 'ghost' } };

export const Link: Story = { args: { variant: 'link' } };

export const Destructive: Story = {
    args: {
        variant: 'destructive',
        children: (
            <>
                <Trash2 aria-hidden />
                Delete
            </>
        ),
    },
};

export const WithIcon: Story = {
    args: {
        children: (
            <>
                <Mail aria-hidden />
                Send email
            </>
        ),
    },
};

/** Icon-only buttons must have an aria-label, otherwise screen readers announce nothing. */
export const IconOnly: Story = {
    args: {
        size: 'icon',
        'aria-label': 'Send email',
        children: <Mail aria-hidden />,
    },
};

export const Disabled: Story = { args: { disabled: true } };

/** Renders a real <a> element styled as a button. */
export const AsChildLink: Story = {
    args: {
        asChild: true,
        children: <a href="/dashboard">Go to dashboard</a>,
    },
};
export const Loading: Story = {
    args: {
        loading: true,
        children: 'Saving',
    },
};

/** Click repeatedly: only one click is handled every 2 seconds, and keyboard focus stays on the button. */
function LoadingDemo() {
    const [loading, setLoading] = useState(false);
    const [handledClicks, setHandledClicks] = useState(0);

    const handleClick = () => {
        setHandledClicks(count => count + 1);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="flex items-center gap-4">
            <Button loading={loading} onClick={handleClick}>
                Donate
            </Button>
            <span className="text-sm text-muted-foreground">Handled clicks: {handledClicks}</span>
        </div>
    );
}

export const LoadingInteractive: Story = {
    render: () => <LoadingDemo />,
};

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Delete</Button>
            <LoadingDemo />
        </div>
    ),
};
