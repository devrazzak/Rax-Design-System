import { Stack, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Text } from '@rax-ds/ui';

import type { PropDef } from '@/types/docs';

interface PropsTableProps {
    items: readonly PropDef[];
}

export function PropsTable({ items }: PropsTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map(prop => (
                    <TableRow key={prop.name}>
                        <TableCell className="align-top whitespace-normal">
                            <Stack gap="sm">
                                <code className="font-mono text-sm font-medium">{prop.name}</code>
                                {prop.description && (
                                    <Text size="sm" color="muted">
                                        {prop.description}
                                    </Text>
                                )}
                            </Stack>
                        </TableCell>
                        <TableCell className="align-top whitespace-normal">
                            <code className="font-mono text-sm">{prop.type}</code>
                        </TableCell>
                        <TableCell className="align-top">
                            <code className="font-mono text-sm">{prop.default ?? '-'}</code>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
