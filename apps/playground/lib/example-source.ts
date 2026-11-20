import { readFile } from 'node:fs/promises';
import path from 'node:path';

import type { ExampleName } from '@/examples/registry';

/** Reads the source of an example file, exactly as a user would copy it. Cached, so it is read once per build. */
export async function getExampleSource(name: ExampleName): Promise<string> {
    'use cache';

    const source = await readFile(path.join(process.cwd(), 'examples', `${name}.tsx`), 'utf8');

    return source.trimEnd();
}
