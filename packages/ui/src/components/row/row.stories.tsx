import type { ReactNode } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/lib/utils/cn';
import { GAPS } from '@/lib/utils/gap-classes';

import { Row } from './row';
import { ROW_ALIGNS, ROW_JUSTIFIES } from './row.variants';

const Box = ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={cn('rounded-md border border-border bg-muted p-4', className)}>{children}</div>
);

const meta = {
    title: 'Components/Row',
    component: Row,
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
        align: { control: 'select', options: ROW_ALIGNS },
        justify: { control: 'select', options: ROW_JUSTIFIES },
        wrap: { control: 'boolean' },
        children: { control: false },
    },
} satisfies Meta<typeof Row>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Gaps: Story = {
    render: args => (
        <div className="flex flex-col gap-8">
            {GAPS.map(gap => (
                <Row key={gap} {...args} gap={gap}>
                    <Box>{gap} gap</Box>
                    <Box>{gap} gap</Box>
                </Row>
            ))}
        </div>
    ),
};

export const Aligns: Story = {
    render: args => (
        <div className="flex flex-col gap-8">
            {ROW_ALIGNS.map(align => (
                <Row key={align} {...args} align={align}>
                    <Box>{align} align</Box>
                    <Box className="py-10">taller item</Box>
                </Row>
            ))}
        </div>
    ),
};

export const Justifies: Story = {
    render: args => (
        <div className="flex flex-col gap-8">
            {ROW_JUSTIFIES.map(justify => (
                <Row key={justify} {...args} justify={justify}>
                    <Box>{justify} justify</Box>
                    <Box>Two</Box>
                </Row>
            ))}
        </div>
    ),
};

export const Wrap: Story = {
    args: { wrap: true },
    render: args => (
        <div className="w-64">
            <Row {...args}>
                {['One', 'Two', 'Three', 'Four', 'Five'].map(item => (
                    <Box key={item} className="shrink-0">
                        {item}
                    </Box>
                ))}
            </Row>
        </div>
    ),
};
