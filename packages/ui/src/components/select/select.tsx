import type { ComponentProps } from 'react';

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@/icons';
import { Select as SelectPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils/cn';
import { fieldClasses } from '@/lib/utils/field-classes';

import { defaultSize, sizeClasses } from './select.variants';

// Root renders no element of its own, so there is nothing to wrap
const Select = SelectPrimitive.Root;

function SelectGroup(props: ComponentProps<typeof SelectPrimitive.Group>) {
    return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue(props: ComponentProps<typeof SelectPrimitive.Value>) {
    return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

type SelectTriggerProps = ComponentProps<typeof SelectPrimitive.Trigger> & {
    /** Height and padding. Matches the Input sizes. */
    size?: keyof typeof sizeClasses;
};

function SelectTrigger({ size = defaultSize, className, children, ...props }: SelectTriggerProps) {
    return (
        <SelectPrimitive.Trigger
            data-slot="select-trigger"
            className={cn(
                'flex items-center justify-between gap-1.5 whitespace-nowrap select-none data-placeholder:text-muted-foreground *:data-[slot=select-value]:line-clamp-1',
                fieldClasses,
                sizeClasses[size],
                className,
            )}
            {...props}
        >
            {children}
            <SelectPrimitive.Icon asChild>
                <ChevronDownIcon className="pointer-events-none size-4 shrink-0 text-muted-foreground" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    );
}

function SelectContent({
    className,
    children,
    position = 'popper',
    sideOffset = 4,
    ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                data-slot="select-content"
                position={position}
                sideOffset={sideOffset}
                className={cn(
                    'relative z-50 max-h-[min(18rem,var(--radix-select-content-available-height))] overflow-x-hidden overflow-y-auto rounded-md border border-border bg-popover text-popover-foreground shadow-md data-[state=closed]:motion-safe:animate-zoom-out data-[state=open]:motion-safe:animate-zoom-in',
                    position === 'popper' ? 'min-w-(--radix-select-trigger-width)' : 'min-w-36',
                    className,
                )}
                {...props}
            >
                <SelectScrollUpButton />
                <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
                <SelectScrollDownButton />
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    );
}

function SelectLabel({ className, ...props }: ComponentProps<typeof SelectPrimitive.Label>) {
    return (
        <SelectPrimitive.Label
            data-slot="select-label"
            className={cn('px-1.5 py-1 text-xs text-muted-foreground', className)}
            {...props}
        />
    );
}

function SelectItem({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Item>) {
    return (
        <SelectPrimitive.Item
            data-slot="select-item"
            className={cn(
                'relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-base outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
                className,
            )}
            {...props}
        >
            <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <CheckIcon className="size-4" />
                </SelectPrimitive.ItemIndicator>
            </span>
            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    );
}

function SelectSeparator({ className, ...props }: ComponentProps<typeof SelectPrimitive.Separator>) {
    return (
        <SelectPrimitive.Separator
            data-slot="select-separator"
            className={cn('pointer-events-none -mx-1 my-1 h-px bg-border', className)}
            {...props}
        />
    );
}

function SelectScrollUpButton() {
    return (
        <SelectPrimitive.ScrollUpButton
            data-slot="select-scroll-up-button"
            className="z-10 flex cursor-default items-center justify-center bg-popover py-1"
        >
            <ChevronUpIcon className="size-4" />
        </SelectPrimitive.ScrollUpButton>
    );
}

function SelectScrollDownButton() {
    return (
        <SelectPrimitive.ScrollDownButton
            data-slot="select-scroll-down-button"
            className="z-10 flex cursor-default items-center justify-center bg-popover py-1"
        >
            <ChevronDownIcon className="size-4" />
        </SelectPrimitive.ScrollDownButton>
    );
}

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue };
export type { SelectTriggerProps };
