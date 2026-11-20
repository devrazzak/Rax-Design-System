import { Stack, ToggleGroup, ToggleGroupItem } from '@rax-ds/ui';

export default function ToggleGroupVariants() {
    return (
        <Stack gap="md" align="center">
            <ToggleGroup type="single" variant="default" defaultValue="day" aria-label="Default variant">
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="week">Week</ToggleGroupItem>
                <ToggleGroupItem value="month">Month</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="single" variant="outline" defaultValue="day" aria-label="Outline variant">
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="week">Week</ToggleGroupItem>
                <ToggleGroupItem value="month">Month</ToggleGroupItem>
            </ToggleGroup>
        </Stack>
    );
}
