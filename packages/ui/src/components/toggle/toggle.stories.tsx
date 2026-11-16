import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { EyeIcon, EyeOffIcon, SearchIcon } from '@/icons';

import { Toggle } from './toggle';
import { TOGGLE_SIZES, TOGGLE_VARIANTS } from './toggle.variants';

const meta = {
    title: 'Components/Toggle',
    component: Toggle,
    tags: ['autodocs'],
    args: { children: 'Toggle' },
    argTypes: {
        variant: { control: 'inline-radio', options: TOGGLE_VARIANTS },
        size: { control: 'inline-radio', options: TOGGLE_SIZES },
        disabled: { control: 'boolean' },
        defaultPressed: { control: 'boolean' },
    },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Keeps the pressed state in the parent, so the icon can follow it. */
function PasswordVisibilityToggle() {
    const [visible, setVisible] = useState(false);

    return (
        <Toggle pressed={visible} onPressedChange={setVisible} aria-label={visible ? 'Hide password' : 'Show password'}>
            {visible ? <EyeOffIcon /> : <EyeIcon />}
        </Toggle>
    );
}

/* stories */
export const Default: Story = {};

export const Variants: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            {TOGGLE_VARIANTS.map(variant => (
                <Toggle key={variant} {...args} variant={variant}>
                    {variant}
                </Toggle>
            ))}
        </div>
    ),
};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            {TOGGLE_SIZES.map(size => (
                <Toggle key={size} {...args} size={size}>
                    {size}
                </Toggle>
            ))}
        </div>
    ),
};

export const Pressed: Story = {
    args: { defaultPressed: true },
};

export const Disabled: Story = {
    args: { disabled: true },
};

/** A toggle with only an icon needs an aria-label, because it has no visible text. */
export const IconOnly: Story = {
    args: { 'aria-label': 'Search', children: <SearchIcon /> },
};

export const WithIconAndText: Story = {
    args: {
        children: (
            <>
                <SearchIcon />
                Search
            </>
        ),
    },
};

export const Controlled: Story = {
    render: () => <PasswordVisibilityToggle />,
};
