'use client';

import { useState } from 'react';

import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { InputGroup, InputGroupButton, InputGroupInput } from '@rax-ds/ui';

export default function InputGroupPassword() {
    const [visible, setVisible] = useState(false);

    return (
        <InputGroup className="w-full max-w-sm">
            <InputGroupInput type={visible ? 'text' : 'password'} placeholder="Password" aria-label="Password" />
            <InputGroupButton
                aria-label={visible ? 'Hide password' : 'Show password'}
                onClick={() => {
                    setVisible(current => !current);
                }}
            >
                {visible ? <EyeOffIcon /> : <EyeIcon />}
            </InputGroupButton>
        </InputGroup>
    );
}
