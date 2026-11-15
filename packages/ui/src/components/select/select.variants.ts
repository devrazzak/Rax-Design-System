/** Heights match Input so both line up in a form. */
export const sizeClasses = {
    sm: 'h-10 px-3 text-sm',
    md: 'h-12 px-4 text-base',
    lg: 'h-14 px-5 text-lg',
    xl: 'h-16 px-6 text-xl',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const SELECT_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultSize: keyof typeof sizeClasses = 'md';
