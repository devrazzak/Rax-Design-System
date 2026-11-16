/** The size sets the thickness of the bar. */
export const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const PROGRESS_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultSize: keyof typeof sizeClasses = 'md';
