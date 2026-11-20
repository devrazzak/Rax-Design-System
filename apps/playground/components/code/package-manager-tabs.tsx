'use client';

import type { ReactNode } from 'react';
import { useSyncExternalStore } from 'react';

import { Tabs } from '@rax-ds/ui';

const STORAGE_KEY = 'package-manager';
const CHANGE_EVENT = 'package-manager-change';
const DEFAULT_VALUE = 'pnpm';

// Keeps the choice for this visit even when storage is blocked (for example in private mode)
let memoryValue: string | undefined;

function subscribe(onChange: () => void) {
    // `storage` syncs other browser tabs; the custom event syncs every install block on this page
    window.addEventListener('storage', onChange);
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => {
        window.removeEventListener('storage', onChange);
        window.removeEventListener(CHANGE_EVENT, onChange);
    };
}

function getSnapshot(): string {
    if (memoryValue) return memoryValue;
    try {
        return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_VALUE;
    } catch {
        return DEFAULT_VALUE;
    }
}

// The server cannot read the saved choice, so it renders the default and the client corrects it after hydration
const getServerSnapshot = () => DEFAULT_VALUE;

interface PackageManagerTabsProps {
    children: ReactNode;
    className?: string;
}

/** Tabs that remember the chosen package manager across pages and keep every install block in sync. */
export function PackageManagerTabs({ children, className }: PackageManagerTabsProps) {
    const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const onValueChange = (next: string) => {
        memoryValue = next;
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // Storage can be blocked; memoryValue still keeps the choice for this visit
        }
        window.dispatchEvent(new Event(CHANGE_EVENT));
    };

    return (
        <Tabs value={value} onValueChange={onValueChange} className={className}>
            {children}
        </Tabs>
    );
}
