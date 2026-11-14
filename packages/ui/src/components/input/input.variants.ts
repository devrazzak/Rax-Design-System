export const sizeClasses = {
    sm: 'h-8 px-2.5',
    md: 'h-11 px-3',
    lg: 'h-12 px-4',
    xl: 'h-14 px-4',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const INPUT_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultSize: keyof typeof sizeClasses = 'md';
