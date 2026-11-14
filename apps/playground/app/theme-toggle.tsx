'use client';

import { Button } from '@rax-ds/ui';

export function ThemeToggle() {
    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch {
            // Storage can be blocked (private mode); the toggle still works for this visit
        }
    };

    return (
        <Button variant="outline" onClick={toggleTheme}>
            Toggle theme
        </Button>
    );
}
