/** The circle size, and the size of the dot inside it. */
export const sizeClasses = {
    sm: 'size-4 [&>span]:size-1.5',
    md: 'size-5 [&>span]:size-2',
    lg: 'size-6 [&>span]:size-2.5',
    xl: 'size-7 [&>span]:size-3',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const RADIO_GROUP_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultSize: keyof typeof sizeClasses = 'md';
