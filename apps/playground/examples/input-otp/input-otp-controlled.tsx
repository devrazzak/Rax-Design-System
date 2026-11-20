'use client';

import { useState } from 'react';

import { InputOTP, InputOTPGroup, InputOTPSlot, Stack, Text } from '@rax-ds/ui';

export default function InputOTPControlled() {
    const [value, setValue] = useState('');
    const [done, setDone] = useState(false);

    return (
        <Stack gap="sm" align="center">
            <InputOTP
                maxLength={4}
                value={value}
                onChange={next => {
                    setValue(next);
                    setDone(false);
                }}
                onComplete={() => {
                    setDone(true);
                }}
                aria-label="Verification code"
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
            </InputOTP>
            <Text size="sm" color="muted">
                {done ? `Code entered: ${value}` : 'Enter the 4-digit code.'}
            </Text>
        </Stack>
    );
}
