import { AccessibilityIcon, ArrowRightIcon, PaletteIcon, RulerIcon, ServerIcon } from 'lucide-react';
import Link from 'next/link';

import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Container,
    Field,
    FieldLabel,
    Grid,
    Heading,
    Input,
    OptionSelect,
    Progress,
    Row,
    Section,
    Stack,
    Switch,
    Text,
} from '@rax-ds/ui';

import { getAllDocs } from '@/lib/docs';
import { InstallCommand } from '@/components/code/install-command';

const principles = [
    {
        icon: AccessibilityIcon,
        title: 'Accessible by default',
        description: 'Components follow the WAI-ARIA patterns through Radix, and every component is tested with axe.',
    },
    {
        icon: PaletteIcon,
        title: 'Themed by tokens',
        description:
            'Components never hard-code a color. Dark mode and brand colors come from CSS variables, not dark: classes.',
    },
    {
        icon: ServerIcon,
        title: 'Server Component friendly',
        description:
            'Only components that need the browser are client components, and they can be rendered from Server Components.',
    },
    {
        icon: RulerIcon,
        title: 'Consistent sizes',
        description: 'The same size names (sm, md, lg, xl) and spacing scale are used across components.',
    },
];

const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'review', label: 'In review' },
    { value: 'published', label: 'Published' },
];

const componentCount = getAllDocs().filter(doc => doc.slug.startsWith('components/')).length;

export default function HomePage() {
    return (
        // The design system has no component for the main landmark, so the native element is used
        <main>
            <Section spacing="xl" className="relative overflow-hidden">
                {/* Decorative dot grid that fades out from the top. Drawn with the border token, so it follows the theme. */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--rax-color-border)_1.5px,transparent_1.5px)] mask-[radial-gradient(ellipse_at_top,black_20%,transparent_70%)] bg-size-[24px_24px]"
                />
                <Container size="md" className="relative">
                    <Stack align="center" gap="lg">
                        <Badge variant="outline">{componentCount} components, light and dark</Badge>
                        <Heading as="h1" size="5xl" className="text-center text-balance">
                            Accessible components, themed by tokens
                        </Heading>
                        <Text size="lg" color="muted" textAlign="center" className="max-w-xl text-balance">
                            A React component library built on Radix UI and Tailwind CSS. One set of components carries
                            any brand, in light and dark.
                        </Text>
                        <Row gap="md" wrap justify="center">
                            <Button asChild size="lg">
                                <Link href="/docs/installation">
                                    Get started
                                    <ArrowRightIcon data-icon="inline-end" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="surface">
                                <Link href="/docs/components">Browse components</Link>
                            </Button>
                        </Row>
                        <InstallCommand packages="@rax-ds/ui" className="w-full max-w-md" />
                    </Stack>
                </Container>
            </Section>

            <Section spacing="lg">
                <Container>
                    <Stack gap="xl">
                        <Stack gap="sm" align="center">
                            <Heading as="h2" size="3xl" className="text-center">
                                The system at work
                            </Heading>
                            <Text color="muted" textAlign="center">
                                Every piece below is a real component from the package.
                            </Text>
                        </Stack>
                        <Grid columns={{ base: 1, md: 2, lg: 3 }}>
                            <Card padding="lg" className="gap-4">
                                <CardHeader>
                                    <CardTitle>Actions</CardTitle>
                                    <CardDescription>Variants share one size scale.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Stack gap="md">
                                        <Row gap="sm" wrap>
                                            <Button size="sm">Primary</Button>
                                            <Button size="sm" variant="secondary">
                                                Secondary
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                Outline
                                            </Button>
                                        </Row>
                                        <Row gap="sm" wrap>
                                            <Badge>New</Badge>
                                            <Badge variant="secondary">Shipped</Badge>
                                            <Badge variant="outline">Pending</Badge>
                                            <Badge variant="destructive">Failed</Badge>
                                        </Row>
                                    </Stack>
                                </CardContent>
                            </Card>
                            <Card padding="lg" className="gap-4">
                                <CardHeader>
                                    <CardTitle>Forms</CardTitle>
                                    <CardDescription>Labels, fields and switches line up.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Stack gap="md">
                                        <Field>
                                            <FieldLabel htmlFor="home-email">Email</FieldLabel>
                                            <Input
                                                id="home-email"
                                                type="email"
                                                size="sm"
                                                placeholder="name@example.com"
                                            />
                                        </Field>
                                        <OptionSelect
                                            options={statusOptions}
                                            defaultValue="review"
                                            size="sm"
                                            aria-label="Status"
                                        />
                                        <Field orientation="horizontal">
                                            <Switch id="home-notifications" defaultChecked />
                                            <FieldLabel htmlFor="home-notifications">Email notifications</FieldLabel>
                                        </Field>
                                    </Stack>
                                </CardContent>
                            </Card>
                            <Card padding="lg" className="gap-4">
                                <CardHeader>
                                    <CardTitle>Project</CardTitle>
                                    <CardDescription>Website redesign, due next week.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Stack gap="md">
                                        <AvatarGroup>
                                            <Avatar>
                                                <AvatarFallback>AM</AvatarFallback>
                                            </Avatar>
                                            <Avatar>
                                                <AvatarFallback>JL</AvatarFallback>
                                            </Avatar>
                                            <Avatar>
                                                <AvatarFallback>SK</AvatarFallback>
                                            </Avatar>
                                            <AvatarGroupCount>+2</AvatarGroupCount>
                                        </AvatarGroup>
                                        <Stack gap="sm">
                                            <Row justify="between">
                                                <Text size="sm">Progress</Text>
                                                <Text size="sm" color="muted">
                                                    64%
                                                </Text>
                                            </Row>
                                            <Progress value={64} aria-label="Project progress" />
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Stack>
                </Container>
            </Section>

            <Section spacing="lg" tone="muted">
                <Container>
                    <Stack gap="xl">
                        <Heading as="h2" size="3xl" className="text-center">
                            Principles
                        </Heading>
                        <Grid columns={{ base: 1, md: 2, lg: 4 }}>
                            {principles.map(principle => (
                                <Card key={principle.title}>
                                    <CardHeader>
                                        <principle.icon aria-hidden="true" className="mb-2 size-6 text-primary" />
                                        <CardTitle>{principle.title}</CardTitle>
                                        <CardDescription>{principle.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </Grid>
                    </Stack>
                </Container>
            </Section>

            <Section spacing="lg">
                <Container size="md">
                    <Stack align="center" gap="md">
                        <Heading as="h2" size="3xl" className="text-center">
                            Start building
                        </Heading>
                        <Text color="muted" textAlign="center">
                            Install the package, import the styles and render your first component.
                        </Text>
                        <Button asChild size="lg">
                            <Link href="/docs/installation">
                                Read the installation guide
                                <ArrowRightIcon data-icon="inline-end" />
                            </Link>
                        </Button>
                    </Stack>
                </Container>
            </Section>
        </main>
    );
}
