'use client';

import type { ComponentProps } from 'react';

import { Switch as SwitchPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils/cn';

import { defaultSize, sizeClasses } from './switch.variants';

type SwitchProps = ComponentProps<typeof SwitchPrimitive.Root> & {
    size?: keyof typeof sizeClasses;
};

function Switch({ size = defaultSize, className, ...props }: SwitchProps) {
    return (
        <SwitchPrimitive.Root
            data-slot="switch"
            className={cn(
                'peer inline-flex shrink-0 items-center rounded-full border-2 border-transparent transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
                sizeClasses[size],
                className,
            )}
            {...props}
        >
            <SwitchPrimitive.Thumb
                data-slot="switch-thumb"
                className="pointer-events-none block rounded-full bg-primary-foreground transition-transform"
            />
        </SwitchPrimitive.Root>
    );
}

export { Switch };
export type { SwitchProps };
