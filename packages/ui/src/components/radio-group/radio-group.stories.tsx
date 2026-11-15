import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from '@/components/label/label';

import { RadioGroup, RadioGroupItem } from './radio-group';
import { RADIO_GROUP_SIZES } from './radio-group.variants';

const PLANS = [
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise' },
];

/** Radio items with their labels, so the stories do not repeat the same markup. */
function PlanItems({ idPrefix, size }: { idPrefix: string; size?: (typeof RADIO_GROUP_SIZES)[number] }) {
    return PLANS.map(plan => (
        <div key={plan.value} className="flex items-center gap-2">
            <RadioGroupItem id={`${idPrefix}-${plan.value}`} value={plan.value} size={size} />
            <Label htmlFor={`${idPrefix}-${plan.value}`}>{plan.label}</Label>
        </div>
    ));
}

const meta = {
    title: 'Components/RadioGroup',
    component: RadioGroup,
    tags: ['autodocs'],
    args: { defaultValue: 'free', 'aria-label': 'Plan' },
    argTypes: {
        disabled: { control: 'boolean' },
        orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {
    render: args => (
        <RadioGroup {...args}>
            <PlanItems idPrefix="radio-story-default" />
        </RadioGroup>
    ),
};

export const NoDefaultValue: Story = {
    args: { defaultValue: undefined },
    render: args => (
        <RadioGroup {...args}>
            <PlanItems idPrefix="radio-story-none" />
        </RadioGroup>
    ),
};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-6">
            {RADIO_GROUP_SIZES.map(size => (
                <RadioGroup key={size} {...args} aria-label={`${size} size`}>
                    <PlanItems idPrefix={`radio-story-${size}`} size={size} />
                </RadioGroup>
            ))}
        </div>
    ),
};

export const Horizontal: Story = {
    args: { orientation: 'horizontal' },
    render: args => (
        <RadioGroup {...args}>
            <PlanItems idPrefix="radio-story-horizontal" />
        </RadioGroup>
    ),
};

export const DisabledGroup: Story = {
    args: { disabled: true },
    render: args => (
        <RadioGroup {...args}>
            <PlanItems idPrefix="radio-story-disabled" />
        </RadioGroup>
    ),
};

export const DisabledItem: Story = {
    render: args => (
        <RadioGroup {...args}>
            <div className="flex items-center gap-2">
                <RadioGroupItem id="radio-story-item-free" value="free" />
                <Label htmlFor="radio-story-item-free">Free</Label>
            </div>
            <div className="flex items-center gap-2">
                <RadioGroupItem id="radio-story-item-pro" value="pro" disabled />
                <Label htmlFor="radio-story-item-pro">Pro (sold out)</Label>
            </div>
        </RadioGroup>
    ),
};

export const Invalid: Story = {
    render: args => (
        <RadioGroup {...args} defaultValue={undefined} aria-invalid>
            {PLANS.map(plan => (
                <div key={plan.value} className="flex items-center gap-2">
                    <RadioGroupItem id={`radio-story-invalid-${plan.value}`} value={plan.value} aria-invalid />
                    <Label htmlFor={`radio-story-invalid-${plan.value}`}>{plan.label}</Label>
                </div>
            ))}
        </RadioGroup>
    ),
};
