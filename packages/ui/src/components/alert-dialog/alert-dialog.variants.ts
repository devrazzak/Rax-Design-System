/** Alert dialog width. Confirmations are short, so there is no `full` size like in Dialog. */
export const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const ALERT_DIALOG_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultSize: keyof typeof sizeClasses = 'md';
