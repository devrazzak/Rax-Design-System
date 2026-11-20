'use client';

import { docsNav } from '@/config/docs-nav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@rax-ds/ui';

import { getDocHref } from '@/lib/docs';

interface SidebarNavProps {
    /** Called after a link is clicked, so the mobile drawer can close. */
    onNavigate?: () => void;
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
    const pathname = usePathname();

    return (
        <nav aria-label="Docs" className="flex flex-col gap-6">
            {docsNav.map(section => (
                <div key={section.title} className="flex flex-col gap-1">
                    <h2 className="px-2 text-sm font-semibold">{section.title}</h2>
                    <ul className="flex flex-col gap-0.5">
                        {section.items.map(item => {
                            const href = getDocHref(item.slug);
                            const isActive = pathname === href;

                            return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        aria-current={isActive ? 'page' : undefined}
                                        onClick={onNavigate}
                                        className={cn(
                                            'block rounded-md px-2 py-1.5 text-sm transition-colors',
                                            isActive
                                                ? 'bg-muted font-medium text-foreground'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </nav>
    );
}
