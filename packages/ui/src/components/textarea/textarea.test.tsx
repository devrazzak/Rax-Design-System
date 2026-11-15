import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Label } from '@/components/label/label';

import { Textarea } from './textarea';
import { defaultSize, sizeClasses, TEXTAREA_SIZES } from './textarea.variants';

describe('Textarea', () => {
    describe('behavior', () => {
        it('accepts typed text and new lines', async () => {
            const user = userEvent.setup();
            render(<Textarea aria-label="Message" />);

            await user.type(screen.getByLabelText('Message'), 'Hello{Enter}World');

            expect(screen.getByLabelText('Message')).toHaveValue('Hello\nWorld');
        });

        it('does not accept typing when disabled', async () => {
            const user = userEvent.setup();
            render(<Textarea aria-label="Message" disabled />);

            await user.type(screen.getByLabelText('Message'), 'Hello');

            expect(screen.getByLabelText('Message')).toHaveValue('');
        });

        it('passes rows to the native element', () => {
            render(<Textarea aria-label="Message" rows={6} />);

            expect(screen.getByLabelText('Message')).toHaveAttribute('rows', '6');
        });
    });

    describe('accessibility', () => {
        it('is found by its label', () => {
            render(
                <>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" />
                </>,
            );

            expect(screen.getByLabelText('Message')).toBeInTheDocument();
        });

        it('exposes the invalid state', () => {
            render(<Textarea aria-label="Message" aria-invalid />);

            expect(screen.getByLabelText('Message')).toBeInvalid();
        });

        it('has no axe violations', async () => {
            const { container } = render(
                <>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" />
                </>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('size', () => {
        it('uses the md size and a maximum height by default', () => {
            render(<Textarea aria-label="Message" />);

            expect(screen.getByLabelText('Message')).toHaveClass('min-h-24', 'px-4', 'text-base', 'max-h-80');
            expect(defaultSize).toBe('md');
        });

        it.each(TEXTAREA_SIZES)('applies size "%s"', size => {
            render(<Textarea aria-label="Message" size={size} />);

            expect(screen.getByLabelText('Message')).toHaveClass(sizeClasses[size]);
        });

        it('does not pass size to the native element', () => {
            render(<Textarea aria-label="Message" size="lg" />);

            expect(screen.getByLabelText('Message')).not.toHaveAttribute('size');
        });
    });

    describe('customization', () => {
        it('lets className override the maximum height', () => {
            render(<Textarea aria-label="Message" className="max-h-96" />);

            const textarea = screen.getByLabelText('Message');
            expect(textarea).toHaveClass('max-h-96');
            expect(textarea).not.toHaveClass('max-h-64');
        });

        it('forwards native attributes to the root element', () => {
            render(<Textarea aria-label="Message" placeholder="Write here" maxLength={100} />);

            const textarea = screen.getByLabelText('Message');
            expect(textarea).toHaveAttribute('placeholder', 'Write here');
            expect(textarea).toHaveAttribute('maxlength', '100');
            expect(textarea).toHaveAttribute('data-slot', 'textarea');
        });
    });
});
