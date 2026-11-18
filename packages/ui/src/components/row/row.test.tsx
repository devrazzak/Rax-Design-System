import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { defaultGap, gapClasses, GAPS } from '@/lib/utils/gap-classes';

import { Row } from './row';
import { alignClasses, defaultAlign, defaultJustify, justifyClasses, ROW_ALIGNS, ROW_JUSTIFIES } from './row.variants';

describe('Row', () => {
    describe('behavior', () => {
        it('renders its children inside a div', () => {
            render(<Row data-testid="row">Content</Row>);

            const row = screen.getByTestId('row');
            expect(row.tagName).toBe('DIV');
            expect(row).toHaveTextContent('Content');
        });

        it('has the row slot', () => {
            render(<Row data-testid="row" />);

            expect(screen.getByTestId('row')).toHaveAttribute('data-slot', 'row');
        });

        it('lays the children out in a row', () => {
            render(<Row data-testid="row" />);

            expect(screen.getByTestId('row')).toHaveClass('flex');
            expect(screen.getByTestId('row')).not.toHaveClass('flex-col');
        });
    });

    describe('gap', () => {
        it('uses the md gap by default', () => {
            render(<Row data-testid="row" />);

            expect(defaultGap).toBe('md');
            expect(screen.getByTestId('row')).toHaveClass('gap-4');
        });

        it.each(GAPS)('applies gap "%s"', gap => {
            render(<Row data-testid="row" gap={gap} />);

            expect(screen.getByTestId('row')).toHaveClass(gapClasses[gap]);
        });
    });

    describe('align', () => {
        it('centers the children by default', () => {
            render(<Row data-testid="row" />);

            expect(defaultAlign).toBe('center');
            expect(screen.getByTestId('row')).toHaveClass('items-center');
        });

        it.each(ROW_ALIGNS)('applies align "%s"', align => {
            render(<Row data-testid="row" align={align} />);

            expect(screen.getByTestId('row')).toHaveClass(alignClasses[align]);
        });
    });

    describe('justify', () => {
        it('starts the children at the beginning by default', () => {
            render(<Row data-testid="row" />);

            expect(defaultJustify).toBe('start');
            expect(screen.getByTestId('row')).toHaveClass('justify-start');
        });

        it.each(ROW_JUSTIFIES)('applies justify "%s"', justify => {
            render(<Row data-testid="row" justify={justify} />);

            expect(screen.getByTestId('row')).toHaveClass(justifyClasses[justify]);
        });
    });

    describe('wrap', () => {
        it('does not wrap by default', () => {
            render(<Row data-testid="row" />);

            expect(screen.getByTestId('row')).not.toHaveClass('flex-wrap');
        });

        it('wraps when `wrap` is true', () => {
            render(<Row data-testid="row" wrap />);

            expect(screen.getByTestId('row')).toHaveClass('flex-wrap');
        });
    });

    describe('customization', () => {
        it('lets className override the gap', () => {
            render(<Row data-testid="row" gap="xl" className="gap-0" />);

            const row = screen.getByTestId('row');
            expect(row).toHaveClass('gap-0');
            expect(row).not.toHaveClass(gapClasses.xl);
        });

        it('forwards native attributes to the root element', () => {
            render(<Row data-testid="row" id="toolbar" />);

            expect(screen.getByTestId('row')).toHaveAttribute('id', 'toolbar');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <Row>
                    <p>One</p>
                    <p>Two</p>
                </Row>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
