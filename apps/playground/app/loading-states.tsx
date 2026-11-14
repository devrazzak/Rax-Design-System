'use client';

import Link from 'next/link';

import { Button } from '@rax-ds/ui';

/** Loading buttons always on. Client Component: a loading Button attaches a click handler, which a Server Component cannot render. */
export function LoadingStates() {
    return (
        <>
            <div className="flex flex-wrap items-center gap-3">
                <Button loading>Saving</Button>
                <Button loading loadingPosition="start">
                    Saving
                </Button>
                <Button variant="outline" loading>
                    Outline
                </Button>
                <Button variant="secondary" loading>
                    Secondary
                </Button>
                <Button variant="destructive" loading>
                    Deleting
                </Button>
                <Button asChild loading>
                    <Link href="/">Continue</Link>
                </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
                <Button size="xs" loading>
                    xs
                </Button>
                <Button size="sm" loading>
                    sm
                </Button>
                <Button size="lg" loading>
                    lg
                </Button>
            </div>
        </>
    );
}
