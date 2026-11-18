import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { defaultGap, gapClasses, GAPS } from '@/lib/utils/gap-classes';

import { Stack } from './stack';
import { alignClasses, defaultAlign, STACK_ALIGNS } from './stack.variants';

describe('Stack', () => {
    describe('behavior', () => {
        it('renders its children inside a div', () => {
            render(<Stack data-testid="stack">Content</Stack>);

            const stack = screen.getByTestId('stack');
            expect(stack.tagName).toBe('DIV');
            expect(stack).toHaveTextContent('Content');
        });

        it('has the stack slot', () => {
            render(<Stack data-testid="stack" />);

            expect(screen.getByTestId('stack')).toHaveAttribute('data-slot', 'stack');
        });

        it('lays the children out in a column', () => {
            render(<Stack data-testid="stack" />);

            expect(screen.getByTestId('stack')).toHaveClass('flex', 'flex-col');
        });
    });

    describe('gap', () => {
        it('uses the md gap by default', () => {
            render(<Stack data-testid="stack" />);

            expect(defaultGap).toBe('md');
            expect(screen.getByTestId('stack')).toHaveClass('gap-4');
        });

        it.each(GAPS)('applies gap "%s"', gap => {
            render(<Stack data-testid="stack" gap={gap} />);

            expect(screen.getByTestId('stack')).toHaveClass(gapClasses[gap]);
        });
    });

    describe('align', () => {
        it('stretches the children by default', () => {
            render(<Stack data-testid="stack" />);

            expect(defaultAlign).toBe('stretch');
            expect(screen.getByTestId('stack')).toHaveClass('items-stretch');
        });

        it.each(STACK_ALIGNS)('applies align "%s"', align => {
            render(<Stack data-testid="stack" align={align} />);

            expect(screen.getByTestId('stack')).toHaveClass(alignClasses[align]);
        });
    });

    describe('customization', () => {
        it('lets className override the gap', () => {
            render(<Stack data-testid="stack" gap="xl" className="gap-0" />);

            const stack = screen.getByTestId('stack');
            expect(stack).toHaveClass('gap-0');
            expect(stack).not.toHaveClass(gapClasses.xl);
        });

        it('forwards native attributes to the root element', () => {
            render(<Stack data-testid="stack" id="content" />);

            expect(screen.getByTestId('stack')).toHaveAttribute('id', 'content');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <Stack>
                    <p>One</p>
                    <p>Two</p>
                </Stack>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
