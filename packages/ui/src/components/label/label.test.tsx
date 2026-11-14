import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Label } from './label';
import { defaultSize, LABEL_SIZES, sizeClasses } from './label.variants';

describe('Label', () => {
    describe('accessibility', () => {
        it('focuses the linked control when clicked', async () => {
            const user = userEvent.setup();
            render(
                <>
                    <Label htmlFor="email">Email</Label>
                    <input id="email" />
                </>,
            );

            await user.click(screen.getByText('Email'));

            expect(screen.getByLabelText('Email')).toHaveFocus();
        });

        it('has no axe violations', async () => {
            const { container } = render(
                <>
                    <Label htmlFor="email">Email</Label>
                    <input id="email" />
                </>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('size', () => {
        it('uses the default size', () => {
            render(<Label>Email</Label>);

            expect(screen.getByText('Email')).toHaveClass(sizeClasses[defaultSize]);
        });

        it.each(LABEL_SIZES)('applies size "%s"', size => {
            render(<Label size={size}>Email</Label>);

            expect(screen.getByText('Email')).toHaveClass(sizeClasses[size]);
        });
    });

    describe('customization', () => {
        it('lets className override the size', () => {
            render(<Label className="text-xl">Email</Label>);

            const label = screen.getByText('Email');
            expect(label).toHaveClass('text-xl');
            expect(label).not.toHaveClass('text-base');
        });

        it('forwards native attributes to the root element', () => {
            render(<Label id="email-label">Email</Label>);

            expect(screen.getByText('Email')).toHaveAttribute('id', 'email-label');
        });
    });
});
