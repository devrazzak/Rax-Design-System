/** Track size, thumb size, and how far the thumb travels when checked (track width - thumb - 4px border). */
export const sizeClasses = {
    sm: 'h-5 w-9 [&>span]:size-4 data-[state=checked]:[&>span]:translate-x-4',
    md: 'h-6 w-11 [&>span]:size-5 data-[state=checked]:[&>span]:translate-x-5',
    lg: 'h-7 w-13 [&>span]:size-6 data-[state=checked]:[&>span]:translate-x-6',
    xl: 'h-8 w-15 [&>span]:size-7 data-[state=checked]:[&>span]:translate-x-7',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const SWITCH_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultSize: keyof typeof sizeClasses = 'md';
