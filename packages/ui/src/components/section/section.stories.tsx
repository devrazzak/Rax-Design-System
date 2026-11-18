import type { Meta, StoryObj } from '@storybook/react-vite';

import { Container } from '../container/container';
import { Section } from './section';
import { SECTION_SPACINGS, SECTION_TAGS, SECTION_TONES } from './section.variants';

const meta = {
    title: 'Components/Section',
    component: Section,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    args: {
        tone: 'muted',
        children: <div className="rounded-md border border-border bg-background p-4">Content</div>,
    },
    argTypes: {
        as: { control: 'select', options: SECTION_TAGS },
        spacing: { control: 'select', options: SECTION_SPACINGS },
        tone: { control: 'select', options: SECTION_TONES },
        children: { control: false },
    },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Spacings: Story = {
    render: args => (
        <div className="flex flex-col gap-4">
            {SECTION_SPACINGS.map(spacing => (
                <Section key={spacing} {...args} spacing={spacing}>
                    <div className="rounded-md border border-border bg-background p-4">{spacing} spacing</div>
                </Section>
            ))}
        </div>
    ),
};

export const Tags: Story = {
    render: args => (
        <div className="flex flex-col gap-4">
            {SECTION_TAGS.map(tag => (
                <Section key={tag} {...args} as={tag} spacing="sm">
                    <div className="rounded-md border border-border bg-background p-4">{tag} tag</div>
                </Section>
            ))}
        </div>
    ),
};

export const Tones: Story = {
    render: args => (
        <div className="flex flex-col">
            {SECTION_TONES.map(tone => (
                <Section key={tone} {...args} tone={tone} spacing="sm">
                    <Container>{tone} tone</Container>
                </Section>
            ))}
        </div>
    ),
};

export const WithContainer: Story = {
    render: args => (
        <Section {...args} spacing="lg">
            <Container>
                <div className="rounded-md border border-border bg-background p-4">Content inside a Container</div>
            </Container>
        </Section>
    ),
};
