import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { Inter } from 'next/font/google';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.name,
        template: `%s – ${siteConfig.name}`,
    },
    description: siteConfig.description,
    openGraph: {
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        type: 'website',
    },
};

/** Runs before the first paint so the page never flashes the wrong theme. Saved choice wins, otherwise the system setting. */
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        // The script above changes the class on <html> before hydration, so React must not warn about it
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body className="antialiased">
                <SiteHeader />
                {children}
                <SiteFooter />
            </body>
        </html>
    );
}
