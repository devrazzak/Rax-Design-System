import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { EyeIcon, EyeOffIcon, SearchIcon } from '@/icons';

import { Field, FieldError, FieldLabel } from '@/components/field/field';

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from './input-group';
import { INPUT_GROUP_SIZES } from './input-group.variants';

/** Uses state, so it lives in its own component instead of a story render function. */
function PasswordDemo({ size }: { size?: (typeof INPUT_GROUP_SIZES)[number] }) {
    const [visible, setVisible] = useState(false);

    return (
        <InputGroup size={size}>
            <InputGroupInput type={visible ? 'text' : 'password'} placeholder="Password" aria-label="Password" />
            <InputGroupButton
                aria-label={visible ? 'Hide password' : 'Show password'}
                onClick={() => {
                    setVisible(current => !current);
                }}
            >
                {visible ? <EyeOffIcon /> : <EyeIcon />}
            </InputGroupButton>
        </InputGroup>
    );
}

const meta = {
    title: 'Components/InputGroup',
    component: InputGroup,
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'inline-radio', options: INPUT_GROUP_SIZES },
    },
    decorators: [
        Story => (
            <div className="max-w-md">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Search: Story = {
    render: args => (
        <InputGroup {...args}>
            <InputGroupAddon>
                <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search..." aria-label="Search" />
        </InputGroup>
    ),
};

export const Prefix: Story = {
    render: args => (
        <InputGroup {...args}>
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput placeholder="example.com" aria-label="Website" />
        </InputGroup>
    ),
};

export const Suffix: Story = {
    render: args => (
        <InputGroup {...args}>
            <InputGroupInput placeholder="70" aria-label="Weight" inputMode="numeric" />
            <InputGroupAddon>kg</InputGroupAddon>
        </InputGroup>
    ),
};

export const BothSides: Story = {
    render: args => (
        <InputGroup {...args}>
            <InputGroupAddon>$</InputGroupAddon>
            <InputGroupInput placeholder="0.00" aria-label="Amount" inputMode="decimal" />
            <InputGroupAddon>USD</InputGroupAddon>
        </InputGroup>
    ),
};

export const WithButton: Story = {
    render: args => (
        <InputGroup {...args}>
            <InputGroupInput defaultValue="https://rax-ds.dev/invite/abc123" aria-label="Invite link" readOnly />
            <InputGroupButton>Copy</InputGroupButton>
        </InputGroup>
    ),
};

export const Password: Story = {
    render: args => <PasswordDemo size={args.size} />,
};

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            {INPUT_GROUP_SIZES.map(size => (
                <InputGroup key={size} size={size}>
                    <InputGroupAddon>
                        <SearchIcon />
                    </InputGroupAddon>
                    <InputGroupInput placeholder={`Search (${size})`} aria-label={`Search ${size}`} />
                    <InputGroupAddon>⌘K</InputGroupAddon>
                </InputGroup>
            ))}
        </div>
    ),
};

export const Invalid: Story = {
    render: args => (
        <InputGroup {...args}>
            <InputGroupAddon>
                <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput defaultValue="??" aria-label="Search" aria-invalid />
        </InputGroup>
    ),
};

export const Disabled: Story = {
    render: args => (
        <InputGroup {...args}>
            <InputGroupAddon>
                <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search..." aria-label="Search" disabled />
        </InputGroup>
    ),
};

export const InField: Story = {
    render: args => (
        <Field data-invalid>
            <FieldLabel htmlFor="input-group-story-site">Website</FieldLabel>
            <InputGroup {...args}>
                <InputGroupAddon>https://</InputGroupAddon>
                <InputGroupInput
                    id="input-group-story-site"
                    defaultValue="not a url"
                    aria-invalid
                    aria-describedby="input-group-story-site-error"
                />
            </InputGroup>
            <FieldError id="input-group-story-site-error">Enter a valid address.</FieldError>
        </Field>
    ),
};
