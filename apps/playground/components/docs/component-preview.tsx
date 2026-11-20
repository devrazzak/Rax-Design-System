import { examples, isExampleName } from '@/examples/registry';

import { Row, Tabs, TabsContent, TabsList, TabsTrigger } from '@rax-ds/ui';

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
        <Tabs defaultValue="preview" className={className}>
            <TabsList variant="line" size="sm">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
                <Row justify="center" wrap className="min-h-72 rounded-md border border-border p-10">
                    <Example />
                </Row>
            </TabsContent>
            <TabsContent value="code">
                <CodeBlock code={code} />
            </TabsContent>
        </Tabs>
    );
}
