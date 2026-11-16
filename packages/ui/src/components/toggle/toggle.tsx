import type { ComponentProps } from 'react';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { Toggle as TogglePrimitive } from 'radix-ui';

import { cn } from '@/lib/utils/cn';

import { defaultVariants, sizeClasses, variantClasses } from './toggle.variants';

const toggleVariants = cva(
    'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent font-medium whitespace-nowrap transition-colors outline-none select-none hover:bg-muted hover:text-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0',
    {
        variants: {
            variant: variantClasses,
            size: sizeClasses,
        },
        defaultVariants,
    },
);

type ToggleProps = ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>;

function Toggle({ className, variant = defaultVariants.variant, size = defaultVariants.size, ...props }: ToggleProps) {
    return (
        <TogglePrimitive.Root
            data-slot="toggle"
            data-variant={variant}
            data-size={size}
            className={cn(toggleVariants({ variant, size }), className)}
            {...props}
        />
    );
}

export { Toggle, toggleVariants };
export type { ToggleProps };
