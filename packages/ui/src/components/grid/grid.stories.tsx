import type { ReactNode } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { GAPS } from '@/lib/utils/gap-classes';

import { Grid, GridItem } from './grid';
import { GRID_COLUMNS } from './grid.variants';

const Box = ({ children }: { children: ReactNode }) => (
    <div className="rounded-md border border-border bg-muted p-4">{children}</div>
);

const items = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

const meta = {
    title: 'Components/Grid',
    component: Grid,
    tags: ['autodocs'],
    args: {
        children: items.map(item => <Box key={item}>{item}</Box>),
    },
    argTypes: {
        columns: {
            control: 'object',
            description: 'A number (from `md` up) or an object like `{ base: 1, md: 2, lg: 4 }`.',
        },
        gap: { control: 'select', options: GAPS },
        children: { control: false },
    },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Columns: Story = {
    render: args => (
        <div className="flex flex-col gap-8">
            {GRID_COLUMNS.map(columns => (
                <Grid key={columns} {...args} columns={columns}>
                    {Array.from({ length: columns }, (_, index) => (
                        <Box key={index}>{columns} columns</Box>
                    ))}
                </Grid>
            ))}
        </div>
    ),
};

export const Responsive: Story = {
    args: { columns: { base: 1, md: 2, lg: 4 } },
};

export const Gaps: Story = {
    render: args => (
        <div className="flex flex-col gap-8">
            {GAPS.map(gap => (
                <Grid key={gap} {...args} gap={gap}>
                    <Box>{`${gap} gap`}</Box>
                    <Box>{`${gap} gap`}</Box>
                    <Box>{`${gap} gap`}</Box>
                </Grid>
            ))}
        </div>
    ),
};

export const Spans: Story = {
    args: { columns: 12 },
    render: args => (
        <Grid {...args}>
            <GridItem span={12}>
                <Box>span 12</Box>
            </GridItem>
            <GridItem span={6}>
                <Box>span 6</Box>
            </GridItem>
            <GridItem span={6}>
                <Box>span 6</Box>
            </GridItem>
            <GridItem span={4}>
                <Box>span 4</Box>
            </GridItem>
            <GridItem span={4}>
                <Box>span 4</Box>
            </GridItem>
            <GridItem span={4}>
                <Box>span 4</Box>
            </GridItem>
            <GridItem span={8}>
                <Box>span 8</Box>
            </GridItem>
            <GridItem span={4}>
                <Box>span 4</Box>
            </GridItem>
        </Grid>
    ),
};
