import type { Meta, StoryObj } from '@storybook/react-vite';

import { Skeleton } from './skeleton';

const meta = {
    title: 'Components/Skeleton',
    component: Skeleton,
    tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {
    args: { className: 'h-4 w-64' },
};

/**
 * The skeleton has no role or label. Mark the loading area with `aria-busy="true"`
 * so screen readers know the content is not ready yet.
 */
export const Profile: Story = {
    render: () => (
        <div aria-busy="true" className="flex items-center gap-4">
            <Skeleton className="size-12 rounded-full" />
            <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-60" />
                <Skeleton className="h-4 w-48" />
            </div>
        </div>
    ),
};

export const Card: Story = {
    render: () => (
        <div aria-busy="true" className="flex w-72 flex-col gap-3">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
        </div>
    ),
};
