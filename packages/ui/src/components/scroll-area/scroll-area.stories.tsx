import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from '@/components/separator/separator';

import { ScrollArea, ScrollBar } from './scroll-area';

const TAGS = Array.from({ length: 50 }, (_, index) => `v1.2.0-beta.${String(50 - index)}`);
const ARTWORKS = Array.from({ length: 12 }, (_, index) => `Artwork ${String(index + 1)}`);

// ScrollArea needs a fixed size, so the height and width come from className in every story.
const meta = {
    title: 'Components/ScrollArea',
    component: ScrollArea,
    tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
/** Vertical scrolling. The size is set with `className`, and the scrollbar shows up when the content is taller. */
export const Default: Story = {
    render: args => (
        <ScrollArea {...args} className="h-72 w-48 rounded-md border border-border">
            <div className="p-4">
                <h4 className="mb-4 text-sm font-medium">Tags</h4>
                {TAGS.map(tag => (
                    <div key={tag}>
                        <div className="text-sm">{tag}</div>
                        <Separator className="my-2" />
                    </div>
                ))}
            </div>
        </ScrollArea>
    ),
};

/** Horizontal scrolling needs an extra `ScrollBar` with `orientation="horizontal"`. */
export const Horizontal: Story = {
    render: args => (
        <ScrollArea {...args} className="w-96 rounded-md border border-border whitespace-nowrap">
            <div className="flex w-max gap-4 p-4">
                {ARTWORKS.map(artwork => (
                    <div
                        key={artwork}
                        className="flex h-32 w-32 shrink-0 items-center justify-center rounded-md bg-muted text-sm text-muted-foreground"
                    >
                        {artwork}
                    </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    ),
};

/** Both scrollbars together, for content wider and taller than the area. */
export const Both: Story = {
    render: args => (
        <ScrollArea {...args} className="h-72 w-80 rounded-md border border-border">
            <div className="grid w-max grid-cols-6 gap-2 p-4">
                {Array.from({ length: 60 }, (_, index) => (
                    <div
                        key={index}
                        className="flex size-24 items-center justify-center rounded-md bg-muted text-sm text-muted-foreground"
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    ),
};

/** Scrolling is still native, so wheel, touch and keyboard all work. Click inside the area and use the arrow keys. */
export const Keyboard: Story = {
    render: args => (
        <ScrollArea {...args} className="h-40 w-64 rounded-md border border-border">
            <div className="p-4 text-sm">
                <p>
                    Radix ScrollArea keeps the native scroll behavior, so wheel, touch, arrow keys, Page Up and Page
                    Down all work.
                </p>
                <p className="mt-4">
                    The custom scrollbar only replaces how the bar looks. The scrolling itself is still done by the
                    browser.
                </p>
                <p className="mt-4">Keep scrolling to see the thumb move along the track.</p>
                <p className="mt-4">One more paragraph so there is enough content to scroll through the area.</p>
            </div>
        </ScrollArea>
    ),
};
