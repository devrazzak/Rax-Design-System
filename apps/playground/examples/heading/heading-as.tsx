import { Heading, Stack } from '@rax-ds/ui';

export default function HeadingAs() {
    return (
        <Stack gap="sm">
            <Heading as="h1">h1 gets size 5xl</Heading>
            <Heading as="h2">h2 gets size 4xl</Heading>
            <Heading as="h3">h3 gets size 3xl</Heading>
            <Heading as="h4">h4 gets size 2xl</Heading>
            <Heading as="h5">h5 gets size xl</Heading>
            <Heading as="h6">h6 gets size lg</Heading>
        </Stack>
    );
}
