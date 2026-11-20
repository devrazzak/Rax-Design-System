import { Stack, Text } from '@rax-ds/ui';

export default function TextAs() {
    return (
        <Stack gap="md" className="w-full max-w-sm">
            <Text as="p">
                A paragraph with an inline{' '}
                <Text as="span" weight="semibold">
                    highlighted
                </Text>{' '}
                word.
            </Text>
            <Text as="div" color="muted">
                A div, for text that is not a paragraph.
            </Text>
        </Stack>
    );
}
