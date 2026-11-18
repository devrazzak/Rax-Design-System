'use client';

import type { ComponentProps } from 'react';
import { useContext } from 'react';

import { MinusIcon } from '@/icons';
import { OTPInput, OTPInputContext } from 'input-otp';

import { cn } from '@/lib/utils/cn';

import { defaultSize, sizeClasses } from './input-otp.variants';

// Only the `children` form is supported (not `render`), and the native `size` attribute (character width) is replaced by our slot size
type InputOTPProps = Omit<Extract<ComponentProps<typeof OTPInput>, { render?: never }>, 'size'> & {
    size?: keyof typeof sizeClasses;
};

/**
 * The container carries the size, the disabled look and the invalid border,
 * because the real <input> is hidden and sits outside the slots.
 */
function InputOTP({ size = defaultSize, className, containerClassName, ...props }: InputOTPProps) {
    return (
        <OTPInput
            data-slot="input-otp"
            spellCheck={false}
            containerClassName={cn(
                'flex items-center has-[input:disabled]:opacity-50 has-[input[aria-invalid=true]]:[&_[data-slot=input-otp-slot]]:border-destructive',
                sizeClasses[size],
                containerClassName,
            )}
            className={cn('disabled:cursor-not-allowed', className)}
            {...props}
        />
    );
}

function InputOTPGroup({ className, ...props }: ComponentProps<'div'>) {
    return <div data-slot="input-otp-group" className={cn('flex items-center', className)} {...props} />;
}

function InputOTPSlot({ index, className, ...props }: ComponentProps<'div'> & { index: number }) {
    const { char, hasFakeCaret, isActive } = useContext(OTPInputContext).slots[index] ?? {};

    return (
        <div
            data-slot="input-otp-slot"
            data-active={isActive}
            className={cn(
                'relative -ml-px flex items-center justify-center border border-input transition-colors first:ml-0 first:rounded-l-md last:rounded-r-md data-[active=true]:z-10 data-[active=true]:border-ring',
                className,
            )}
            {...props}
        >
            {char}
            {hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-[1.25em] w-px bg-foreground motion-safe:animate-caret-blink" />
                </div>
            )}
        </div>
    );
}

function InputOTPSeparator({ className, ...props }: ComponentProps<'div'>) {
    return (
        <div
            data-slot="input-otp-separator"
            role="separator"
            className={cn(
                'flex items-center px-1 text-muted-foreground [&_svg:not([class*="size-"])]:size-4',
                className,
            )}
            {...props}
        >
            <MinusIcon />
        </div>
    );
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
export { REGEXP_ONLY_CHARS, REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
export type { InputOTPProps };
