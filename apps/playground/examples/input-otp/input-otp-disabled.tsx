import { InputOTP, InputOTPGroup, InputOTPSlot } from '@rax-ds/ui';

export default function InputOTPDisabled() {
    return (
        <InputOTP maxLength={4} disabled defaultValue="1234" aria-label="Verification code">
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
            </InputOTPGroup>
        </InputOTP>
    );
}
