import Link from 'next/link';

import { Button, Spinner } from '@rax-ds/ui';

import { LoadingDemo } from './loading-demo';
import { LoadingStates } from './loading-states';
import { ThemeToggle } from './theme-toggle';

/** Server Component: no "use client". Proves Button works when rendered from the server. */
export default function HomePage() {
    return (
        <main className="mx-auto flex max-w-3xl flex-col gap-10 p-10">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Rax UI Playground</h1>
                <ThemeToggle />
            </header>

            <section className="flex flex-col gap-3">
                <h2 className="text-lg font-medium">Variants (rendered in a Server Component)</h2>
                <div className="flex flex-wrap items-center gap-3">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="destructive">Delete</Button>
                </div>
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-lg font-medium">asChild with next/link</h2>
                <div className="flex flex-wrap items-center gap-3">
                    <Button asChild>
                        <Link href="/">Go home</Link>
                    </Button>
                </div>
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-lg font-medium">Loading states (always on)</h2>
                <LoadingStates />
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-lg font-medium">Spinner</h2>
                <div className="flex flex-wrap items-center gap-6 text-primary">
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                    <Spinner size="xl" />
                    <Spinner size="lg" label="Loading results" />
                </div>
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-lg font-medium">Loading (Client Component, click to try)</h2>
                <LoadingDemo />
            </section>

            <section className="flex flex-col gap-3 [--rax-color-primary:oklch(0.55_0.2_260)]">
                <h2 className="text-lg font-medium">Scoped brand override</h2>
                <p className="text-sm text-muted-foreground">
                    This section overrides --rax-color-primary. Only buttons inside it turn blue.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                    <Button>Blue primary</Button>
                </div>
            </section>
        </main>
    );
}
