'use client';

import type { ComponentProps } from 'react';

import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils/cn';

import { defaultSize, sizeClasses } from './radio-group.variants';

function RadioGroup({ className, ...props }: ComponentProps<typeof RadioGroupPrimitive.Root>) {
    return (
        <RadioGroupPrimitive.Root
            data-slot="radio-group"
            className={cn(
                'grid gap-2 data-[orientation=horizontal]:flex data-[orientation=horizontal]:gap-6',
                className,
            )}
            {...props}
        />
    );
}

type RadioGroupItemProps = ComponentProps<typeof RadioGroupPrimitive.Item> & {
    size?: keyof typeof sizeClasses;
};

function RadioGroupItem({ size = defaultSize, className, ...props }: RadioGroupItemProps) {
    return (
        <RadioGroupPrimitive.Item
            data-slot="radio-group-item"
            className={cn(
                'peer flex shrink-0 items-center justify-center rounded-full border border-input transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground not-aria-invalid:data-[state=checked]:border-primary',
                sizeClasses[size],
                className,
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className="rounded-full bg-current" />
        </RadioGroupPrimitive.Item>
    );
}

export { RadioGroup, RadioGroupItem };
export type { RadioGroupItemProps };
