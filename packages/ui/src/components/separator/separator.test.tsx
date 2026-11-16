import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Separator } from './separator';

describe('Separator', () => {
    describe('behavior', () => {
        it('renders a div', () => {
            render(<Separator data-testid="separator" />);

            expect(screen.getByTestId('separator').tagName).toBe('DIV');
        });

        it('is horizontal by default', () => {
            render(<Separator data-testid="separator" />);

            expect(screen.getByTestId('separator')).toHaveAttribute('data-orientation', 'horizontal');
        });

        it('can be vertical', () => {
            render(<Separator data-testid="separator" orientation="vertical" />);

            expect(screen.getByTestId('separator')).toHaveAttribute('data-orientation', 'vertical');
        });

        it('passes native props to the root element', () => {
            render(<Separator data-testid="separator" id="divider" />);

            expect(screen.getByTestId('separator')).toHaveAttribute('id', 'divider');
        });
    });

    describe('accessibility', () => {
        it('is decorative by default, so it has no separator role', () => {
            render(<Separator data-testid="separator" />);

            expect(screen.getByTestId('separator')).toHaveAttribute('role', 'none');
            expect(screen.queryByRole('separator')).not.toBeInTheDocument();
        });

        it('has the separator role and no aria-orientation when it is horizontal and not decorative', () => {
            render(<Separator decorative={false} />);

            expect(screen.getByRole('separator')).not.toHaveAttribute('aria-orientation');
        });

        it('sets aria-orientation when it is vertical and not decorative', () => {
            render(<Separator decorative={false} orientation="vertical" />);

            expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
        });

        it('has no axe violations', async () => {
            const { container } = render(<Separator />);

            expect(await axe(container)).toHaveNoViolations();
        });

        it('has no axe violations when it is not decorative', async () => {
            const { container } = render(<Separator decorative={false} />);

            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('orientation', () => {
        it('is a 1px line across the full width when horizontal', () => {
            render(<Separator data-testid="separator" />);

            expect(screen.getByTestId('separator')).toHaveClass(
                'data-[orientation=horizontal]:h-px',
                'data-[orientation=horizontal]:w-full',
            );
        });

        it('is a 1px line that stretches in height when vertical', () => {
            render(<Separator data-testid="separator" orientation="vertical" />);

            expect(screen.getByTestId('separator')).toHaveClass(
                'data-[orientation=vertical]:w-px',
                'data-[orientation=vertical]:self-stretch',
            );
        });
    });

    describe('customization', () => {
        it('sets data-slot', () => {
            render(<Separator data-testid="separator" />);

            expect(screen.getByTestId('separator')).toHaveAttribute('data-slot', 'separator');
        });

        it('uses the border color and does not shrink', () => {
            render(<Separator data-testid="separator" />);

            expect(screen.getByTestId('separator')).toHaveClass('shrink-0', 'bg-border');
        });

        it('merges a custom className', () => {
            render(<Separator data-testid="separator" className="custom-class" />);

            expect(screen.getByTestId('separator')).toHaveClass('custom-class');
        });

        it('lets a custom className override the color', () => {
            render(<Separator data-testid="separator" className="bg-primary" />);

            const separator = screen.getByTestId('separator');
            expect(separator).toHaveClass('bg-primary');
            expect(separator).not.toHaveClass('bg-border');
        });
    });
});
