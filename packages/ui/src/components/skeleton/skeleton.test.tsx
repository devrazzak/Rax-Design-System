import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Skeleton } from './skeleton';

describe('Skeleton', () => {
    describe('behavior', () => {
        it('renders a div', () => {
            render(<Skeleton data-testid="skeleton" />);

            expect(screen.getByTestId('skeleton').tagName).toBe('DIV');
        });

        it('passes native props to the root element', () => {
            render(<Skeleton data-testid="skeleton" id="loading-title" />);

            expect(screen.getByTestId('skeleton')).toHaveAttribute('id', 'loading-title');
        });
    });

    describe('accessibility', () => {
        it('has no role of its own', () => {
            render(<Skeleton data-testid="skeleton" />);

            expect(screen.getByTestId('skeleton')).not.toHaveAttribute('role');
        });

        it('has no axe violations', async () => {
            const { container } = render(
                <div aria-busy="true">
                    <Skeleton />
                </div>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('customization', () => {
        it('sets data-slot', () => {
            render(<Skeleton data-testid="skeleton" />);

            expect(screen.getByTestId('skeleton')).toHaveAttribute('data-slot', 'skeleton');
        });

        it('pulses on the skeleton color with rounded-md corners', () => {
            render(<Skeleton data-testid="skeleton" />);

            expect(screen.getByTestId('skeleton')).toHaveClass('animate-pulse', 'rounded-md', 'bg-skeleton');
        });

        it('stops pulsing when the user prefers reduced motion', () => {
            render(<Skeleton data-testid="skeleton" />);

            expect(screen.getByTestId('skeleton')).toHaveClass('motion-reduce:animate-none');
        });

        it('merges a custom className', () => {
            render(<Skeleton data-testid="skeleton" className="h-4 w-64" />);

            expect(screen.getByTestId('skeleton')).toHaveClass('h-4', 'w-64');
        });

        it('lets a custom className override the shape', () => {
            render(<Skeleton data-testid="skeleton" className="rounded-full" />);

            const skeleton = screen.getByTestId('skeleton');
            expect(skeleton).toHaveClass('rounded-full');
            expect(skeleton).not.toHaveClass('rounded-md');
        });
    });
});
