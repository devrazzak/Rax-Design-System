import type { ComponentProps } from 'react';

import { CheckIcon } from '@/icons';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils/cn';

import {
    defaultSize,
    defaultVariant,
    highlightClasses,
    itemClasses,
    sizeClasses,
    variantClasses,
} from './dropdown-menu.variants';

// Root renders no element of its own, so there is nothing to wrap
const DropdownMenu = DropdownMenuPrimitive.Root;

function DropdownMenuTrigger(props: ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
    return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

type DropdownMenuContentProps = ComponentProps<typeof DropdownMenuPrimitive.Content> & {
    /** Text size and padding of every item in the menu. */
    size?: keyof typeof sizeClasses;
};

function DropdownMenuContent({
    size = defaultSize,
    align = 'start',
    sideOffset = 4,
    className,
    ...props
}: DropdownMenuContentProps) {
    return (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                data-slot="dropdown-menu-content"
                align={align}
                sideOffset={sideOffset}
                className={cn(
                    'z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:motion-safe:animate-zoom-out data-[state=open]:motion-safe:animate-zoom-in',
                    sizeClasses[size],
                    className,
                )}
                {...props}
            />
        </DropdownMenuPrimitive.Portal>
    );
}

function DropdownMenuGroup(props: ComponentProps<typeof DropdownMenuPrimitive.Group>) {
    return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuLabel({ className, ...props }: ComponentProps<typeof DropdownMenuPrimitive.Label>) {
    return (
        <DropdownMenuPrimitive.Label
            data-slot="dropdown-menu-label"
            className={cn('px-1.5 py-1 text-xs text-muted-foreground', className)}
            {...props}
        />
    );
}

type DropdownMenuItemProps = ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    /** Use `destructive` for actions that delete or cannot be undone. */
    variant?: keyof typeof variantClasses;
};

function DropdownMenuItem({ variant = defaultVariant, className, ...props }: DropdownMenuItemProps) {
    return (
        <DropdownMenuPrimitive.Item
            data-slot="dropdown-menu-item"
            data-variant={variant}
            className={cn(itemClasses, 'pr-1.5', variantClasses[variant], className)}
            {...props}
        />
    );
}

function DropdownMenuCheckboxItem({
    className,
    children,
    ...props
}: ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
    return (
        <DropdownMenuPrimitive.CheckboxItem
            data-slot="dropdown-menu-checkbox-item"
            className={cn(itemClasses, 'pr-8', highlightClasses, className)}
            {...props}
        >
            <span className="pointer-events-none absolute right-2 flex size-[1em] items-center justify-center">
                <DropdownMenuPrimitive.ItemIndicator>
                    <CheckIcon />
                </DropdownMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </DropdownMenuPrimitive.CheckboxItem>
    );
}

function DropdownMenuRadioGroup(props: ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
    return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

function DropdownMenuRadioItem({
    className,
    children,
    ...props
}: ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
    return (
        <DropdownMenuPrimitive.RadioItem
            data-slot="dropdown-menu-radio-item"
            className={cn(itemClasses, 'pr-8', highlightClasses, className)}
            {...props}
        >
            <span className="pointer-events-none absolute right-2 flex size-[1em] items-center justify-center">
                <DropdownMenuPrimitive.ItemIndicator>
                    <CheckIcon />
                </DropdownMenuPrimitive.ItemIndicator>
            </span>
            {children}
        </DropdownMenuPrimitive.RadioItem>
    );
}

function DropdownMenuSeparator({ className, ...props }: ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
    return (
        <DropdownMenuPrimitive.Separator
            data-slot="dropdown-menu-separator"
            className={cn('pointer-events-none -mx-1 my-1 h-px bg-border', className)}
            {...props}
        />
    );
}

export {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
};
export type { DropdownMenuContentProps, DropdownMenuItemProps };
