'use client';

import { useState } from 'react';

import {
    Button,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@rax-ds/ui';

export default function DropdownMenuCheckboxItems() {
    const [showStatus, setShowStatus] = useState(true);
    const [showDate, setShowDate] = useState(false);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Visible columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
                    Status
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={showDate} onCheckedChange={setShowDate}>
                    Date
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
