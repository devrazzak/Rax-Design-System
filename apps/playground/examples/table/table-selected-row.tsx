import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@rax-ds/ui';

export default function TableSelectedRow() {
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Plan</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Alex Morgan</TableCell>
                    <TableCell>Team</TableCell>
                </TableRow>
                <TableRow data-state="selected">
                    <TableCell>Jordan Lee</TableCell>
                    <TableCell>Business</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Sam Rivera</TableCell>
                    <TableCell>Free</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
