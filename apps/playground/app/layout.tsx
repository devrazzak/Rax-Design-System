import type { ReactNode } from 'react';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
    title: 'Rax UI Playground',
};

/** Runs before the first paint so the page never flashes the wrong theme. Saved choice wins, otherwise the system setting. */
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        // The script above changes the class on <html> before hydration, so React must not warn about it
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body>{children}</body>
        </html>
    );
}
