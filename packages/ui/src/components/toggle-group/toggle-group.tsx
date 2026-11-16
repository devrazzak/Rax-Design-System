import type { ComponentProps } from 'react';
import { createContext, useContext } from 'react';

import type { VariantProps } from 'class-variance-authority';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils/cn';
import { toggleVariants } from '@/components/toggle/toggle';
import { defaultVariants } from '@/components/toggle/toggle.variants';

type ToggleGroupProps = ComponentProps<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants> & {
        /** `none` joins the items into one connected bar. */
        spacing?: 'default' | 'none';
    };

/** The group owns the variant and size, so every item looks the same. */
const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants>>(defaultVariants);

function ToggleGroup({
    className,
    variant = defaultVariants.variant,
    size = defaultVariants.size,
    spacing = 'default',
    orientation = 'horizontal',
    children,
    ...props
}: ToggleGroupProps) {
    return (
        <ToggleGroupPrimitive.Root
            data-slot="toggle-group"
            data-variant={variant}
            data-size={size}
            data-spacing={spacing}
            orientation={orientation}
            className={cn(
                'group/toggle-group flex w-fit items-center gap-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[spacing=none]:gap-0',
                className,
            )}
            {...props}
        >
            <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
        </ToggleGroupPrimitive.Root>
    );
}

function ToggleGroupItem({ className, children, ...props }: ComponentProps<typeof ToggleGroupPrimitive.Item>) {
    const { variant, size } = useContext(ToggleGroupContext);

    return (
        <ToggleGroupPrimitive.Item
            data-slot="toggle-group-item"
            data-variant={variant}
            data-size={size}
            className={cn(
                toggleVariants({ variant, size }),
                'group-data-[spacing=none]/toggle-group:rounded-none group-data-[orientation=horizontal]/toggle-group:group-data-[spacing=none]/toggle-group:first:rounded-l-md group-data-[orientation=vertical]/toggle-group:group-data-[spacing=none]/toggle-group:first:rounded-t-md group-data-[orientation=horizontal]/toggle-group:group-data-[spacing=none]/toggle-group:last:rounded-r-md group-data-[orientation=vertical]/toggle-group:group-data-[spacing=none]/toggle-group:last:rounded-b-md focus:z-10 focus-visible:z-10 group-data-[orientation=horizontal]/toggle-group:group-data-[spacing=none]/toggle-group:data-[variant=outline]:not-first:border-l-0 group-data-[orientation=vertical]/toggle-group:group-data-[spacing=none]/toggle-group:data-[variant=outline]:not-first:border-t-0',
                className,
            )}
            {...props}
        >
            {children}
        </ToggleGroupPrimitive.Item>
    );
}

export { ToggleGroup, ToggleGroupItem };
export type { ToggleGroupProps };
