import { Stack, ToggleGroup, ToggleGroupItem } from '@rax-ds/ui';

export default function ToggleGroupSizes() {
    return (
        <Stack gap="md" align="center">
            <ToggleGroup type="single" size="sm" variant="outline" defaultValue="day" aria-label="Small">
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="week">Week</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="single" size="md" variant="outline" defaultValue="day" aria-label="Medium">
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="week">Week</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="single" size="lg" variant="outline" defaultValue="day" aria-label="Large">
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="week">Week</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="single" size="xl" variant="outline" defaultValue="day" aria-label="Extra large">
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="week">Week</ToggleGroupItem>
            </ToggleGroup>
        </Stack>
    );
}
