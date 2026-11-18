export const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
};

export const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
};

export const defaultAlign: keyof typeof alignClasses = 'center';
export const defaultJustify: keyof typeof justifyClasses = 'start';

/** Names are read from the objects above, so stories and tests never drift from the component. */
export const ROW_ALIGNS = Object.keys(alignClasses) as (keyof typeof alignClasses)[];
export const ROW_JUSTIFIES = Object.keys(justifyClasses) as (keyof typeof justifyClasses)[];
