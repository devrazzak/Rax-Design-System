/** The box size, and the size of the check mark inside it. */
export const sizeClasses = {
    sm: 'size-4 [&_svg]:size-3',
    md: 'size-5 [&_svg]:size-3.5',
    lg: 'size-6 [&_svg]:size-4',
    xl: 'size-7 [&_svg]:size-5',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const CHECKBOX_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultSize: keyof typeof sizeClasses = 'md';
