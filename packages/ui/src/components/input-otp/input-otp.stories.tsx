import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/field/field';

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
    REGEXP_ONLY_DIGITS,
    REGEXP_ONLY_DIGITS_AND_CHARS,
} from './input-otp';
import { INPUT_OTP_SIZES } from './input-otp.variants';

/** Six slots in two groups. The stories share it so they only show what they change. */
const sixSlots = (
    <>
        <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
        </InputOTPGroup>
    </>
);

/** Uses state, so it lives in its own component instead of a story render function. */
function ControlledDemo() {
    const [value, setValue] = useState('');

    return (
        <div className="flex flex-col gap-3">
            <InputOTP maxLength={6} value={value} onChange={setValue} aria-label="Verification code">
                {sixSlots}
            </InputOTP>
            <p className="text-sm text-muted-foreground">
                {value === '' ? 'Enter your code.' : `You entered: ${value}`}
            </p>
        </div>
    );
}

const meta = {
    title: 'Components/InputOTP',
    component: InputOTP,
    tags: ['autodocs'],
    args: { maxLength: 6, 'aria-label': 'Verification code', children: sixSlots },
    argTypes: {
        size: { control: 'inline-radio', options: INPUT_OTP_SIZES },
        disabled: { control: 'boolean' },
    },
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const SingleGroup: Story = {
    args: {
        maxLength: 4,
        children: (
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
            </InputOTPGroup>
        ),
    },
};

export const DigitsOnly: Story = {
    args: { pattern: REGEXP_ONLY_DIGITS },
};

export const DigitsAndLetters: Story = {
    args: { pattern: REGEXP_ONLY_DIGITS_AND_CHARS },
};

export const Controlled: Story = {
    render: () => <ControlledDemo />,
};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-6">
            {INPUT_OTP_SIZES.map(size => (
                <InputOTP key={size} {...args} size={size} aria-label={`${size} size`} />
            ))}
        </div>
    ),
};

export const Invalid: Story = {
    args: { value: '123', 'aria-invalid': true },
};

export const Disabled: Story = {
    args: { disabled: true, value: '123' },
};

export const InField: Story = {
    render: () => (
        <Field data-invalid>
            <FieldLabel htmlFor="otp-story-code">Verification code</FieldLabel>
            <InputOTP id="otp-story-code" maxLength={6} aria-invalid aria-describedby="otp-story-hint otp-story-error">
                {sixSlots}
            </InputOTP>
            <FieldDescription id="otp-story-hint">We sent a 6-digit code to your email.</FieldDescription>
            <FieldError id="otp-story-error">The code is not complete.</FieldError>
        </Field>
    ),
};
