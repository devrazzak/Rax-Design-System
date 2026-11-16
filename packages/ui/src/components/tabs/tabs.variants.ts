/**
 * `default` puts the tabs on a muted background, and the active tab rises like a card.
 * `line` has no background, and the active tab gets a line under it (or beside it when vertical).
 */
export const variantClasses = {
    default: 'bg-muted p-1',
    line: 'gap-1 bg-transparent',
};

/**
 * The size sets the text size and, through `--tabs-trigger-height`, the height of every tab.
 * With the padding of the `default` variant, the list is as high as an Input of the same size.
 */
export const sizeClasses = {
    sm: 'text-sm [--tabs-trigger-height:--spacing(8)]',
    md: 'text-base [--tabs-trigger-height:--spacing(10)]',
    lg: 'text-lg [--tabs-trigger-height:--spacing(12)]',
    xl: 'text-xl [--tabs-trigger-height:--spacing(14)]',
};

/** Names are read from the objects above, so stories and tests never drift from the component. */
export const TABS_VARIANTS = Object.keys(variantClasses) as (keyof typeof variantClasses)[];
export const TABS_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultVariants = { variant: 'default', size: 'md' } as const satisfies {
    variant: keyof typeof variantClasses;
    size: keyof typeof sizeClasses;
};
