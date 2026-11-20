import { SearchIcon } from 'lucide-react';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@rax-ds/ui';

export default function InputGroupDisabled() {
    return (
        <InputGroup className="w-full max-w-sm">
            <InputGroupAddon>
                <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput disabled placeholder="Search orders" aria-label="Search orders" />
        </InputGroup>
    );
}
