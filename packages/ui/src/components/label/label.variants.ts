export const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const LABEL_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultSize: keyof typeof sizeClasses = 'md';
