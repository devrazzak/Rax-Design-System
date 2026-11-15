/** Slot size and font size, applied from the container so every slot follows one size. */
export const sizeClasses = {
    sm: '[&_[data-slot=input-otp-slot]]:size-10 [&_[data-slot=input-otp-slot]]:text-sm',
    md: '[&_[data-slot=input-otp-slot]]:size-12 [&_[data-slot=input-otp-slot]]:text-base',
    lg: '[&_[data-slot=input-otp-slot]]:size-14 [&_[data-slot=input-otp-slot]]:text-lg',
    xl: '[&_[data-slot=input-otp-slot]]:size-16 [&_[data-slot=input-otp-slot]]:text-xl',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const INPUT_OTP_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultSize: keyof typeof sizeClasses = 'md';
