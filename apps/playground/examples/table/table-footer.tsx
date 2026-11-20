import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@rax-ds/ui';

export default function TableFooterExample() {
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Notebook</TableCell>
                    <TableCell className="text-right">$12.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Pen set</TableCell>
                    <TableCell className="text-right">$8.50</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">$20.50</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
