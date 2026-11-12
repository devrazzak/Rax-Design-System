'use client';

import { useTheme } from 'next-themes';

import { Button } from '@rax-ds/ui';

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <Button variant="outline" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
            Toggle theme
        </Button>
    );
}
