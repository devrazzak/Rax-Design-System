import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from './spinner';
import { SPINNER_COLORS, SPINNER_SIZES } from './spinner.variants';

const meta = {
    title: 'Components/Spinner',
    component: Spinner,
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'inline-radio', options: SPINNER_SIZES },
        color: { control: 'select', options: SPINNER_COLORS },
        label: { control: 'text' },
    },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Sizes: Story = {
    render: args => (
        <div className="flex items-center gap-6">
            {SPINNER_SIZES.map(size => (
                <div key={size} className="flex flex-col items-center gap-2">
                    <Spinner {...args} size={size} />
                    <span className="text-xs text-muted-foreground">{size}</span>
                </div>
            ))}
        </div>
    ),
};

export const Colors: Story = {
    render: args => (
        <div className="flex items-center gap-6">
            {SPINNER_COLORS.map(color => (
                <div
                    key={color}
                    className={
                        color === 'inverse'
                            ? 'flex flex-col items-center gap-2 rounded-md bg-foreground p-3'
                            : 'flex flex-col items-center gap-2 p-3'
                    }
                >
                    <Spinner {...args} size="lg" color={color} />
                    <span className={color === 'inverse' ? 'text-xs text-background' : 'text-xs text-muted-foreground'}>
                        {color}
                    </span>
                </div>
            ))}
        </div>
    ),
};
