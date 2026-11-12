import type { Meta, StoryObj } from '@storybook/react-vite';

import { cn } from '@/lib/cn';

/**
 * Class names must be written in full so Tailwind can detect them.
 * Building them dynamically (e.g. `bg-${name}`) would produce no CSS.
 */
const SWATCHES = [
    { name: 'background', className: 'bg-background text-foreground border' },
    { name: 'card', className: 'bg-card text-card-foreground border' },
    { name: 'popover', className: 'bg-popover text-popover-foreground border' },
    { name: 'primary', className: 'bg-primary text-primary-foreground' },
    { name: 'secondary', className: 'bg-secondary text-secondary-foreground' },
    { name: 'muted', className: 'bg-muted text-muted-foreground' },
    { name: 'accent', className: 'bg-accent text-accent-foreground' },
    { name: 'destructive', className: 'bg-destructive text-destructive-foreground' },
] as const;

function ColorPalette() {
    return (
        <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
            {SWATCHES.map(swatch => (
                <div
                    key={swatch.name}
                    className={cn('flex h-24 items-end rounded-lg p-3 text-sm font-medium', swatch.className)}
                >
                    {swatch.name}
                </div>
            ))}
        </div>
    );
}

const meta = {
    title: 'Foundations/Colors',
    component: ColorPalette,
    parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Semantic: Story = {};
