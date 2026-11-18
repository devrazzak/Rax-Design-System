import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';
import { defaultGap, gapClasses } from '@/lib/utils/gap-classes';

import { columnsClasses, defaultColumns, spanClasses } from './grid.variants';

type GridProps = ComponentProps<'div'> & {
    /** Number of columns from the `md` breakpoint up. Below it the grid is one column. */
    columns?: keyof typeof columnsClasses;
    /** Space between the items. */
    gap?: keyof typeof gapClasses;
};

type GridItemProps = ComponentProps<'div'> & {
    /** How many columns the item covers from the `md` breakpoint up. */
    span?: keyof typeof spanClasses;
};

function Grid({ columns = defaultColumns, gap = defaultGap, className, ...props }: GridProps) {
    return (
        <div
            data-slot="grid"
            className={cn('grid grid-cols-1', columnsClasses[columns], gapClasses[gap], className)}
            {...props}
        />
    );
}

function GridItem({ span, className, ...props }: GridItemProps) {
    return <div data-slot="grid-item" className={cn(span && spanClasses[span], className)} {...props} />;
}

export { Grid, GridItem };
export type { GridItemProps, GridProps };
