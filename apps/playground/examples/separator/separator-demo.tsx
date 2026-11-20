import { Heading, Separator, Stack, Text } from '@rax-ds/ui';

export default function SeparatorDemo() {
    return (
        <Stack className="w-full max-w-sm">
            <Stack gap="sm">
                <Heading as="h3" size="lg">
                    Account
                </Heading>
                <Text color="muted">Manage your profile and preferences.</Text>
            </Stack>
            <Separator />
            <Text size="sm">Settings</Text>
        </Stack>
    );
}
