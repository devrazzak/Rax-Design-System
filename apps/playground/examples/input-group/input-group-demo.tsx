import { SearchIcon } from 'lucide-react';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@rax-ds/ui';

export default function InputGroupDemo() {
    return (
        <InputGroup className="w-full max-w-sm">
            <InputGroupAddon>
                <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search orders" aria-label="Search orders" />
        </InputGroup>
    );
}
