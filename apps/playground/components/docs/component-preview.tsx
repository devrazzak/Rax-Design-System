import { examples, isExampleName } from '@/examples/registry';

import { cn, Row, Tabs, TabsContent, TabsList, TabsTrigger } from '@rax-ds/ui';

import { getExampleSource } from '@/lib/example-source';
import { CodeBlock } from '@/components/code/code-block';

export interface ComponentPreviewProps {
    /** Example path under `examples/` without `.tsx`, for example `button/button-variants`. */
    name: string;
    className?: string;
}

export async function ComponentPreview({ name, className }: ComponentPreviewProps) {
    // MDX is not type checked, so a wrong name is caught here. Throwing fails the build instead of shipping an empty box.
    if (!isExampleName(name)) {
        throw new Error(`Unknown example "${name}". Add it to examples/registry.ts.`);
    }

    const [{ default: Example }, code] = await Promise.all([examples[name](), getExampleSource(name)]);

    return (
        <Tabs defaultValue="preview" className={cn('gap-0 overflow-hidden rounded-xl border border-border', className)}>
            <Row className="border-b border-border bg-muted/50 px-3">
                <TabsList variant="line" size="sm">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
            </Row>
            <TabsContent value="preview" className="rounded-none">
                {/* A dot grid drawn with the border token, so it follows the theme */}
                <Row
                    justify="center"
                    wrap
                    className="min-h-72 bg-[radial-gradient(var(--rax-color-border)_1px,transparent_1px)] bg-size-[16px_16px] p-10"
                >
                    <Example />
                </Row>
            </TabsContent>
            <TabsContent value="code" className="rounded-none">
                <CodeBlock code={code} className="rounded-none border-0 [&_pre]:max-h-[28rem]" />
            </TabsContent>
        </Tabs>
    );
}
