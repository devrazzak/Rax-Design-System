import { InputOTP, InputOTPGroup, InputOTPSlot, REGEXP_ONLY_DIGITS } from '@rax-ds/ui';

export default function InputOTPPattern() {
    return (
        <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS} aria-label="PIN, digits only">
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
            </InputOTPGroup>
        </InputOTP>
    );
}
