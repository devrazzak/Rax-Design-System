import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Progress } from './progress';
import { PROGRESS_SIZES } from './progress.variants';

const meta = {
    title: 'Components/Progress',
    component: Progress,
    tags: ['autodocs'],
    args: { value: 60, 'aria-label': 'Upload progress', className: 'w-72' },
    argTypes: {
        size: { control: 'inline-radio', options: PROGRESS_SIZES },
        value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
        max: { control: 'number' },
    },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-6">
            {PROGRESS_SIZES.map(size => (
                <div key={size} className="flex items-center gap-4">
                    <span className="w-6 text-sm text-muted-foreground">{size}</span>
                    <Progress {...args} size={size} />
                </div>
            ))}
        </div>
    ),
};

/** The bar fills by `value / max`, so a custom `max` works too. Here 3 of 5 steps are done. */
export const CustomMax: Story = {
    args: { value: 3, max: 5, 'aria-label': 'Steps completed' },
};

/** The indicator slides smoothly when `value` changes. */
export const Animated: Story = {
    render: args => {
        function AnimatedProgress() {
            const [value, setValue] = useState(10);

            useEffect(() => {
                const timer = setInterval(() => {
                    setValue(current => (current >= 100 ? 10 : current + 15));
                }, 1000);

                return () => clearInterval(timer);
            }, []);

            return <Progress {...args} value={value} />;
        }

        return <AnimatedProgress />;
    },
};
