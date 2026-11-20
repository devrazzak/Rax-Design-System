import { OptionSelect, Stack } from '@rax-ds/ui';

const options = [
    { value: 'pending', label: 'Pending' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'cancelled', label: 'Cancelled', disabled: true },
];

export default function OptionSelectDisabled() {
    return (
        <Stack className="w-full max-w-sm">
            <OptionSelect options={options} disabled placeholder="Disabled select" aria-label="Disabled select" />
            <OptionSelect options={options} placeholder="Disabled option" aria-label="Status with a disabled option" />
        </Stack>
    );
}
