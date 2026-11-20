import { cn, Row, Tabs, TabsContent, TabsList, TabsTrigger } from '@rax-ds/ui';

import { CodeBlock } from './code-block';

const packageManagers = [
    { name: 'pnpm', command: 'pnpm add' },
    { name: 'npm', command: 'npm install' },
    { name: 'yarn', command: 'yarn add' },
    { name: 'bun', command: 'bun add' },
] as const;

interface InstallCommandProps {
    /** Space separated package names, for example `@rax-ds/ui @rax-ds/tokens`. */
    packages: string;
    className?: string;
}

export function InstallCommand({ packages, className }: InstallCommandProps) {
    return (
        <Tabs defaultValue="pnpm" className={cn('gap-0 overflow-hidden rounded-xl border border-border', className)}>
            <Row className="border-b border-border bg-muted/50 px-3">
                <TabsList variant="line" size="sm">
                    {packageManagers.map(manager => (
                        <TabsTrigger key={manager.name} value={manager.name}>
                            {manager.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Row>
            {packageManagers.map(manager => (
                <TabsContent key={manager.name} value={manager.name} className="rounded-none">
                    <CodeBlock code={`${manager.command} ${packages}`} lang="bash" className="rounded-none border-0" />
                </TabsContent>
            ))}
        </Tabs>
    );
}
