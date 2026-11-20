import { InputGroup, InputGroupAddon, InputGroupInput, Stack } from '@rax-ds/ui';

export default function InputGroupAddons() {
    return (
        <Stack className="w-full max-w-sm">
            <InputGroup>
                <InputGroupAddon>https://</InputGroupAddon>
                <InputGroupInput placeholder="example.com" aria-label="Website" />
            </InputGroup>
            <InputGroup>
                <InputGroupInput placeholder="70" inputMode="numeric" aria-label="Weight" />
                <InputGroupAddon>kg</InputGroupAddon>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>$</InputGroupAddon>
                <InputGroupInput placeholder="0.00" inputMode="decimal" aria-label="Amount" />
                <InputGroupAddon>USD</InputGroupAddon>
            </InputGroup>
        </Stack>
    );
}
