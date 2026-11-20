import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from '@rax-ds/ui';

export default function SelectGroups() {
    return (
        <Select>
            <SelectTrigger aria-label="Time zone" className="w-full max-w-sm">
                <SelectValue placeholder="Select a time zone" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Europe</SelectLabel>
                    <SelectItem value="london">London</SelectItem>
                    <SelectItem value="berlin">Berlin</SelectItem>
                </SelectGroup>
                <SelectSeparator />
                <SelectGroup>
                    <SelectLabel>North America</SelectLabel>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="los-angeles">Los Angeles</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
