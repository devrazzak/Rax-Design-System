import type { ReactNode } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { GAPS } from '@/lib/utils/gap-classes';

import { Stack } from './stack';
import { STACK_ALIGNS } from './stack.variants';

const Box = ({ children }: { children: ReactNode }) => (
    <div className="rounded-md border border-border bg-muted p-4">{children}</div>
);

const meta = {
    title: 'Components/Stack',
    component: Stack,
    tags: ['autodocs'],
    args: {
        children: (
            <>
                <Box>One</Box>
                <Box>Two</Box>
                <Box>Three</Box>
            </>
        ),
    },
    argTypes: {
        gap: { control: 'select', options: GAPS },
        align: { control: 'select', options: STACK_ALIGNS },
        children: { control: false },
    },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Gaps: Story = {
    render: args => (
        <div className="flex flex-col gap-8">
            {GAPS.map(gap => (
                <Stack key={gap} {...args} gap={gap}>
                    <Box>{gap} gap</Box>
                    <Box>{gap} gap</Box>
                </Stack>
            ))}
        </div>
    ),
};

export const Aligns: Story = {
    render: args => (
        <div className="flex flex-col gap-8">
            {STACK_ALIGNS.map(align => (
                <Stack key={align} {...args} align={align}>
                    <Box>{align} align</Box>
                    <Box>{align} align, a longer item</Box>
                </Stack>
            ))}
        </div>
    ),
};
