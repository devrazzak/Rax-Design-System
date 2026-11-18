import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';

import { defaultSize, sizeClasses } from './container.variants';

type ContainerProps = ComponentProps<'div'> & {
    /** Maximum content width. */
    size?: keyof typeof sizeClasses;
};

function Container({ size = defaultSize, className, ...props }: ContainerProps) {
    return (
        <div
            data-slot="container"
            className={cn('mx-auto w-full px-[clamp(1rem,4vw,2rem)]', sizeClasses[size], className)}
            {...props}
        />
    );
}

export { Container };
export type { ContainerProps };
