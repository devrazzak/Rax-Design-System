'use client';

import type { ComponentProps } from 'react';

import { CheckIcon, MinusIcon } from '@/icons';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils/cn';

import { defaultSize, sizeClasses } from './checkbox.variants';

type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> & {
    size?: keyof typeof sizeClasses;
};

function Checkbox({ size = defaultSize, className, ...props }: CheckboxProps) {
    return (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            className={cn(
                'group peer flex shrink-0 items-center justify-center rounded-sm border border-input transition-colors outline-none not-data-[state=unchecked]:bg-primary not-data-[state=unchecked]:text-primary-foreground not-aria-invalid:not-data-[state=unchecked]:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive',
                sizeClasses[size],
                className,
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="flex items-center justify-center">
                <CheckIcon className="group-data-[state=indeterminate]:hidden" />
                <MinusIcon className="hidden group-data-[state=indeterminate]:block" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}

export { Checkbox };
export type { CheckboxProps };
