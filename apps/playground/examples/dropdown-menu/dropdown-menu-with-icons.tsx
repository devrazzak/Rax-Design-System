import { PencilIcon, TrashIcon } from 'lucide-react';

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@rax-ds/ui';

export default function DropdownMenuWithIcons() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <PencilIcon />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                    <TrashIcon />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
