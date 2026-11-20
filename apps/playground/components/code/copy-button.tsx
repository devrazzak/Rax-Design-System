'use client';

import { useState } from 'react';

import { CheckIcon, CopyIcon } from 'lucide-react';

import { IconButton } from '@rax-ds/ui';

interface CopyButtonProps {
    value: string;
    className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard needs a secure context and permission; if it is blocked, the user can still select the text
        }
    };

    return (
        <IconButton
            variant="ghost"
            size="xs"
            label={copied ? 'Copied' : 'Copy code'}
            onClick={() => void copy()}
            className={className}
        >
            {copied ? <CheckIcon /> : <CopyIcon />}
        </IconButton>
    );
}
