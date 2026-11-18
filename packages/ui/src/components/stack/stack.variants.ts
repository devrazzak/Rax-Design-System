export const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
};

export const defaultAlign: keyof typeof alignClasses = 'stretch';

/** Names are read from the object above, so stories and tests never drift from the component. */
export const STACK_ALIGNS = Object.keys(alignClasses) as (keyof typeof alignClasses)[];
