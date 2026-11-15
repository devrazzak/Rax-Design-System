import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';
import { fieldClasses } from '@/lib/utils/field-classes';

import { defaultSize, sizeClasses } from './input.variants';

// The native `size` attribute (character width) is replaced by our height-based size
type InputProps = Omit<ComponentProps<'input'>, 'size'> & {
    /** Height and padding. */
    size?: keyof typeof sizeClasses;
};

function Input({ size = defaultSize, className, ...props }: InputProps) {
    return (
        <input
            data-slot="input"
            className={cn('w-full min-w-0', fieldClasses, sizeClasses[size], className)}
            {...props}
        />
    );
}

export { Input };
export type { InputProps };
