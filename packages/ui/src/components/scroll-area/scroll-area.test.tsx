import type { ComponentProps } from 'react';

import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { ScrollArea, ScrollBar } from './scroll-area';

/**
 * jsdom has no layout, so Radix cannot tell if the content overflows. The `always` type
 * keeps the scrollbars in the DOM, so their classes and attributes can be checked.
 */
function TestScrollArea({ children = <p>Content</p>, ...props }: ComponentProps<typeof ScrollArea>) {
    return (
        <ScrollArea type="always" data-testid="root" {...props}>
            {children}
        </ScrollArea>
    );
}

function getViewport() {
    const viewport = screen.getByTestId('root').querySelector('[data-slot="scroll-area-viewport"]');
    if (!viewport) throw new Error('ScrollArea viewport not found');
    return viewport;
}

function getScrollbars() {
    return Array.from(screen.getByTestId('root').querySelectorAll('[data-slot="scroll-area-scrollbar"]'));
}

describe('ScrollArea', () => {
    describe('rendering', () => {
        it('renders the children inside the viewport', () => {
            render(<TestScrollArea />);

            expect(getViewport()).toContainElement(screen.getByText('Content'));
        });

        it('has the data-slot attributes', () => {
            render(<TestScrollArea />);

            expect(screen.getByTestId('root')).toHaveAttribute('data-slot', 'scroll-area');
            expect(getViewport()).toHaveAttribute('data-slot', 'scroll-area-viewport');
        });

        it('has the base classes on the root and the viewport', () => {
            render(<TestScrollArea />);

            expect(screen.getByTestId('root')).toHaveClass('relative', 'overflow-hidden');
            expect(getViewport()).toHaveClass('size-full', 'rounded-[inherit]', 'outline-none');
        });

        it('merges a custom className', () => {
            render(<TestScrollArea className="h-72 w-48" />);

            expect(screen.getByTestId('root')).toHaveClass('h-72', 'w-48', 'relative');
        });

        it('passes extra props to the root', () => {
            render(<TestScrollArea id="custom-id" />);

            expect(screen.getByTestId('root')).toHaveAttribute('id', 'custom-id');
        });
    });

    describe('scrollbar', () => {
        it('renders a vertical scrollbar by default', () => {
            render(<TestScrollArea />);

            const scrollbars = getScrollbars();
            expect(scrollbars).toHaveLength(1);
            expect(scrollbars[0]).toHaveAttribute('data-orientation', 'vertical');
        });

        it('has the vertical classes', () => {
            render(<TestScrollArea />);

            expect(getScrollbars()[0]).toHaveClass(
                'flex',
                'touch-none',
                'select-none',
                'data-[orientation=vertical]:h-full',
                'data-[orientation=vertical]:w-2.5',
            );
        });

        it('renders an extra horizontal scrollbar when ScrollBar is added', () => {
            render(
                <TestScrollArea>
                    <p>Content</p>
                    <ScrollBar orientation="horizontal" />
                </TestScrollArea>,
            );

            const orientations = getScrollbars().map(scrollbar => scrollbar.getAttribute('data-orientation'));
            expect(orientations).toEqual(expect.arrayContaining(['vertical', 'horizontal']));
        });

        it('has the horizontal classes', () => {
            render(
                <TestScrollArea>
                    <p>Content</p>
                    <ScrollBar orientation="horizontal" />
                </TestScrollArea>,
            );

            const horizontal = getScrollbars().find(
                scrollbar => scrollbar.getAttribute('data-orientation') === 'horizontal',
            );
            expect(horizontal).toHaveClass(
                'data-[orientation=horizontal]:h-2.5',
                'data-[orientation=horizontal]:flex-col',
            );
        });

        it('merges a custom className on the scrollbar', () => {
            render(
                <TestScrollArea>
                    <p>Content</p>
                    <ScrollBar orientation="horizontal" className="scrollbar-extra" />
                </TestScrollArea>,
            );

            const horizontal = getScrollbars().find(
                scrollbar => scrollbar.getAttribute('data-orientation') === 'horizontal',
            );
            expect(horizontal).toHaveClass('scrollbar-extra', 'flex');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(<TestScrollArea />);

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
