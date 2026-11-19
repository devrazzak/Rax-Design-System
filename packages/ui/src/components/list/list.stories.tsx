import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check } from 'lucide-react';

import { List, ListItem } from './list';
import { LIST_COLORS, LIST_GAPS, LIST_MARKERS, LIST_SIZES, LIST_TAGS } from './list.variants';

const items = ['First item', 'Second item', 'Third item'];

const meta = {
    title: 'Components/List',
    component: List,
    tags: ['autodocs'],
    args: {
        children: items.map(item => <ListItem key={item}>{item}</ListItem>),
    },
    argTypes: {
        as: { control: 'inline-radio', options: LIST_TAGS },
        marker: { control: 'inline-radio', options: LIST_MARKERS },
        gap: { control: 'select', options: LIST_GAPS },
        size: { control: 'select', options: LIST_SIZES },
        color: { control: 'select', options: LIST_COLORS },
        children: { control: false },
    },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Ordered: Story = { args: { as: 'ol' } };

export const Markers: Story = {
    render: args => (
        <div className="flex flex-col gap-6">
            {LIST_MARKERS.map(marker => (
                <List key={marker} {...args} marker={marker}>
                    {items.map(item => (
                        <ListItem key={item}>
                            {marker}: {item}
                        </ListItem>
                    ))}
                </List>
            ))}
        </div>
    ),
};

export const Gaps: Story = {
    render: args => (
        <div className="flex flex-col gap-6">
            {LIST_GAPS.map(gap => (
                <List key={gap} {...args} gap={gap}>
                    {items.map(item => (
                        <ListItem key={item}>
                            {gap}: {item}
                        </ListItem>
                    ))}
                </List>
            ))}
        </div>
    ),
};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-6">
            {LIST_SIZES.map(size => (
                <List key={size} {...args} size={size}>
                    {items.map(item => (
                        <ListItem key={item}>
                            {size}: {item}
                        </ListItem>
                    ))}
                </List>
            ))}
        </div>
    ),
};

export const WithIcons: Story = {
    args: {
        marker: 'none',
        children: items.map(item => (
            <ListItem key={item} icon={<Check className="text-primary" />}>
                {item}
            </ListItem>
        )),
    },
};
