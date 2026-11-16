import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';

type SkeletonProps = ComponentProps<'div'>;

function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            data-slot="skeleton"
            className={cn('animate-pulse rounded-md bg-skeleton motion-reduce:animate-none', className)}
            {...props}
        />
    );
}

export { Skeleton };
export type { SkeletonProps };
