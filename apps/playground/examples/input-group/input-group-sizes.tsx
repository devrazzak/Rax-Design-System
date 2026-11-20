import { SearchIcon } from 'lucide-react';

import { InputGroup, InputGroupAddon, InputGroupInput, Stack } from '@rax-ds/ui';

export default function InputGroupSizes() {
    return (
        <Stack className="w-full max-w-sm">
            <InputGroup size="sm">
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput placeholder="Small" aria-label="Small" />
            </InputGroup>
            <InputGroup size="md">
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput placeholder="Medium, the default" aria-label="Medium" />
            </InputGroup>
            <InputGroup size="lg">
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput placeholder="Large" aria-label="Large" />
            </InputGroup>
            <InputGroup size="xl">
                <InputGroupAddon>
                    <SearchIcon />
                </InputGroupAddon>
                <InputGroupInput placeholder="Extra large" aria-label="Extra large" />
            </InputGroup>
        </Stack>
    );
}
