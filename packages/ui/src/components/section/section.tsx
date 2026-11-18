import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';

import type { SectionTag } from './section.variants';
import { defaultSpacing, defaultTag, defaultTone, spacingClasses, toneClasses } from './section.variants';

type SectionProps = ComponentProps<SectionTag> & {
    /** Which tag to render. */
    as?: SectionTag;
    /** Vertical padding of the section. */
    spacing?: keyof typeof spacingClasses;
    /** Background of the section. */
    tone?: keyof typeof toneClasses;
};

function Section({ as = defaultTag, spacing = defaultSpacing, tone = defaultTone, className, ...props }: SectionProps) {
    const Comp = as;

    return (
        <Comp data-slot="section" className={cn(spacingClasses[spacing], toneClasses[tone], className)} {...props} />
    );
}

export { Section };
export type { SectionProps };
