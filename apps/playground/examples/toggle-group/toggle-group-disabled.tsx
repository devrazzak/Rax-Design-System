import { Stack, ToggleGroup, ToggleGroupItem } from '@rax-ds/ui';

export default function ToggleGroupDisabled() {
    return (
        <Stack gap="md" align="center">
            <ToggleGroup type="single" variant="outline" disabled defaultValue="day" aria-label="Whole group disabled">
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="week">Week</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="single" variant="outline" defaultValue="day" aria-label="One item disabled">
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="week" disabled>
                    Week
                </ToggleGroupItem>
            </ToggleGroup>
        </Stack>
    );
}
