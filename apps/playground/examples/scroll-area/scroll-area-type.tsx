import { ScrollArea, Stack, Text } from '@rax-ds/ui';

const notes = ['Release notes', 'Billing update', 'New dashboard', 'Security notice', 'Team changes', 'Maintenance'];

export default function ScrollAreaType() {
    return (
        <ScrollArea type="always" className="h-40 w-full max-w-sm rounded-md border border-border">
            <Stack gap="sm" className="p-4">
                {notes.map(note => (
                    <Text key={note} size="sm">
                        {note}
                    </Text>
                ))}
            </Stack>
        </ScrollArea>
    );
}
