'use client';

import { useState } from 'react';

import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@rax-ds/ui';

export default function DropdownMenuRadioItems() {
    const [sort, setSort] = useState('newest');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Sort by</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Sort orders</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                    <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="oldest">Oldest first</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="amount">Amount</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
