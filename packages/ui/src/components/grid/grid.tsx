import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';
import { defaultGap, gapClasses } from '@/lib/utils/gap-classes';

import {
    baseColumnsClasses,
    columnsClasses,
    defaultColumns,
    lgColumnsClasses,
    smColumnsClasses,
    spanClasses,
    xlColumnsClasses,
} from './grid.variants';

type Columns = keyof typeof columnsClasses;

/** Column count per breakpoint. `base` is below `sm` and defaults to 1. A missing breakpoint keeps the one before it. */
interface ResponsiveColumns {
    base?: Columns;
    sm?: Columns;
    md?: Columns;
    lg?: Columns;
    xl?: Columns;
}

type GridProps = ComponentProps<'div'> & {
    /**
     * A number applies from the `md` breakpoint up, and the grid is one column below it.
     * An object sets the count per breakpoint, for example `{ base: 1, md: 2, lg: 4 }`. Breakpoints: base, sm, md, lg, xl.
     */
    columns?: Columns | ResponsiveColumns;
    /** Space between the items. */
    gap?: keyof typeof gapClasses;
};

type GridItemProps = ComponentProps<'div'> & {
    /** How many columns the item covers from the `md` breakpoint up. */
    span?: keyof typeof spanClasses;
};

function Grid({ columns = defaultColumns, gap = defaultGap, className, ...props }: GridProps) {
    const responsive: ResponsiveColumns = typeof columns === 'number' ? { md: columns } : columns;
    const { base = 1, sm, md, lg, xl } = responsive;

    return (
        <div
            data-slot="grid"
            className={cn(
                'grid',
                baseColumnsClasses[base],
                sm && smColumnsClasses[sm],
                md && columnsClasses[md],
                lg && lgColumnsClasses[lg],
                xl && xlColumnsClasses[xl],
                gapClasses[gap],
                className,
            )}
            {...props}
        />
    );
}

function GridItem({ span, className, ...props }: GridItemProps) {
    return <div data-slot="grid-item" className={cn(span && spanClasses[span], className)} {...props} />;
}

export { Grid, GridItem };
export type { GridItemProps, GridProps };
