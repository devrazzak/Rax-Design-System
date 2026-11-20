import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@rax-ds/ui';

export default function DropdownMenuDisabled() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem disabled>Share (unavailable)</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
