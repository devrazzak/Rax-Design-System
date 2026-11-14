import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';

import { defaultSize, sizeClasses } from './input.variants';

// The native `size` attribute (character width) is replaced by our height-based size
type InputProps = Omit<ComponentProps<'input'>, 'size'> & {
    size?: keyof typeof sizeClasses;
};

function Input({ size = defaultSize, className, ...props }: InputProps) {
    return (
        <input
            data-slot="input"
            className={cn(
                'w-full min-w-0 rounded-lg border border-input bg-transparent text-base transition-colors outline-none focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-primary md:text-sm',
                sizeClasses[size],
                className,
            )}
            {...props}
        />
    );
}

export { Input };
export type { InputProps };
