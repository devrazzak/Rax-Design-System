'use client';

import type { ComponentProps } from 'react';

import { Label as LabelPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils/cn';

import { defaultSize, sizeClasses } from './label.variants';

type LabelProps = ComponentProps<typeof LabelPrimitive.Root> & {
    size?: keyof typeof sizeClasses;
};

function Label({ size = defaultSize, className, ...props }: LabelProps) {
    return (
        <LabelPrimitive.Root
            data-slot="label"
            className={cn(
                sizeClasses[size],
                'font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
                className,
            )}
            {...props}
        />
    );
}

export { Label };
export type { LabelProps };
