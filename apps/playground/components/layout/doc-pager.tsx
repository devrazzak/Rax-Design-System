import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import { Button, Row } from '@rax-ds/ui';

import { getDocHref, getPrevNext } from '@/lib/docs';

export function DocPager({ slug }: { slug: string }) {
    const { prev, next } = getPrevNext(slug);

    return (
        // The design system has no nav component, so the native landmark wraps a Row
        <nav aria-label="Previous and next page" className="mt-16">
            <Row justify="between" gap="md">
                {prev && (
                    <Button asChild variant="surface" size="sm">
                        <Link href={getDocHref(prev.slug)}>
                            <ArrowLeftIcon data-icon="inline-start" />
                            {prev.title}
                        </Link>
                    </Button>
                )}
                {next && (
                    <Button asChild variant="surface" size="sm" className="ml-auto">
                        <Link href={getDocHref(next.slug)}>
                            {next.title}
                            <ArrowRightIcon data-icon="inline-end" />
                        </Link>
                    </Button>
                )}
            </Row>
        </nav>
    );
}
