/** Gap scale shared by Stack, Row and Grid, so spacing stays the same in every layout component. */
export const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
};

export const defaultGap: keyof typeof gapClasses = 'md';

/** Names are read from the object above, so stories and tests never drift from the component. */
export const GAPS = Object.keys(gapClasses) as (keyof typeof gapClasses)[];
