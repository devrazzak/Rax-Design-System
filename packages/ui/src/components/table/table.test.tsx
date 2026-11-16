import type { ComponentProps } from 'react';

import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './table';

/** A small table that uses every part. */
function TestTable(props: ComponentProps<typeof Table>) {
    return (
        <Table {...props}>
            <TableCaption>Recent invoices</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>INV001</TableCell>
                    <TableCell>$250</TableCell>
                </TableRow>
                <TableRow data-state="selected">
                    <TableCell>INV002</TableCell>
                    <TableCell>$150</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>$400</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}

/** Class names with brackets are long, so tests pass them as a list. */
function classList(classes: string) {
    return classes.split(' ');
}

describe('Table', () => {
    describe('structure', () => {
        it('renders the table with its rows and cells', () => {
            render(<TestTable />);

            expect(screen.getByRole('table')).toBeInTheDocument();
            expect(screen.getAllByRole('row')).toHaveLength(4);
            expect(screen.getAllByRole('columnheader')).toHaveLength(2);
            expect(screen.getByRole('cell', { name: 'INV001' })).toBeInTheDocument();
        });

        it('wraps the table in a container', () => {
            render(<TestTable />);

            const container = screen.getByRole('table').parentElement;
            expect(container).toHaveAttribute('data-slot', 'table-container');
        });

        it('has the data-slot attributes', () => {
            render(<TestTable />);

            expect(screen.getByRole('table')).toHaveAttribute('data-slot', 'table');
            expect(screen.getByText('Recent invoices')).toHaveAttribute('data-slot', 'table-caption');
            expect(screen.getAllByRole('rowgroup')[0]).toHaveAttribute('data-slot', 'table-header');
            expect(screen.getAllByRole('rowgroup')[1]).toHaveAttribute('data-slot', 'table-body');
            expect(screen.getAllByRole('rowgroup')[2]).toHaveAttribute('data-slot', 'table-footer');
            expect(screen.getAllByRole('row')[0]).toHaveAttribute('data-slot', 'table-row');
            expect(screen.getByRole('columnheader', { name: 'Invoice' })).toHaveAttribute('data-slot', 'table-head');
            expect(screen.getByRole('cell', { name: 'INV001' })).toHaveAttribute('data-slot', 'table-cell');
        });
    });

    describe('styling', () => {
        it('gives the container a border with rounded corners and sideways scroll', () => {
            render(<TestTable />);

            expect(screen.getByRole('table').parentElement).toHaveClass(
                ...classList('relative w-full overflow-x-auto rounded-md border border-border'),
            );
        });

        it('has the table classes', () => {
            render(<TestTable />);

            expect(screen.getByRole('table')).toHaveClass('w-full', 'caption-bottom', 'text-sm');
        });

        it('gives the header a background and a border under its rows', () => {
            render(<TestTable />);

            expect(screen.getAllByRole('rowgroup')[0]).toHaveClass(
                ...classList('bg-muted [&_tr]:border-b [&_tr]:border-border'),
            );
        });

        it('removes the border of the last body row', () => {
            render(<TestTable />);

            expect(screen.getAllByRole('rowgroup')[1]).toHaveClass('[&_tr:last-child]:border-0');
        });

        it('gives the footer a top border and a background', () => {
            render(<TestTable />);

            expect(screen.getAllByRole('rowgroup')[2]).toHaveClass(
                'border-t',
                'border-border',
                'bg-muted',
                'font-medium',
            );
        });

        it('gives rows a border, a hover color and a selected color', () => {
            render(<TestTable />);

            expect(screen.getAllByRole('row')[1]).toHaveClass(
                ...classList(
                    'border-b border-border hover:bg-muted data-[state=selected]:bg-accent data-[state=selected]:text-accent-foreground',
                ),
            );
        });

        it('marks the selected row with data-state', () => {
            render(<TestTable />);

            expect(screen.getAllByRole('row')[2]).toHaveAttribute('data-state', 'selected');
            expect(screen.getAllByRole('row')[1]).not.toHaveAttribute('data-state');
        });

        it('gives head and cells their padding', () => {
            render(<TestTable />);

            expect(screen.getByRole('columnheader', { name: 'Invoice' })).toHaveClass('h-12', 'px-4', 'font-medium');
            expect(screen.getByRole('cell', { name: 'INV001' })).toHaveClass('p-4', 'align-middle');
        });

        it('gives the caption its muted text', () => {
            render(<TestTable />);

            expect(screen.getByText('Recent invoices')).toHaveClass('mt-4', 'text-sm', 'text-muted-foreground');
        });
    });

    describe('props', () => {
        it('puts className on the table, not on the container', () => {
            render(<TestTable className="table-extra" />);

            const table = screen.getByRole('table');
            expect(table).toHaveClass('table-extra', 'w-full');
            expect(table.parentElement).not.toHaveClass('table-extra');
        });

        it('merges className on every part', () => {
            render(
                <Table>
                    <TableCaption className="caption-extra">Caption</TableCaption>
                    <TableHeader className="header-extra">
                        <TableRow className="row-extra">
                            <TableHead className="head-extra">Head</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="body-extra">
                        <TableRow>
                            <TableCell className="cell-extra">Cell</TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter className="footer-extra">
                        <TableRow>
                            <TableCell>Footer</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>,
            );

            expect(screen.getByText('Caption')).toHaveClass('caption-extra', 'text-muted-foreground');
            expect(screen.getAllByRole('rowgroup')[0]).toHaveClass('header-extra', 'bg-muted');
            expect(screen.getAllByRole('row')[0]).toHaveClass('row-extra', 'border-b');
            expect(screen.getByRole('columnheader')).toHaveClass('head-extra', 'font-medium');
            expect(screen.getAllByRole('rowgroup')[1]).toHaveClass('body-extra');
            expect(screen.getByRole('cell', { name: 'Cell' })).toHaveClass('cell-extra', 'p-4');
            expect(screen.getAllByRole('rowgroup')[2]).toHaveClass('footer-extra', 'bg-muted');
        });

        it('passes extra props to the table', () => {
            render(<TestTable id="custom-id" />);

            expect(screen.getByRole('table')).toHaveAttribute('id', 'custom-id');
        });

        it('supports colSpan on a cell', () => {
            render(
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Wide</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>,
            );

            expect(screen.getByRole('cell', { name: 'Wide' })).toHaveAttribute('colspan', '2');
        });
    });

    describe('accessibility', () => {
        it('names the table from its caption', () => {
            render(<TestTable />);

            expect(screen.getByRole('table', { name: 'Recent invoices' })).toBeInTheDocument();
        });

        it('has no axe violations', async () => {
            const { container } = render(<TestTable />);

            expect(await axe(container)).toHaveNoViolations();
        });
    });
});
