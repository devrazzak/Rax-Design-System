import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';
import { defaultGap, gapClasses } from '@/lib/utils/gap-classes';

import { alignClasses, defaultAlign } from './stack.variants';

type StackProps = ComponentProps<'div'> & {
    /** Space between the children. */
    gap?: keyof typeof gapClasses;
    /** Horizontal alignment of the children. */
    align?: keyof typeof alignClasses;
};

function Stack({ gap = defaultGap, align = defaultAlign, className, ...props }: StackProps) {
    return (
        <div
            data-slot="stack"
            className={cn('flex flex-col', gapClasses[gap], alignClasses[align], className)}
            {...props}
        />
    );
}

export { Stack };
export type { StackProps };
