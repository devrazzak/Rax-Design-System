/** Column count below the `sm` breakpoint. Only used with the responsive `columns` object. */
export const baseColumnsClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
};

/** Column count from the `sm` breakpoint up. Only used with the responsive `columns` object. */
export const smColumnsClasses = {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
    6: 'sm:grid-cols-6',
    12: 'sm:grid-cols-12',
};

/** Below the `md` breakpoint every grid is one column. From `md` up the chosen column count applies. */
export const columnsClasses = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    6: 'md:grid-cols-6',
    12: 'md:grid-cols-12',
};

/** Column count from the `lg` breakpoint up. Only used with the responsive `columns` object. */
export const lgColumnsClasses = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    6: 'lg:grid-cols-6',
    12: 'lg:grid-cols-12',
};

/** Column count from the `xl` breakpoint up. Only used with the responsive `columns` object. */
export const xlColumnsClasses = {
    1: 'xl:grid-cols-1',
    2: 'xl:grid-cols-2',
    3: 'xl:grid-cols-3',
    4: 'xl:grid-cols-4',
    6: 'xl:grid-cols-6',
    12: 'xl:grid-cols-12',
};

/** How many columns a GridItem covers from `md` up. Below `md` every item takes the full row. */
export const spanClasses = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
    7: 'md:col-span-7',
    8: 'md:col-span-8',
    9: 'md:col-span-9',
    10: 'md:col-span-10',
    11: 'md:col-span-11',
    12: 'md:col-span-12',
};

export const defaultColumns: keyof typeof columnsClasses = 2;

/** Names are read from the objects above, so stories and tests never drift from the component. */
export const GRID_COLUMNS = Object.keys(columnsClasses).map(Number) as (keyof typeof columnsClasses)[];
export const GRID_SPANS = Object.keys(spanClasses).map(Number) as (keyof typeof spanClasses)[];
