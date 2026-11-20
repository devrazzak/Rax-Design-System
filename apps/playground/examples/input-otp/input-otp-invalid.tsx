import { Field, FieldError, FieldLabel, InputOTP, InputOTPGroup, InputOTPSlot } from '@rax-ds/ui';

export default function InputOTPInvalid() {
    return (
        <Field data-invalid className="w-auto">
            <FieldLabel htmlFor="input-otp-invalid-code">Verification code</FieldLabel>
            <InputOTP
                id="input-otp-invalid-code"
                maxLength={4}
                defaultValue="1234"
                aria-invalid
                aria-describedby="input-otp-invalid-code-error"
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
            </InputOTP>
            <FieldError id="input-otp-invalid-code-error">The code is incorrect.</FieldError>
        </Field>
    );
}
