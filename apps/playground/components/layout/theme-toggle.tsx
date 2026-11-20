'use client';

import { useSyncExternalStore } from 'react';

import { MoonIcon, SunIcon } from 'lucide-react';

import { Toggle } from '@rax-ds/ui';

function subscribe(onChange: () => void) {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains('dark');

// The server cannot know the theme, so it renders light and the client corrects it right after hydration
const getServerSnapshot = () => false;

export function ThemeToggle() {
    const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const setDark = (dark: boolean) => {
        document.documentElement.classList.toggle('dark', dark);
        try {
            localStorage.setItem('theme', dark ? 'dark' : 'light');
        } catch {
            // Storage can be blocked (private mode); the toggle still works for this visit
        }
    };

    return (
        <Toggle size="sm" aria-label="Dark mode" pressed={isDark} onPressedChange={setDark} className="px-0">
            {isDark ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />}
        </Toggle>
    );
}
