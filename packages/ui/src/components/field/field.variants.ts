/** Vertical stacks the label above the control; horizontal puts them side by side (checkbox, radio, switch). */
export const orientationClasses = {
    vertical: 'flex-col',
    horizontal: 'flex-row items-center has-[>[data-slot=field-content]]:items-start',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const FIELD_ORIENTATIONS = Object.keys(orientationClasses) as (keyof typeof orientationClasses)[];

export const defaultOrientation: keyof typeof orientationClasses = 'vertical';
