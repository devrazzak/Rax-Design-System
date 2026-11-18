import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { defaultGap, gapClasses, GAPS } from '@/lib/utils/gap-classes';

import { Grid, GridItem } from './grid';
import { columnsClasses, defaultColumns, GRID_COLUMNS, GRID_SPANS, spanClasses } from './grid.variants';

describe('Grid', () => {
    describe('behavior', () => {
        it('renders its children inside a div', () => {
            render(<Grid data-testid="grid">Content</Grid>);

            const grid = screen.getByTestId('grid');
            expect(grid.tagName).toBe('DIV');
            expect(grid).toHaveTextContent('Content');
        });

        it('has the grid slot', () => {
            render(<Grid data-testid="grid" />);

            expect(screen.getByTestId('grid')).toHaveAttribute('data-slot', 'grid');
        });

        it('is one column below the md breakpoint', () => {
            render(<Grid data-testid="grid" />);

            expect(screen.getByTestId('grid')).toHaveClass('grid', 'grid-cols-1');
        });
    });

    describe('columns', () => {
        it('uses 2 columns by default', () => {
            render(<Grid data-testid="grid" />);

            expect(defaultColumns).toBe(2);
            expect(screen.getByTestId('grid')).toHaveClass('md:grid-cols-2');
        });

        it.each(GRID_COLUMNS)('applies %s columns', columns => {
            render(<Grid data-testid="grid" columns={columns} />);

            expect(screen.getByTestId('grid')).toHaveClass(columnsClasses[columns]);
        });
    });

    describe('gap', () => {
        it('uses the md gap by default', () => {
            render(<Grid data-testid="grid" />);

            expect(defaultGap).toBe('md');
            expect(screen.getByTestId('grid')).toHaveClass('gap-4');
        });

        it.each(GAPS)('applies gap "%s"', gap => {
            render(<Grid data-testid="grid" gap={gap} />);

            expect(screen.getByTestId('grid')).toHaveClass(gapClasses[gap]);
        });
    });

    describe('customization', () => {
        it('lets className override the gap', () => {
            render(<Grid data-testid="grid" gap="xl" className="gap-0" />);

            const grid = screen.getByTestId('grid');
            expect(grid).toHaveClass('gap-0');
            expect(grid).not.toHaveClass(gapClasses.xl);
        });

        it('forwards native attributes to the root element', () => {
            render(<Grid data-testid="grid" id="cards" />);

            expect(screen.getByTestId('grid')).toHaveAttribute('id', 'cards');
        });
    });

    describe('accessibility', () => {
        it('has no axe violations', async () => {
            const { container } = render(
                <Grid>
                    <p>One</p>
                    <p>Two</p>
                </Grid>,
            );

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});

describe('GridItem', () => {
    describe('behavior', () => {
        it('renders its children inside a div', () => {
            render(<GridItem data-testid="item">Content</GridItem>);

            const item = screen.getByTestId('item');
            expect(item.tagName).toBe('DIV');
            expect(item).toHaveTextContent('Content');
        });

        it('has the grid-item slot', () => {
            render(<GridItem data-testid="item" />);

            expect(screen.getByTestId('item')).toHaveAttribute('data-slot', 'grid-item');
        });
    });

    describe('span', () => {
        it('does not add a span class when span is not given', () => {
            render(<GridItem data-testid="item" />);

            expect(screen.getByTestId('item').className).not.toMatch(/col-span/);
        });

        it('spans 4 columns from the md breakpoint', () => {
            render(<GridItem data-testid="item" span={4} />);

            expect(screen.getByTestId('item')).toHaveClass('md:col-span-4');
        });

        it.each(GRID_SPANS)('applies span %s', span => {
            render(<GridItem data-testid="item" span={span} />);

            expect(screen.getByTestId('item')).toHaveClass(spanClasses[span]);
        });
    });

    describe('customization', () => {
        it('lets className override the span', () => {
            render(<GridItem data-testid="item" span={4} className="md:col-span-6" />);

            const item = screen.getByTestId('item');
            expect(item).toHaveClass('md:col-span-6');
            expect(item).not.toHaveClass('md:col-span-4');
        });

        it('forwards native attributes to the root element', () => {
            render(<GridItem data-testid="item" id="sidebar" />);

            expect(screen.getByTestId('item')).toHaveAttribute('id', 'sidebar');
        });
    });
});
