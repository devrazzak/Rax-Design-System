import type { Meta, StoryObj } from '@storybook/react-vite';
import { EyeIcon, SearchIcon } from '@/icons';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';
import { TABS_SIZES, TABS_VARIANTS } from './tabs.variants';

// The controls belong to TabsList, so each story wraps it in Tabs
const meta = {
    title: 'Components/Tabs',
    component: TabsList,
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'inline-radio', options: TABS_VARIANTS },
        size: { control: 'inline-radio', options: TABS_SIZES },
    },
} satisfies Meta<typeof TabsList>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {
    render: args => (
        <Tabs defaultValue="account" className="w-96">
            <TabsList {...args}>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="account">Change your name and email address here.</TabsContent>
            <TabsContent value="password">Update your password here.</TabsContent>
            <TabsContent value="billing">See your plan and invoices here.</TabsContent>
        </Tabs>
    ),
};

export const Line: Story = {
    args: { variant: 'line' },
    render: Default.render,
};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-8">
            {TABS_SIZES.map(size => (
                <Tabs key={size} defaultValue="account" className="w-96">
                    <TabsList {...args} size={size}>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                        <TabsTrigger value="billing">Billing</TabsTrigger>
                    </TabsList>
                </Tabs>
            ))}
        </div>
    ),
};

/** With `orientation="vertical"` the tabs stack on the left and the content sits beside them. */
export const Vertical: Story = {
    render: args => (
        <Tabs defaultValue="account" orientation="vertical" className="w-96">
            <TabsList {...args}>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="account">Change your name and email address here.</TabsContent>
            <TabsContent value="password">Update your password here.</TabsContent>
            <TabsContent value="billing">See your plan and invoices here.</TabsContent>
        </Tabs>
    ),
};

export const VerticalLine: Story = {
    args: { variant: 'line' },
    render: Vertical.render,
};

export const Disabled: Story = {
    render: args => (
        <Tabs defaultValue="account" className="w-96">
            <TabsList {...args}>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="billing" disabled>
                    Billing
                </TabsTrigger>
            </TabsList>
            <TabsContent value="account">Change your name and email address here.</TabsContent>
            <TabsContent value="password">Update your password here.</TabsContent>
        </Tabs>
    ),
};

export const WithIcons: Story = {
    render: args => (
        <Tabs defaultValue="search" className="w-96">
            <TabsList {...args}>
                <TabsTrigger value="search">
                    <SearchIcon />
                    Search
                </TabsTrigger>
                <TabsTrigger value="preview">
                    <EyeIcon />
                    Preview
                </TabsTrigger>
            </TabsList>
            <TabsContent value="search">Search through your files.</TabsContent>
            <TabsContent value="preview">Preview the page before it goes live.</TabsContent>
        </Tabs>
    ),
};
