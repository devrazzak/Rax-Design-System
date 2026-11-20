import { OptionSelect } from '@rax-ds/ui';

const options = [
    { value: 'pending', label: 'Pending' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
];

export default function OptionSelectDemo() {
    return (
        <OptionSelect options={options} placeholder="Select a status" aria-label="Status" className="w-full max-w-sm" />
    );
}
