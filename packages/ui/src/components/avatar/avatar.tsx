'use client';

import type { ComponentProps } from 'react';

import { Avatar as AvatarPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils/cn';

import { defaultSize, sizeClasses } from './avatar.variants';

type AvatarProps = ComponentProps<typeof AvatarPrimitive.Root> & {
    /** Diameter of the avatar. */
    size?: keyof typeof sizeClasses;
};

function Avatar({ size = defaultSize, className, ...props }: AvatarProps) {
    return (
        <AvatarPrimitive.Root
            data-slot="avatar"
            data-size={size}
            className={cn(
                'relative flex shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border',
                sizeClasses[size],
                className,
            )}
            {...props}
        />
    );
}

function AvatarImage({ className, ...props }: ComponentProps<typeof AvatarPrimitive.Image>) {
    return (
        <AvatarPrimitive.Image
            data-slot="avatar-image"
            className={cn('aspect-square size-full rounded-full object-cover', className)}
            {...props}
        />
    );
}

/** Shown while the image loads, or when it fails. The text size comes from the avatar. */
function AvatarFallback({ className, ...props }: ComponentProps<typeof AvatarPrimitive.Fallback>) {
    return (
        <AvatarPrimitive.Fallback
            data-slot="avatar-fallback"
            className={cn(
                'flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground',
                className,
            )}
            {...props}
        />
    );
}

/**
 * A small dot in the corner, for example an online status. Its size follows the avatar.
 * A dot that carries meaning needs `role="img"` and an `aria-label`, so screen readers announce it.
 */
function AvatarBadge({ className, ...props }: ComponentProps<'span'>) {
    return (
        <span
            data-slot="avatar-badge"
            className={cn(
                'absolute right-0 bottom-0 z-10 rounded-full bg-primary ring-2 ring-background select-none',
                className,
            )}
            {...props}
        />
    );
}

/** Overlaps its avatars. Give each avatar, and the count, the same size. */
function AvatarGroup({ className, ...props }: ComponentProps<'div'>) {
    return (
        <div
            data-slot="avatar-group"
            className={cn(
                'flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background',
                className,
            )}
            {...props}
        />
    );
}

type AvatarGroupCountProps = ComponentProps<'div'> & {
    /** Use the same size as the avatars in the group. */
    size?: keyof typeof sizeClasses;
};

/** The "+3" circle at the end of a group. */
function AvatarGroupCount({ size = defaultSize, className, ...props }: AvatarGroupCountProps) {
    return (
        <div
            data-slot="avatar-group-count"
            className={cn(
                'relative flex shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground ring-2 ring-background',
                sizeClasses[size],
                className,
            )}
            {...props}
        />
    );
}

export { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage };
export type { AvatarGroupCountProps, AvatarProps };
