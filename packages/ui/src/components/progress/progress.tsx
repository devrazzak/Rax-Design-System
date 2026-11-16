import type { ComponentProps } from 'react';

import { Progress as ProgressPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils/cn';

import { defaultSize, sizeClasses } from './progress.variants';

type ProgressProps = ComponentProps<typeof ProgressPrimitive.Root> & {
    size?: keyof typeof sizeClasses;
};

function Progress({ size = defaultSize, className, value, max = 100, ...props }: ProgressProps) {
    // Share of the bar that is filled, kept between 0 and 100 so the indicator never leaves the track
    const percent = Math.min(Math.max(((value ?? 0) / max) * 100, 0), 100);

    return (
        <ProgressPrimitive.Root
            data-slot="progress"
            value={value}
            max={max}
            className={cn('w-full overflow-hidden rounded-md bg-input', sizeClasses[size], className)}
            {...props}
        >
            <ProgressPrimitive.Indicator
                data-slot="progress-indicator"
                className="size-full bg-primary transition-transform"
                style={{ transform: `translateX(-${String(100 - percent)}%)` }}
            />
        </ProgressPrimitive.Root>
    );
}

export { Progress };
export type { ProgressProps };
