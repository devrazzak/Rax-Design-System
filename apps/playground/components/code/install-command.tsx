import { Tabs, TabsContent, TabsList, TabsTrigger } from '@rax-ds/ui';

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
}

export function InstallCommand({ packages }: InstallCommandProps) {
    return (
        <Tabs defaultValue="pnpm">
            <TabsList variant="line" size="sm">
                {packageManagers.map(manager => (
                    <TabsTrigger key={manager.name} value={manager.name}>
                        {manager.name}
                    </TabsTrigger>
                ))}
            </TabsList>
            {packageManagers.map(manager => (
                <TabsContent key={manager.name} value={manager.name}>
                    <CodeBlock code={`${manager.command} ${packages}`} lang="bash" />
                </TabsContent>
            ))}
        </Tabs>
    );
}
