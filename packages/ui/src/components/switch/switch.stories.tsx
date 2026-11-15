import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '@/components/label/label';

import { Switch } from './switch';
import { SWITCH_SIZES } from './switch.variants';

const meta = {
    title: 'Components/Switch',
    component: Switch,
    tags: ['autodocs'],
    args: { 'aria-label': 'Notifications' },
    argTypes: {
        size: { control: 'inline-radio', options: SWITCH_SIZES },
        disabled: { control: 'boolean' },
    },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Checked: Story = {
    args: { defaultChecked: true },
};

export const WithLabel: Story = {
    render: args => (
        <div className="flex items-center gap-2">
            <Switch id="switch-story-label" {...args} aria-label={undefined} />
            <Label htmlFor="switch-story-label">Email notifications</Label>
        </div>
    ),
};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-4">
            {SWITCH_SIZES.map(size => (
                <div key={size} className="flex items-center gap-6">
                    <Switch {...args} size={size} aria-label={`${size} off`} />
                    <Switch {...args} size={size} defaultChecked aria-label={`${size} on`} />
                    <span className="text-sm text-muted-foreground">{size}</span>
                </div>
            ))}
        </div>
    ),
};

export const Disabled: Story = {
    render: args => (
        <div className="flex gap-6">
            <Switch {...args} disabled aria-label="Disabled off" />
            <Switch {...args} disabled defaultChecked aria-label="Disabled on" />
        </div>
    ),
};

export const Invalid: Story = {
    render: args => (
        <div className="flex gap-6">
            <Switch {...args} aria-invalid aria-label="Invalid off" />
            <Switch {...args} aria-invalid defaultChecked aria-label="Invalid on" />
        </div>
    ),
};
