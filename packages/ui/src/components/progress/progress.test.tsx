import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Progress } from './progress';
import { defaultSize, PROGRESS_SIZES, sizeClasses } from './progress.variants';

function getIndicator() {
    const indicator = screen.getByRole('progressbar').querySelector<HTMLElement>('[data-slot="progress-indicator"]');
    if (!indicator) throw new Error('Progress indicator not found');
    return indicator;
}

describe('Progress', () => {
    describe('behavior', () => {
        it('renders a progress bar', () => {
            render(<Progress value={60} aria-label="Upload" />);

            expect(screen.getByRole('progressbar', { name: 'Upload' })).toBeInTheDocument();
        });

        it('fills the bar by the value', () => {
            render(<Progress value={60} aria-label="Upload" />);

            expect(getIndicator().style.transform).toBe('translateX(-40%)');
        });

        it('is empty at 0', () => {
            render(<Progress value={0} aria-label="Upload" />);

            expect(getIndicator().style.transform).toBe('translateX(-100%)');
        });

        it('is full at 100', () => {
            render(<Progress value={100} aria-label="Upload" />);

            expect(getIndicator().style.transform).toBe('translateX(-0%)');
        });

        it('is empty when there is no value', () => {
            render(<Progress aria-label="Upload" />);

            expect(getIndicator().style.transform).toBe('translateX(-100%)');
        });

        it('fills the bar by value and max', () => {
            render(<Progress value={3} max={5} aria-label="Steps" />);

            expect(getIndicator().style.transform).toBe('translateX(-40%)');
        });

        it('updates the bar when the value changes', () => {
            const { rerender } = render(<Progress value={20} aria-label="Upload" />);
            expect(getIndicator().style.transform).toBe('translateX(-80%)');

            rerender(<Progress value={70} aria-label="Upload" />);
            expect(getIndicator().style.transform).toBe('translateX(-30%)');
        });

        it('never fills past the track when the value is above max', () => {
            // Radix logs an error for an invalid value, which is expected here
            const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);

            render(<Progress value={150} aria-label="Upload" />);

            expect(getIndicator().style.transform).toBe('translateX(-0%)');
            consoleError.mockRestore();
        });
    });

    describe('accessibility', () => {
        it('exposes the value and the range to assistive technology', () => {
            render(<Progress value={60} aria-label="Upload" />);

            const progress = screen.getByRole('progressbar');
            expect(progress).toHaveAttribute('aria-valuenow', '60');
            expect(progress).toHaveAttribute('aria-valuemin', '0');
            expect(progress).toHaveAttribute('aria-valuemax', '100');
        });

        it('exposes a custom max', () => {
            render(<Progress value={3} max={5} aria-label="Steps" />);

            expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '5');
        });

        it('reports loading, complete and indeterminate states', () => {
            const { rerender } = render(<Progress value={60} aria-label="Upload" />);
            expect(screen.getByRole('progressbar')).toHaveAttribute('data-state', 'loading');

            rerender(<Progress value={100} aria-label="Upload" />);
            expect(screen.getByRole('progressbar')).toHaveAttribute('data-state', 'complete');

            rerender(<Progress aria-label="Upload" />);
            expect(screen.getByRole('progressbar')).toHaveAttribute('data-state', 'indeterminate');
        });

        it('has no axe violations', async () => {
            const { container } = render(<Progress value={60} aria-label="Upload" />);

            expect(await axe(container)).toHaveNoViolations();
        });
    });

    describe('size', () => {
        it('uses the md size by default', () => {
            render(<Progress value={60} aria-label="Upload" />);

            expect(defaultSize).toBe('md');
            expect(screen.getByRole('progressbar')).toHaveClass('h-2');
        });

        it.each(PROGRESS_SIZES)('applies size "%s"', size => {
            render(<Progress value={60} size={size} aria-label="Upload" />);

            expect(screen.getByRole('progressbar')).toHaveClass(sizeClasses[size]);
        });

        it.each([
            ['sm', 'h-1'],
            ['md', 'h-2'],
            ['lg', 'h-3'],
            ['xl', 'h-4'],
        ] as const)('maps size "%s" to %s', (size, expected) => {
            render(<Progress value={60} size={size} aria-label="Upload" />);

            expect(screen.getByRole('progressbar')).toHaveClass(expected);
        });
    });

    describe('customization', () => {
        it('sets data-slot on the root and the indicator', () => {
            render(<Progress value={60} aria-label="Upload" />);

            expect(screen.getByRole('progressbar')).toHaveAttribute('data-slot', 'progress');
            expect(getIndicator()).toHaveAttribute('data-slot', 'progress-indicator');
        });

        it('draws a rounded track with a primary indicator', () => {
            render(<Progress value={60} aria-label="Upload" />);

            expect(screen.getByRole('progressbar')).toHaveClass('w-full', 'overflow-hidden', 'rounded-md', 'bg-input');
            expect(getIndicator()).toHaveClass('size-full', 'bg-primary', 'transition-transform');
        });

        it('passes native props to the root element', () => {
            render(<Progress value={60} id="upload" aria-label="Upload" />);

            expect(screen.getByRole('progressbar')).toHaveAttribute('id', 'upload');
        });

        it('merges a custom className', () => {
            render(<Progress value={60} className="custom-class" aria-label="Upload" />);

            expect(screen.getByRole('progressbar')).toHaveClass('custom-class');
        });

        it('lets a custom className override the height', () => {
            render(<Progress value={60} className="h-6" aria-label="Upload" />);

            const progress = screen.getByRole('progressbar');
            expect(progress).toHaveClass('h-6');
            expect(progress).not.toHaveClass('h-2');
        });

        it('lets a custom className override the track color', () => {
            render(<Progress value={60} className="bg-muted" aria-label="Upload" />);

            const progress = screen.getByRole('progressbar');
            expect(progress).toHaveClass('bg-muted');
            expect(progress).not.toHaveClass('bg-input');
        });
    });
});
