/** Trigger height, text size (trigger and content) and chevron size, set once on the root. */
export const sizeClasses = {
    sm: '[&_[data-slot=accordion-trigger]]:min-h-10 [&_[data-slot=accordion-trigger]]:text-sm [&_[data-slot=accordion-trigger-icon]]:size-4 [&_[data-slot=accordion-content]]:text-sm',
    md: '[&_[data-slot=accordion-trigger]]:min-h-12 [&_[data-slot=accordion-trigger]]:text-base [&_[data-slot=accordion-trigger-icon]]:size-5 [&_[data-slot=accordion-content]]:text-base',
    lg: '[&_[data-slot=accordion-trigger]]:min-h-14 [&_[data-slot=accordion-trigger]]:text-lg [&_[data-slot=accordion-trigger-icon]]:size-5 [&_[data-slot=accordion-content]]:text-lg',
    xl: '[&_[data-slot=accordion-trigger]]:min-h-16 [&_[data-slot=accordion-trigger]]:text-xl [&_[data-slot=accordion-trigger-icon]]:size-6 [&_[data-slot=accordion-content]]:text-xl',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const ACCORDION_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultSize: keyof typeof sizeClasses = 'md';
