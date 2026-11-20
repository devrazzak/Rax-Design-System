import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@rax-ds/ui';

export default function TableScroll() {
    return (
        <Table className="w-full min-w-[40rem]">
            <TableHeader>
                <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>ORD-1042</TableCell>
                    <TableCell>Alex Morgan</TableCell>
                    <TableCell>alex@example.com</TableCell>
                    <TableCell>Germany</TableCell>
                    <TableCell>Shipped</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>ORD-1041</TableCell>
                    <TableCell>Jordan Lee</TableCell>
                    <TableCell>jordan@example.com</TableCell>
                    <TableCell>France</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell>$120.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
