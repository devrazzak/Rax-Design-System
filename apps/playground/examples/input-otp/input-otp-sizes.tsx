import { InputOTP, InputOTPGroup, InputOTPSlot, Stack } from '@rax-ds/ui';

export default function InputOTPSizes() {
    return (
        <Stack gap="md" align="center">
            <InputOTP maxLength={4} size="sm" aria-label="Small code">
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
            </InputOTP>
            <InputOTP maxLength={4} size="md" aria-label="Medium code">
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
            </InputOTP>
            <InputOTP maxLength={4} size="lg" aria-label="Large code">
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
            </InputOTP>
            <InputOTP maxLength={4} size="xl" aria-label="Extra large code">
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
            </InputOTP>
        </Stack>
    );
}
