export const SECTION_TAGS = ['section', 'article', 'aside', 'header', 'footer'] as const;

export type SectionTag = (typeof SECTION_TAGS)[number];

/** Vertical padding. It grows smoothly with the screen width between a minimum and a maximum. */
export const spacingClasses = {
    sm: 'py-[clamp(1.5rem,4vw,2rem)]',
    md: 'py-[clamp(2rem,6vw,4rem)]',
    lg: 'py-[clamp(3rem,8vw,6rem)]',
    xl: 'py-[clamp(4rem,10vw,8rem)]',
};

/** Background only. It comes from semantic tokens, so dark mode follows. */
export const toneClasses = {
    default: 'bg-background',
    muted: 'bg-muted',
    primary: 'bg-primary',
    secondary: 'bg-secondary',
};

export const defaultTag: SectionTag = 'section';
export const defaultSpacing: keyof typeof spacingClasses = 'md';
export const defaultTone: keyof typeof toneClasses = 'default';

/** Names are read from the object above, so stories and tests never drift from the component. */
export const SECTION_SPACINGS = Object.keys(spacingClasses) as (keyof typeof spacingClasses)[];
export const SECTION_TONES = Object.keys(toneClasses) as (keyof typeof toneClasses)[];
