/** Dialog width. `full` fills the screen width and leaves a small margin on each side. */
export const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    full: 'sm:max-w-[calc(100%-2rem)]',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const DIALOG_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultSize: keyof typeof sizeClasses = 'md';
