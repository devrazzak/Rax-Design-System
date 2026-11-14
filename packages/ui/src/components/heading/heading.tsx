import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';

import type { HeadingTag } from './heading.variants';
import {
    colorClasses,
    defaultColor,
    defaultSizeByTag,
    defaultTag,
    defaultWeight,
    sizeClasses,
    weightClasses,
} from './heading.variants';

type HeadingProps = ComponentProps<HeadingTag> & {
    /** Which heading tag to render. Size follows the tag unless `size` is passed. */
    as?: HeadingTag;
    /** Visual size only. Does not change the tag. */
    size?: keyof typeof sizeClasses;
    weight?: keyof typeof weightClasses;
    color?: keyof typeof colorClasses;
};

function Heading({
    as = defaultTag,
    size = defaultSizeByTag[as],
    weight = defaultWeight,
    color = defaultColor,
    className,
    ...props
}: HeadingProps) {
    const Comp = as;

    return (
        <Comp
            data-slot="heading"
            className={cn(sizeClasses[size], weightClasses[weight], colorClasses[color], className)}
            {...props}
        />
    );
}

export { Heading };
export type { HeadingProps };
