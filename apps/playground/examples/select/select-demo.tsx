import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@rax-ds/ui';

export default function SelectDemo() {
    return (
        <Select>
            <SelectTrigger aria-label="Status" className="w-full max-w-sm">
                <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
        </Select>
    );
}
