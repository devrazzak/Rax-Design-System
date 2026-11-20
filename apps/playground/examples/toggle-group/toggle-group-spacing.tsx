import { ToggleGroup, ToggleGroupItem } from '@rax-ds/ui';

export default function ToggleGroupSpacing() {
    return (
        <ToggleGroup type="single" variant="outline" spacing="none" defaultValue="week" aria-label="Range">
            <ToggleGroupItem value="day">Day</ToggleGroupItem>
            <ToggleGroupItem value="week">Week</ToggleGroupItem>
            <ToggleGroupItem value="month">Month</ToggleGroupItem>
        </ToggleGroup>
    );
}
