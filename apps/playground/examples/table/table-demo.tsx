import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@rax-ds/ui';

const orders = [
    { id: 'ORD-1042', customer: 'Alex Morgan', status: 'Shipped', total: '$250.00' },
    { id: 'ORD-1041', customer: 'Jordan Lee', status: 'Pending', total: '$120.00' },
    { id: 'ORD-1040', customer: 'Sam Rivera', status: 'Delivered', total: '$89.50' },
];

export default function TableDemo() {
    return (
        <Table className="w-full">
            <TableCaption>A list of recent orders.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map(order => (
                    <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell className="text-right">{order.total}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
