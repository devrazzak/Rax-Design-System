import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from '@/components/checkbox/checkbox';
import { Input } from '@/components/input/input';
import { RadioGroup, RadioGroupItem } from '@/components/radio-group/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select/select';
import { Switch } from '@/components/switch/switch';
import { Textarea } from '@/components/textarea/textarea';

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from './field';
import { FIELD_ORIENTATIONS } from './field.variants';

const meta = {
    title: 'Components/Field',
    component: Field,
    tags: ['autodocs'],
    argTypes: {
        orientation: { control: 'inline-radio', options: FIELD_ORIENTATIONS },
    },
    decorators: [
        Story => (
            <div className="w-80">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {
    render: args => (
        <Field {...args}>
            <FieldLabel htmlFor="field-story-email">Email</FieldLabel>
            <Input
                id="field-story-email"
                type="email"
                placeholder="you@example.com"
                aria-describedby="field-story-email-hint"
            />
            <FieldDescription id="field-story-email-hint">We never share your email.</FieldDescription>
        </Field>
    ),
};

export const WithError: Story = {
    render: args => (
        <Field {...args} data-invalid>
            <FieldLabel htmlFor="field-story-error">Email</FieldLabel>
            <Input
                id="field-story-error"
                type="email"
                defaultValue="not-an-email"
                aria-invalid
                aria-describedby="field-story-error-message"
            />
            <FieldError id="field-story-error-message">Enter a valid email address.</FieldError>
        </Field>
    ),
};

export const EmptyError: Story = {
    render: args => (
        <Field {...args}>
            <FieldLabel htmlFor="field-story-empty">Email</FieldLabel>
            <Input id="field-story-empty" type="email" />
            <FieldError>{undefined}</FieldError>
        </Field>
    ),
};

export const WithSelect: Story = {
    render: args => (
        <Field {...args}>
            <FieldLabel htmlFor="field-story-country">Country</FieldLabel>
            <Select>
                <SelectTrigger id="field-story-country">
                    <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="bd">Bangladesh</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                </SelectContent>
            </Select>
        </Field>
    ),
};

export const WithTextarea: Story = {
    render: args => (
        <Field {...args}>
            <FieldLabel htmlFor="field-story-bio">Bio</FieldLabel>
            <Textarea
                id="field-story-bio"
                placeholder="Tell us about yourself"
                aria-describedby="field-story-bio-hint"
            />
            <FieldDescription id="field-story-bio-hint">Up to 200 characters.</FieldDescription>
        </Field>
    ),
};

export const HorizontalCheckbox: Story = {
    render: () => (
        <Field orientation="horizontal">
            <Checkbox id="field-story-terms" />
            <FieldLabel htmlFor="field-story-terms">Accept terms and conditions</FieldLabel>
        </Field>
    ),
};

export const HorizontalWithDescription: Story = {
    render: () => (
        <Field orientation="horizontal">
            <Checkbox id="field-story-news" aria-describedby="field-story-news-hint" />
            <FieldContent>
                <FieldLabel htmlFor="field-story-news">Newsletter</FieldLabel>
                <FieldDescription id="field-story-news-hint">Product updates once a month.</FieldDescription>
            </FieldContent>
        </Field>
    ),
};

export const HorizontalSwitch: Story = {
    render: () => (
        <Field orientation="horizontal">
            <FieldContent>
                <FieldLabel htmlFor="field-story-alerts">Email alerts</FieldLabel>
                <FieldDescription id="field-story-alerts-hint">Get an email when something needs you.</FieldDescription>
            </FieldContent>
            <Switch id="field-story-alerts" aria-describedby="field-story-alerts-hint" />
        </Field>
    ),
};

export const RadioGroupInFieldSet: Story = {
    render: () => (
        <FieldSet>
            <FieldLegend>Plan</FieldLegend>
            <FieldDescription>Pick the plan that fits your team.</FieldDescription>
            <RadioGroup defaultValue="free">
                <Field orientation="horizontal">
                    <RadioGroupItem id="field-story-free" value="free" />
                    <FieldLabel htmlFor="field-story-free">Free</FieldLabel>
                </Field>
                <Field orientation="horizontal">
                    <RadioGroupItem id="field-story-pro" value="pro" />
                    <FieldLabel htmlFor="field-story-pro">Pro</FieldLabel>
                </Field>
            </RadioGroup>
        </FieldSet>
    ),
};

export const FormExample: Story = {
    render: () => (
        <FieldGroup>
            <Field data-invalid>
                <FieldLabel htmlFor="field-story-name">Full name</FieldLabel>
                <Input id="field-story-name" aria-invalid aria-describedby="field-story-name-error" />
                <FieldError id="field-story-name-error">Name is required.</FieldError>
            </Field>
            <Field>
                <FieldLabel htmlFor="field-story-mail">Email</FieldLabel>
                <Input id="field-story-mail" type="email" />
            </Field>
            <Field orientation="horizontal">
                <Checkbox id="field-story-agree" />
                <FieldLabel htmlFor="field-story-agree">I agree to the terms</FieldLabel>
            </Field>
        </FieldGroup>
    ),
};
