import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Row } from '@rax-ds/ui';

export default function DropdownMenuSizes() {
    return (
        <Row gap="sm" wrap justify="center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Small</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent size="sm">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Medium</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent size="md">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Large</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent size="lg">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Extra large</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent size="xl">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Row>
    );
}
