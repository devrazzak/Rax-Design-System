/** Text size of the whole trail, set once on the root. Separator and ellipsis icons follow it (1em). */
export const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const BREADCRUMB_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultSize: keyof typeof sizeClasses = 'md';
