import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from './separator';

const meta = {
    title: 'Components/Separator',
    component: Separator,
    tags: ['autodocs'],
    argTypes: {
        orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
        decorative: { control: 'boolean' },
        asChild: { control: false },
    },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {
    render: args => (
        <div className="w-72">
            <p className="text-sm font-medium">Design System</p>
            <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
            <Separator {...args} className="my-4" />
            <p className="text-sm">Components, tokens and docs in one place.</p>
        </div>
    ),
};

/** A vertical separator stretches to the height of its flex parent. */
export const Vertical: Story = {
    args: { orientation: 'vertical' },
    render: args => (
        <div className="flex h-5 items-center gap-4 text-sm">
            <span>Blog</span>
            <Separator {...args} />
            <span>Docs</span>
            <Separator {...args} />
            <span>Source</span>
        </div>
    ),
};

/** With `decorative={false}` the separator gets `role="separator"`, so screen readers announce it. */
export const Semantic: Story = {
    args: { decorative: false },
    render: args => (
        <div className="w-72 text-sm">
            <p>Account</p>
            <Separator {...args} className="my-4" />
            <p>Billing</p>
        </div>
    ),
};
