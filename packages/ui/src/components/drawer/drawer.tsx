'use client';

import type { ComponentProps } from 'react';

import { XIcon } from '@/icons';
import { Dialog as DrawerPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/button/button';

import { defaultSide, defaultSize, sideClasses, sizeClasses } from './drawer.variants';

// Root renders no element of its own, so there is nothing to wrap
const Drawer = DrawerPrimitive.Root;

function DrawerTrigger(props: ComponentProps<typeof DrawerPrimitive.Trigger>) {
    return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal(props: ComponentProps<typeof DrawerPrimitive.Portal>) {
    return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose(props: ComponentProps<typeof DrawerPrimitive.Close>) {
    return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({ className, ...props }: ComponentProps<typeof DrawerPrimitive.Overlay>) {
    return (
        <DrawerPrimitive.Overlay
            data-slot="drawer-overlay"
            className={cn(
                'fixed inset-0 z-50 bg-overlay data-[state=closed]:motion-safe:animate-fade-out data-[state=open]:motion-safe:animate-fade-in',
                className,
            )}
            {...props}
        />
    );
}

type DrawerContentProps = ComponentProps<typeof DrawerPrimitive.Content> & {
    /** The edge of the screen the drawer slides in from. */
    side?: keyof typeof sideClasses;
    /** Width of a left or right drawer. Top and bottom drawers always fill the width. */
    size?: keyof typeof sizeClasses;
    showCloseButton?: boolean;
    /** Set to false to keep the drawer open when the user clicks outside it, for example while a long form is filled in. */
    closeOnOutsideClick?: boolean;
};

function DrawerContent({
    side = defaultSide,
    size = defaultSize,
    showCloseButton = true,
    closeOnOutsideClick = true,
    onInteractOutside,
    className,
    children,
    ...props
}: DrawerContentProps) {
    return (
        <DrawerPortal>
            <DrawerOverlay />
            <DrawerPrimitive.Content
                data-slot="drawer-content"
                data-side={side}
                className={cn(
                    'fixed z-50 flex flex-col gap-4 border-border bg-popover text-base text-popover-foreground shadow-lg outline-none data-[state=closed]:motion-safe:animate-slide-out data-[state=open]:motion-safe:animate-slide-in',
                    sideClasses[side],
                    sizeClasses[size],
                    className,
                )}
                onInteractOutside={event => {
                    if (!closeOnOutsideClick) {
                        event.preventDefault();
                    }
                    onInteractOutside?.(event);
                }}
                {...props}
            >
                {children}
                {showCloseButton && (
                    <DrawerPrimitive.Close data-slot="drawer-close" asChild>
                        <Button variant="ghost" size="sm" aria-label="Close" className="absolute top-2 right-2">
                            <XIcon />
                        </Button>
                    </DrawerPrimitive.Close>
                )}
            </DrawerPrimitive.Content>
        </DrawerPortal>
    );
}

function DrawerHeader({ className, ...props }: ComponentProps<'div'>) {
    return <div data-slot="drawer-header" className={cn('flex flex-col gap-2 p-4', className)} {...props} />;
}

function DrawerFooter({ className, ...props }: ComponentProps<'div'>) {
    return (
        <div
            data-slot="drawer-footer"
            className={cn('mt-auto flex flex-col gap-2 border-t border-border bg-muted p-4', className)}
            {...props}
        />
    );
}

function DrawerTitle({ className, ...props }: ComponentProps<typeof DrawerPrimitive.Title>) {
    return (
        <DrawerPrimitive.Title data-slot="drawer-title" className={cn('text-lg font-semibold', className)} {...props} />
    );
}

function DrawerDescription({ className, ...props }: ComponentProps<typeof DrawerPrimitive.Description>) {
    return (
        <DrawerPrimitive.Description
            data-slot="drawer-description"
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    );
}

export {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerPortal,
    DrawerTitle,
    DrawerTrigger,
};
export type { DrawerContentProps };
