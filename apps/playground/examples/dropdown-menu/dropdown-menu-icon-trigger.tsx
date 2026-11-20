import { EllipsisIcon } from 'lucide-react';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, IconButton } from '@rax-ds/ui';

export default function DropdownMenuIconTrigger() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <IconButton label="More actions" variant="ghost">
                    <EllipsisIcon />
                </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
