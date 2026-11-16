import { CheckIcon } from '@/icons';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Badge } from './badge';
import { BADGE_SIZES, BADGE_VARIANTS, defaultVariants, sizeClasses, variantClasses } from './badge.variants';

describe('Badge', () => {
    describe('behavior', () => {
        it('renders its content in a span', () => {
            render(<Badge>Ongoing</Badge>);

            const badge = screen.getByText('Ongoing');
            expect(badge.tagName).toBe('SPAN');
        });

        it('renders an icon next to the text', () => {
            render(
                <Badge>
                    <CheckIcon data-testid="icon" />
                    Verified
                </Badge>,
            );

            expect(screen.getByTestId('icon')).toBeInTheDocument();
            expect(screen.getByText('Verified')).toBeInTheDocument();
        });

        it('renders the child element instead of a span with asChild', () => {
            render(
                <Badge asChild>
                    <a href="#details">Details</a>
                </Badge>,
            );

            const link = screen.getByRole('link', { name: 'Details' });
            expect(link).toHaveAttribute('href', '#details');
            expect(link).toHaveAttribute('data-slot', 'badge');
        });
    });

    describe('accessibility', () => {
        it('is not interactive by default', () => {
            render(<Badge>Ongoing</Badge>);

            expect(screen.queryByRole('button')).not.toBeInTheDocument();
            expect(screen.queryByRole('link')).not.toBeInTheDocument();
        });

        it('has no axe violations', async () => {
            const { container } = render(<Badge>Ongoing</Badge>);

            expect(await axe(container)).toHaveNoViolations();
        });

        it('has no axe violations as a link', async () => {
            const { container } = render(
                <Badge asChild>
                    <a href="#details">Details</a>
                </Badge>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('variant', () => {
        it('uses the primary variant by default', () => {
            render(<Badge>Ongoing</Badge>);

            expect(defaultVariants.variant).toBe('primary');
            expect(screen.getByText('Ongoing')).toHaveAttribute('data-variant', 'primary');
            expect(screen.getByText('Ongoing')).toHaveClass('bg-primary', 'text-primary-foreground');
        });

        it.each(BADGE_VARIANTS)('applies variant "%s"', variant => {
            render(<Badge variant={variant}>Ongoing</Badge>);

            const badge = screen.getByText('Ongoing');
            expect(badge).toHaveAttribute('data-variant', variant);
            expect(badge).toHaveClass(variantClasses[variant]);
        });

        it('uses a white background and primary text for the white variant', () => {
            render(<Badge variant="white">Ongoing</Badge>);

            expect(screen.getByText('Ongoing')).toHaveClass('bg-white', 'text-primary');
        });
    });

    describe('size', () => {
        it('uses the md size by default', () => {
            render(<Badge>Ongoing</Badge>);

            expect(defaultVariants.size).toBe('md');
            expect(screen.getByText('Ongoing')).toHaveAttribute('data-size', 'md');
            expect(screen.getByText('Ongoing')).toHaveClass('h-6', 'px-3', 'text-[10px]');
        });

        it.each(BADGE_SIZES)('applies size "%s"', size => {
            render(<Badge size={size}>Ongoing</Badge>);

            const badge = screen.getByText('Ongoing');
            expect(badge).toHaveAttribute('data-size', size);
            expect(badge).toHaveClass(sizeClasses[size]);
        });
    });

    describe('customization', () => {
        it('sets data-slot', () => {
            render(<Badge>Ongoing</Badge>);

            expect(screen.getByText('Ongoing')).toHaveAttribute('data-slot', 'badge');
        });

        it('is a pill with uppercase, bold text', () => {
            render(<Badge>Ongoing</Badge>);

            expect(screen.getByText('Ongoing')).toHaveClass('rounded-full', 'font-bold', 'uppercase');
        });

        it('merges a custom className', () => {
            render(<Badge className="custom-class">Ongoing</Badge>);

            expect(screen.getByText('Ongoing')).toHaveClass('custom-class');
        });

        it('lets a custom className override the shape', () => {
            render(<Badge className="rounded-md">Ongoing</Badge>);

            const badge = screen.getByText('Ongoing');
            expect(badge).toHaveClass('rounded-md');
            expect(badge).not.toHaveClass('rounded-full');
        });

        it('lets a custom className override the text transform', () => {
            render(<Badge className="normal-case">Ongoing</Badge>);

            const badge = screen.getByText('Ongoing');
            expect(badge).toHaveClass('normal-case');
            expect(badge).not.toHaveClass('uppercase');
        });
    });
});
