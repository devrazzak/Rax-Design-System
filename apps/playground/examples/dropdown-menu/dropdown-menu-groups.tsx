import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@rax-ds/ui';

export default function DropdownMenuGroups() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Account</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Profile</DropdownMenuLabel>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Notifications</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Billing</DropdownMenuLabel>
                    <DropdownMenuItem>Invoices</DropdownMenuItem>
                    <DropdownMenuItem>Payment method</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
