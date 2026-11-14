import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Spinner } from './spinner';
import { colorClasses, sizeClasses, SPINNER_COLORS, SPINNER_SIZES } from './spinner.variants';

describe('Spinner', () => {
    describe('accessibility', () => {
        it('is decorative without a label', () => {
            render(<Spinner data-testid="spinner" />);

            expect(screen.getByTestId('spinner')).toHaveAttribute('aria-hidden', 'true');
            expect(screen.queryByRole('status')).not.toBeInTheDocument();
        });

        it('announces the label as a status when one is given', () => {
            render(<Spinner label="Loading results" />);

            const status = screen.getByRole('status');
            expect(status).toHaveTextContent('Loading results');
            expect(status).not.toHaveAttribute('aria-hidden');
        });

        it('has no axe violations without a label', async () => {
            const { container } = render(<Spinner />);

            expect(await axe(container)).toHaveNoViolations();
        });

        it('has no axe violations with a label', async () => {
            const { container } = render(<Spinner label="Loading results" />);

            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('size and color', () => {
        it('uses the md size and the current text color by default', () => {
            render(<Spinner data-testid="spinner" />);

            const spinner = screen.getByTestId('spinner');
            expect(spinner).toHaveClass('size-4', 'text-current');
        });

        it.each(SPINNER_SIZES)('applies size "%s"', size => {
            render(<Spinner data-testid="spinner" size={size} />);

            expect(screen.getByTestId('spinner')).toHaveClass(sizeClasses[size]);
        });

        it.each(SPINNER_COLORS)('applies color "%s"', color => {
            render(<Spinner data-testid="spinner" color={color} />);

            expect(screen.getByTestId('spinner')).toHaveClass(colorClasses[color]);
        });
    });

    describe('customization', () => {
        it('lets className override the size', () => {
            render(<Spinner data-testid="spinner" className="size-10" />);

            const spinner = screen.getByTestId('spinner');
            expect(spinner).toHaveClass('size-10');
            expect(spinner).not.toHaveClass('size-4');
        });

        it('forwards native attributes to the root element', () => {
            render(<Spinner data-testid="spinner" id="results-spinner" />);

            expect(screen.getByTestId('spinner')).toHaveAttribute('id', 'results-spinner');
        });
    });
});
