import type { Meta, StoryObj } from '@storybook/react-vite';

import { Container } from './container';
import { CONTAINER_SIZES } from './container.variants';

const meta = {
    title: 'Components/Container',
    component: Container,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    args: { children: <div className="rounded-md bg-muted p-4">Content</div> },
    argTypes: {
        size: { control: 'select', options: CONTAINER_SIZES },
        children: { control: false },
    },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-col gap-4">
            {CONTAINER_SIZES.map(size => (
                <Container key={size} {...args} size={size}>
                    <div className="rounded-md bg-muted p-4">{size} size</div>
                </Container>
            ))}
        </div>
    ),
};
