import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';
import { defaultGap, gapClasses } from '@/lib/utils/gap-classes';

import { alignClasses, defaultAlign, defaultJustify, justifyClasses } from './row.variants';

type RowProps = ComponentProps<'div'> & {
    /** Space between the children. */
    gap?: keyof typeof gapClasses;
    /** Vertical alignment of the children. */
    align?: keyof typeof alignClasses;
    /** Horizontal distribution of the children. */
    justify?: keyof typeof justifyClasses;
    /** Move the children to the next line when they do not fit. */
    wrap?: boolean;
};

function Row({
    gap = defaultGap,
    align = defaultAlign,
    justify = defaultJustify,
    wrap = false,
    className,
    ...props
}: RowProps) {
    return (
        <div
            data-slot="row"
            className={cn(
                'flex',
                wrap && 'flex-wrap',
                gapClasses[gap],
                alignClasses[align],
                justifyClasses[justify],
                className,
            )}
            {...props}
        />
    );
}

export { Row };
export type { RowProps };
