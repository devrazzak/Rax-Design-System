import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from '@/components/badge/badge';
import { Checkbox } from '@/components/checkbox/checkbox';

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './table';

const INVOICES = [
    { id: 'INV001', status: 'Paid', method: 'Credit Card', amount: 250 },
    { id: 'INV002', status: 'Pending', method: 'PayPal', amount: 150 },
    { id: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: 350 },
    { id: 'INV004', status: 'Paid', method: 'Credit Card', amount: 450 },
    { id: 'INV005', status: 'Paid', method: 'PayPal', amount: 550 },
];

const TOTAL = INVOICES.reduce((sum, invoice) => sum + invoice.amount, 0);

/** Table is a set of parts, so the stories share one table and change only what each story shows. */
const meta = {
    title: 'Components/Table',
    component: Table,
    tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Keeps the selected rows in the parent. The header checkbox shows a mixed state when only some rows are selected. */
function SelectableTable() {
    const [selected, setSelected] = useState<string[]>(['INV002']);
    const allSelected = selected.length === INVOICES.length;

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-12">
                        <Checkbox
                            aria-label="Select all"
                            checked={allSelected || (selected.length > 0 && 'indeterminate')}
                            onCheckedChange={checked =>
                                setSelected(checked === true ? INVOICES.map(({ id }) => id) : [])
                            }
                        />
                    </TableHead>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {INVOICES.map(invoice => {
                    const isSelected = selected.includes(invoice.id);

                    return (
                        <TableRow key={invoice.id} data-state={isSelected ? 'selected' : undefined}>
                            <TableCell>
                                <Checkbox
                                    aria-label={`Select ${invoice.id}`}
                                    checked={isSelected}
                                    onCheckedChange={checked =>
                                        setSelected(current =>
                                            checked === true
                                                ? [...current, invoice.id]
                                                : current.filter(id => id !== invoice.id),
                                        )
                                    }
                                />
                            </TableCell>
                            <TableCell className="font-medium">{invoice.id}</TableCell>
                            <TableCell>{invoice.status}</TableCell>
                            <TableCell className="text-right">${invoice.amount}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

/* stories */
export const Default: Story = {
    render: args => (
        <Table {...args}>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {INVOICES.map(invoice => (
                    <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.status}</TableCell>
                        <TableCell>{invoice.method}</TableCell>
                        <TableCell className="text-right">${invoice.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
};

/** The caption sits below the table and describes it for screen readers too. */
export const WithCaption: Story = {
    render: args => (
        <Table {...args}>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {INVOICES.map(invoice => (
                    <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.status}</TableCell>
                        <TableCell className="text-right">${invoice.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
};

/** The footer holds totals. It uses the muted background to stand apart from the rows. */
export const WithFooter: Story = {
    render: args => (
        <Table {...args}>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {INVOICES.map(invoice => (
                    <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.method}</TableCell>
                        <TableCell className="text-right">${invoice.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">${TOTAL}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    ),
};

/** Cells can hold other components. Selected rows use `data-state="selected"`, so the rows can be told apart. */
export const WithSelection: Story = {
    render: () => <SelectableTable />,
};

/** Any component works inside a cell, here a Badge for the status. */
export const WithBadges: Story = {
    render: args => (
        <Table {...args}>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {INVOICES.map(invoice => (
                    <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>
                            <Badge>{invoice.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">${invoice.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
};

/** The table scrolls sideways inside its container when it is wider than the space, so the page does not scroll. */
export const Overflow: Story = {
    decorators: [
        Story => (
            <div className="w-96">
                <Story />
            </div>
        ),
    ],
    render: args => (
        <Table {...args}>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {INVOICES.map(invoice => (
                    <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.status}</TableCell>
                        <TableCell>{invoice.method}</TableCell>
                        <TableCell>Customer {invoice.id.slice(-1)}</TableCell>
                        <TableCell>customer{invoice.id.slice(-1)}@example.com</TableCell>
                        <TableCell className="text-right">${invoice.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
};
