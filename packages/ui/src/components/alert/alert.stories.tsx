import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleAlertIcon, InfoIcon } from '@/icons';

import { Button } from '@/components/button/button';

import { Alert, AlertAction, AlertDescription, AlertTitle } from './alert';
import { ALERT_VARIANTS } from './alert.variants';

const meta = {
    title: 'Components/Alert',
    component: Alert,
    tags: ['autodocs'],
    args: { className: 'max-w-md' },
    argTypes: {
        variant: { control: 'inline-radio', options: ALERT_VARIANTS },
    },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {
    render: args => (
        <Alert {...args}>
            <InfoIcon />
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>You can change your notification settings at any time in your profile.</AlertDescription>
        </Alert>
    ),
};

export const Destructive: Story = {
    args: { variant: 'destructive' },
    render: args => (
        <Alert {...args}>
            <CircleAlertIcon />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>Your changes could not be saved. Check your connection and try again.</AlertDescription>
        </Alert>
    ),
};

export const Info: Story = {
    args: { variant: 'info' },
    render: args => (
        <Alert {...args}>
            <InfoIcon />
            <AlertTitle>New version available</AlertTitle>
            <AlertDescription>Version 2.0 is ready. Update when you are ready.</AlertDescription>
        </Alert>
    ),
};

export const Warning: Story = {
    args: { variant: 'warning' },
    render: args => (
        <Alert {...args}>
            <CircleAlertIcon />
            <AlertTitle>Storage almost full</AlertTitle>
            <AlertDescription>You have used 95% of your storage. Free some space soon.</AlertDescription>
        </Alert>
    ),
};

/** The `-subtle` variants fill the alert with a light tint instead of the card background. */
export const Subtle: Story = {
    render: args => (
        <div className="flex flex-col gap-4">
            <Alert {...args} variant="info-subtle">
                <InfoIcon />
                <AlertTitle>Heads up</AlertTitle>
                <AlertDescription>You can change this setting later.</AlertDescription>
            </Alert>
            <Alert {...args} variant="warning-subtle">
                <CircleAlertIcon />
                <AlertTitle>Storage almost full</AlertTitle>
                <AlertDescription>Free some space soon.</AlertDescription>
            </Alert>
            <Alert {...args} variant="destructive-subtle">
                <CircleAlertIcon />
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription>Your changes could not be saved.</AlertDescription>
            </Alert>
        </div>
    ),
};

export const Variants: Story = {
    render: args => (
        <div className="flex flex-col gap-4">
            {ALERT_VARIANTS.map(variant => (
                <Alert key={variant} {...args} variant={variant}>
                    <AlertTitle>{variant}</AlertTitle>
                    <AlertDescription>This is the {variant} alert.</AlertDescription>
                </Alert>
            ))}
        </div>
    ),
};

export const TitleOnly: Story = {
    render: args => (
        <Alert {...args}>
            <AlertTitle>Your changes were saved.</AlertTitle>
        </Alert>
    ),
};

/** The action sits in the top-right corner, and the alert makes room for it. */
export const WithAction: Story = {
    render: args => (
        <Alert {...args}>
            <AlertTitle>Post deleted</AlertTitle>
            <AlertDescription>The post was moved to the trash.</AlertDescription>
            <AlertAction>
                <Button variant="outline" size="sm">
                    Undo
                </Button>
            </AlertAction>
        </Alert>
    ),
};

export const WithLink: Story = {
    render: args => (
        <Alert {...args}>
            <AlertTitle>New version available</AlertTitle>
            <AlertDescription>
                Read the <a href="#changelog">changelog</a> before you update.
            </AlertDescription>
        </Alert>
    ),
};
