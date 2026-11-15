import { useState } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Field, FieldLabel } from '@/components/field/field';

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
    REGEXP_ONLY_DIGITS,
    REGEXP_ONLY_DIGITS_AND_CHARS,
} from './input-otp';
import { defaultSize, INPUT_OTP_SIZES, sizeClasses } from './input-otp.variants';

function SixSlots(props: Partial<React.ComponentProps<typeof InputOTP>>) {
    return (
        <InputOTP maxLength={6} aria-label="Code" {...props}>
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
        </InputOTP>
    );
}

function ControlledOTP() {
    const [value, setValue] = useState('');
    return (
        <>
            <SixSlots value={value} onChange={setValue} />
            <button type="button" onClick={() => setValue('987654')}>
                Fill
            </button>
        </>
    );
}

// The container sits two levels above the real <input>, which is wrapped in an absolutely positioned div
function getContainer() {
    return screen.getByRole('textbox', { name: 'Code' }).parentElement?.parentElement;
}

function slotTexts() {
    return Array.from(document.querySelectorAll('[data-slot="input-otp-slot"]')).map(slot => slot.textContent);
}

describe('InputOTP', () => {
    describe('typing', () => {
        it('renders one slot per index', () => {
            render(<SixSlots />);

            expect(slotTexts()).toHaveLength(6);
        });

        it('fills the slots as digits are typed', async () => {
            const user = userEvent.setup();
            render(<SixSlots />);

            await user.type(screen.getByRole('textbox', { name: 'Code' }), '123');

            expect(slotTexts()).toEqual(['1', '2', '3', '', '', '']);
        });

        it('reports the value through onChange', async () => {
            const user = userEvent.setup();
            const onChange = jest.fn();
            render(<SixSlots onChange={onChange} />);

            await user.type(screen.getByRole('textbox', { name: 'Code' }), '12');

            expect(onChange).toHaveBeenLastCalledWith('12');
        });

        it('calls onComplete once every slot is filled', async () => {
            const user = userEvent.setup();
            const onComplete = jest.fn();
            render(<SixSlots onComplete={onComplete} />);

            await user.type(screen.getByRole('textbox', { name: 'Code' }), '123456');

            expect(onComplete).toHaveBeenCalledWith('123456');
        });

        it('ignores characters past maxLength', async () => {
            const user = userEvent.setup();
            render(<SixSlots />);

            await user.type(screen.getByRole('textbox', { name: 'Code' }), '12345678');

            expect(screen.getByRole('textbox', { name: 'Code' })).toHaveValue('123456');
        });

        it('removes the last character with Backspace', async () => {
            const user = userEvent.setup();
            render(<SixSlots />);

            await user.type(screen.getByRole('textbox', { name: 'Code' }), '123{Backspace}');

            expect(slotTexts()).toEqual(['1', '2', '', '', '', '']);
        });

        it('accepts a pasted code', async () => {
            const user = userEvent.setup();
            render(<SixSlots />);

            await user.click(screen.getByRole('textbox', { name: 'Code' }));
            await user.paste('654321');

            expect(slotTexts()).toEqual(['6', '5', '4', '3', '2', '1']);
        });
    });

    describe('pattern', () => {
        it('accepts any character when no pattern is set', async () => {
            const user = userEvent.setup();
            render(<SixSlots />);

            await user.type(screen.getByRole('textbox', { name: 'Code' }), 'a1b2');

            expect(screen.getByRole('textbox', { name: 'Code' })).toHaveValue('a1b2');
        });

        it('ignores letters when the pattern is digits only', async () => {
            const user = userEvent.setup();
            render(<SixSlots pattern={REGEXP_ONLY_DIGITS} />);

            await user.type(screen.getByRole('textbox', { name: 'Code' }), 'a1b2');

            expect(screen.getByRole('textbox', { name: 'Code' })).toHaveValue('12');
        });

        it('accepts letters and digits when the pattern allows both', async () => {
            const user = userEvent.setup();
            render(<SixSlots pattern={REGEXP_ONLY_DIGITS_AND_CHARS} />);

            await user.type(screen.getByRole('textbox', { name: 'Code' }), 'a1b2');

            expect(screen.getByRole('textbox', { name: 'Code' })).toHaveValue('a1b2');
        });
    });

    describe('value', () => {
        it('shows the given value', () => {
            render(<SixSlots value="123" />);

            expect(slotTexts()).toEqual(['1', '2', '3', '', '', '']);
        });

        it('follows a controlled value', async () => {
            const user = userEvent.setup();
            render(<ControlledOTP />);

            await user.click(screen.getByRole('button', { name: 'Fill' }));
            expect(slotTexts()).toEqual(['9', '8', '7', '6', '5', '4']);

            await user.type(screen.getByRole('textbox', { name: 'Code' }), '{Backspace}');
            expect(slotTexts()).toEqual(['9', '8', '7', '6', '5', '']);
        });

        it('is labelled by a Field label', async () => {
            const user = userEvent.setup();
            render(
                <Field>
                    <FieldLabel htmlFor="otp">Verification code</FieldLabel>
                    <SixSlots id="otp" aria-label={undefined} />
                </Field>,
            );

            await user.click(screen.getByText('Verification code'));

            expect(screen.getByRole('textbox', { name: 'Verification code' })).toHaveFocus();
        });
    });

    describe('disabled and invalid', () => {
        it('does not accept input when disabled', async () => {
            const user = userEvent.setup();
            render(<SixSlots disabled />);

            await user.type(screen.getByRole('textbox', { name: 'Code' }), '123');

            expect(screen.getByRole('textbox', { name: 'Code' })).toBeDisabled();
            expect(slotTexts()).toEqual(['', '', '', '', '', '']);
        });

        it('passes aria-invalid to the input', () => {
            render(<SixSlots aria-invalid />);

            expect(screen.getByRole('textbox', { name: 'Code' })).toHaveAttribute('aria-invalid', 'true');
        });
    });

    describe('separator', () => {
        it('renders a separator between groups', () => {
            render(<SixSlots />);

            expect(screen.getByRole('separator')).toBeInTheDocument();
        });
    });

    describe('sizes', () => {
        it('uses the md size by default', () => {
            render(<SixSlots />);

            expect(defaultSize).toBe('md');
            expect(getContainer()).toHaveClass('[&_[data-slot=input-otp-slot]]:size-12');
        });

        it.each(INPUT_OTP_SIZES)('applies the %s size classes to the container', size => {
            render(<SixSlots size={size} />);

            expect(getContainer()).toHaveClass(...sizeClasses[size].split(' '));
        });
    });

    describe('customization', () => {
        it('merges a custom className on the input and the container', () => {
            render(<SixSlots className="custom-input" containerClassName="custom-container" />);

            expect(screen.getByRole('textbox', { name: 'Code' })).toHaveClass('custom-input');
            expect(getContainer()).toHaveClass('custom-container');
        });

        it('merges a custom className on a slot', () => {
            render(
                <InputOTP maxLength={1} aria-label="Code">
                    <InputOTPGroup>
                        <InputOTPSlot index={0} className="custom-slot" />
                    </InputOTPGroup>
                </InputOTP>,
            );

            expect(document.querySelector('[data-slot="input-otp-slot"]')).toHaveClass('custom-slot');
        });

        it('sets data-slot on every part', () => {
            render(<SixSlots />);

            expect(screen.getByRole('textbox', { name: 'Code' })).toHaveAttribute('data-slot', 'input-otp');
            expect(document.querySelector('[data-slot="input-otp-group"]')).toBeInTheDocument();
            expect(document.querySelector('[data-slot="input-otp-slot"]')).toBeInTheDocument();
            expect(screen.getByRole('separator')).toHaveAttribute('data-slot', 'input-otp-separator');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<SixSlots />);

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
