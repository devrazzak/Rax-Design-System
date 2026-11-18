import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Container } from './container';
import { CONTAINER_SIZES, defaultSize, sizeClasses } from './container.variants';

describe('Container', () => {
    describe('behavior', () => {
        it('renders its children inside a div', () => {
            render(<Container data-testid="container">Content</Container>);

            const container = screen.getByTestId('container');
            expect(container.tagName).toBe('DIV');
            expect(container).toHaveTextContent('Content');
        });

        it('has the container slot', () => {
            render(<Container data-testid="container" />);

            expect(screen.getByTestId('container')).toHaveAttribute('data-slot', 'container');
        });

        it('is centered, full width and has fluid side padding', () => {
            render(<Container data-testid="container" />);

            expect(screen.getByTestId('container')).toHaveClass('mx-auto', 'w-full', 'px-[clamp(1rem,4vw,2rem)]');
        });
    });

    describe('size', () => {
        it('uses the xl size by default', () => {
            render(<Container data-testid="container" />);

            expect(defaultSize).toBe('xl');
            expect(screen.getByTestId('container')).toHaveClass('max-w-(--breakpoint-xl)');
        });

        it.each(CONTAINER_SIZES)('applies size "%s"', size => {
            render(<Container data-testid="container" size={size} />);

            expect(screen.getByTestId('container')).toHaveClass(sizeClasses[size]);
        });

        it('removes the max width for the full size', () => {
            render(<Container data-testid="container" size="full" />);

            expect(screen.getByTestId('container')).toHaveClass('max-w-none');
        });
    });

    describe('customization', () => {
        it('lets className override the size', () => {
            render(<Container data-testid="container" size="xl" className="max-w-none" />);

            const container = screen.getByTestId('container');
            expect(container).toHaveClass('max-w-none');
            expect(container).not.toHaveClass('max-w-(--breakpoint-xl)');
        });

        it('lets className override the padding', () => {
            render(<Container data-testid="container" className="px-0" />);

            const container = screen.getByTestId('container');
            expect(container).toHaveClass('px-0');
            expect(container).not.toHaveClass('px-[clamp(1rem,4vw,2rem)]');
        });

        it('forwards native attributes to the root element', () => {
            render(<Container data-testid="container" id="page-container" />);

            expect(screen.getByTestId('container')).toHaveAttribute('id', 'page-container');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <Container>
                    <p>Content</p>
                </Container>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
