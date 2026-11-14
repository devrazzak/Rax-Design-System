import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Label } from '@/components/label/label';

import { Input } from './input';
import { defaultSize, INPUT_SIZES, sizeClasses } from './input.variants';

describe('Input', () => {
    describe('behavior', () => {
        it('accepts typed text', async () => {
            const user = userEvent.setup();
            render(<Input aria-label="Name" />);

            await user.type(screen.getByLabelText('Name'), 'Razzak');

            expect(screen.getByLabelText('Name')).toHaveValue('Razzak');
        });

        it('does not accept typing when disabled', async () => {
            const user = userEvent.setup();
            render(<Input aria-label="Name" disabled />);

            await user.type(screen.getByLabelText('Name'), 'Razzak');

            expect(screen.getByLabelText('Name')).toHaveValue('');
        });
    });

    describe('accessibility', () => {
        it('is found by its label', () => {
            render(
                <>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" />
                </>,
            );

            expect(screen.getByLabelText('Email')).toBeInTheDocument();
        });

        it('exposes the invalid state', () => {
            render(<Input aria-label="Email" aria-invalid />);

            expect(screen.getByLabelText('Email')).toBeInvalid();
        });

        it('has no axe violations', async () => {
            const { container } = render(
                <>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" />
                </>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('size', () => {
        it('uses the default size', () => {
            render(<Input aria-label="Name" />);

            expect(screen.getByLabelText('Name')).toHaveClass(sizeClasses[defaultSize]);
        });

        it.each(INPUT_SIZES)('applies size "%s"', size => {
            render(<Input aria-label="Name" size={size} />);

            expect(screen.getByLabelText('Name')).toHaveClass(sizeClasses[size]);
        });

        it('does not pass size to the native size attribute', () => {
            render(<Input aria-label="Name" size="lg" />);

            expect(screen.getByLabelText('Name')).not.toHaveAttribute('size');
        });
    });

    describe('customization', () => {
        it('lets className override the height', () => {
            render(<Input aria-label="Name" className="h-20" />);

            const input = screen.getByLabelText('Name');
            expect(input).toHaveClass('h-20');
            expect(input).not.toHaveClass('h-10');
        });

        it('forwards native attributes to the root element', () => {
            render(<Input aria-label="Email" type="email" placeholder="name@example.com" />);

            const input = screen.getByLabelText('Email');
            expect(input).toHaveAttribute('type', 'email');
            expect(input).toHaveAttribute('placeholder', 'name@example.com');
        });
    });
});
