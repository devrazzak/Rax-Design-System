import { Heading, Stack } from '@rax-ds/ui';

export default function HeadingTextTransform() {
    return (
        <Stack gap="sm">
            <Heading as="h3" textTransform="uppercase">
                Uppercase
            </Heading>
            <Heading as="h3" textTransform="lowercase">
                Lowercase
            </Heading>
            <Heading as="h3" textTransform="capitalize">
                capitalize each word
            </Heading>
        </Stack>
    );
}
