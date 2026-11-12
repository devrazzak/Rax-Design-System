import type { ReactNode } from 'react';

import type { Metadata } from 'next';

import { Providers } from './providers';

import './globals.css';

export const metadata: Metadata = {
    title: 'Rax UI Playground',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        // next-themes changes the class on <html> before hydration, so React must not warn about it
        <html lang="en" suppressHydrationWarning>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
