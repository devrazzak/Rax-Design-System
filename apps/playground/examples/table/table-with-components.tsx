import { EllipsisIcon } from 'lucide-react';

import {
    Badge,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Text,
} from '@rax-ds/ui';

export default function TableWithComponents() {
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-0">
                        <Text as="span" className="sr-only">
                            Actions
                        </Text>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">ORD-1042</TableCell>
                    <TableCell>
                        <Badge variant="secondary" size="sm">
                            Shipped
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <IconButton label="Actions for ORD-1042" variant="ghost" size="sm">
                                    <EllipsisIcon />
                                </IconButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>View</DropdownMenuItem>
                                <DropdownMenuItem variant="destructive">Cancel</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">ORD-1041</TableCell>
                    <TableCell>
                        <Badge variant="outline" size="sm">
                            Pending
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <IconButton label="Actions for ORD-1041" variant="ghost" size="sm">
                                    <EllipsisIcon />
                                </IconButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>View</DropdownMenuItem>
                                <DropdownMenuItem variant="destructive">Cancel</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
