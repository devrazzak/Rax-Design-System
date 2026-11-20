import { OptionSelect, Stack } from '@rax-ds/ui';

const options = [
    { value: 'pending', label: 'Pending' },
    { value: 'shipped', label: 'Shipped' },
];

export default function OptionSelectSizes() {
    return (
        <Stack className="w-full max-w-sm">
            <OptionSelect options={options} size="sm" placeholder="Small" aria-label="Small" />
            <OptionSelect options={options} size="md" placeholder="Medium, the default" aria-label="Medium" />
            <OptionSelect options={options} size="lg" placeholder="Large" aria-label="Large" />
            <OptionSelect options={options} size="xl" placeholder="Extra large" aria-label="Extra large" />
        </Stack>
    );
}
