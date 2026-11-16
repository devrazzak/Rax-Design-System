import type { ComponentProps } from 'react';

import { Popover as PopoverPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils/cn';

const Popover = PopoverPrimitive.Root;

function PopoverTrigger({ ...props }: ComponentProps<typeof PopoverPrimitive.Trigger>) {
    return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverAnchor({ ...props }: ComponentProps<typeof PopoverPrimitive.Anchor>) {
    return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

function PopoverContent({
    className,
    align = 'center',
    sideOffset = 4,
    ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) {
    return (
        <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
                data-slot="popover-content"
                align={align}
                sideOffset={sideOffset}
                className={cn(
                    'z-50 flex w-72 origin-(--radix-popover-content-transform-origin) flex-col gap-3 rounded-md border border-border bg-popover p-4 text-sm text-popover-foreground shadow-md outline-none data-[state=closed]:motion-safe:animate-zoom-out data-[state=open]:motion-safe:animate-zoom-in',
                    className,
                )}
                {...props}
            />
        </PopoverPrimitive.Portal>
    );
}

function PopoverHeader({ className, ...props }: ComponentProps<'div'>) {
    return <div data-slot="popover-header" className={cn('flex flex-col gap-1', className)} {...props} />;
}

function PopoverTitle({ className, ...props }: ComponentProps<'div'>) {
    return <div data-slot="popover-title" className={cn('font-medium', className)} {...props} />;
}

function PopoverDescription({ className, ...props }: ComponentProps<'p'>) {
    return <p data-slot="popover-description" className={cn('text-muted-foreground', className)} {...props} />;
}

export { Popover, PopoverAnchor, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger };
