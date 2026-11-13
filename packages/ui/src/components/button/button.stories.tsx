import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRightIcon, Mail, Trash2 } from 'lucide-react';

import type { ButtonProps } from './button';
import { Button } from './button';

const VARIANTS = ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const;
const SIZES = ['xs', 'sm', 'default', 'lg'] as const;

const meta = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    args: { children: 'Button' },
    argTypes: {
        variant: {
            control: 'select',
            options: [...VARIANTS, 'linkInverse'],
        },
        size: {
            control: 'inline-radio',
            options: SIZES,
        },
        disabled: { control: 'boolean' },
        asChild: { control: false },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/* Variants                                                                   */
/* -------------------------------------------------------------------------- */

export const Primary: Story = { args: { variant: 'primary' } };

export const Secondary: Story = { args: { variant: 'secondary' } };

export const Outline: Story = { args: { variant: 'outline' } };

export const Ghost: Story = { args: { variant: 'ghost' } };

export const Destructive: Story = {
    args: {
        variant: 'destructive',
        children: (
            <>
                <Trash2 data-icon="inline-start" aria-hidden="true" />
                Delete
            </>
        ),
    },
};

/** Hover or focus the button: the trailing icon slides right (disabled when the OS asks for reduced motion). */
export const Link: Story = {
    args: {
        variant: 'link',
        children: (
            <>
                Explore activities
                <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
            </>
        ),
    },
};

/** Always-white link for dark surfaces and images. The wrapper only simulates a dark background. */
export const LinkInverse: Story = {
    args: {
        variant: 'linkInverse',
        children: (
            <>
                Explore activities
                <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
            </>
        ),
    },
    decorators: [
        Story => (
            <div className="rounded-lg bg-foreground p-6">
                <Story />
            </div>
        ),
    ],
};

/* -------------------------------------------------------------------------- */
/* Sizes and icons                                                            */
/* -------------------------------------------------------------------------- */

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            {SIZES.map(size => (
                <Button key={size} {...args} size={size}>
                    {size}
                </Button>
            ))}
        </div>
    ),
};

export const IconStart: Story = {
    args: {
        children: (
            <>
                <Mail data-icon="inline-start" aria-hidden="true" />
                Send email
            </>
        ),
    },
};

export const IconEnd: Story = {
    args: {
        children: (
            <>
                Continue
                <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
            </>
        ),
    },
};

/**
 * Dedicated icon sizes are deferred. Until then a square button is made with className,
 * which also proves that `px-0` overrides the default `px-4` (tailwind-merge via `cn`).
 * Icon-only buttons must have an aria-label, otherwise screen readers announce nothing.
 */
export const IconOnly: Story = {
    args: {
        'aria-label': 'Send email',
        className: 'w-10 px-0',
        children: <Mail aria-hidden="true" />,
    },
};

/* -------------------------------------------------------------------------- */
/* States                                                                     */
/* -------------------------------------------------------------------------- */

export const Disabled: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            {VARIANTS.map(variant => (
                <Button key={variant} {...args} variant={variant} disabled>
                    {variant}
                </Button>
            ))}
        </div>
    ),
};

/** Static `aria-expanded="true"`, the state a dropdown or popover trigger is in while open. */
export const Expanded: Story = {
    render: args => (
        <div className="flex flex-wrap items-center gap-3">
            {(['secondary', 'outline', 'ghost', 'link'] as const).map(variant => (
                <Button key={variant} {...args} variant={variant} aria-expanded="true">
                    {variant}
                </Button>
            ))}
        </div>
    ),
};

/** `aria-invalid` shows the error ring, used when a button acts as a form field trigger. */
export const Invalid: Story = {
    args: { variant: 'outline', 'aria-invalid': true },
};

/* -------------------------------------------------------------------------- */
/* Behavior                                                                   */
/* -------------------------------------------------------------------------- */

/** Renders a real <a> element styled as a button. `type` is not set on it. */
export const AsChildLink: Story = {
    args: {
        asChild: true,
        children: (
            <a href="/dashboard">
                Go to dashboard
                <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
            </a>
        ),
    },
};

/** Inspect the DOM: the button must keep only `h-14`, not both `h-10` and `h-14`. */
export const ClassNameOverride: Story = {
    args: { className: 'h-14', children: 'h-14 wins over the default h-10' },
};

function FormTypeDemo() {
    const [submits, setSubmits] = useState(0);

    return (
        <form
            className="flex items-center gap-3"
            onSubmit={event => {
                event.preventDefault();
                setSubmits(count => count + 1);
            }}
        >
            <Button variant="outline">Cancel (no type)</Button>
            <Button type="submit">Submit</Button>
            <span className="text-sm text-muted-foreground">Form submits: {submits}</span>
        </form>
    );
}

/** Click "Cancel": the counter must not change, because the default type is "button". Only "Submit" counts. */
export const InsideForm: Story = {
    render: () => <FormTypeDemo />,
};

/* -------------------------------------------------------------------------- */
/* Overview                                                                   */
/* -------------------------------------------------------------------------- */

function VariantMatrix(props: ButtonProps) {
    return (
        <div className="grid gap-4">
            {VARIANTS.map(variant => (
                <div key={variant} className="flex flex-wrap items-center gap-3">
                    <span className="w-24 text-sm text-muted-foreground">{variant}</span>
                    {SIZES.map(size => (
                        <Button key={size} {...props} variant={variant} size={size}>
                            {size}
                        </Button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export const AllVariantsAndSizes: Story = {
    parameters: { layout: 'padded' },
    render: args => <VariantMatrix {...args} />,
};

/** Wraps the matrix in `.dark`, so every semantic token resolves to its dark value. */
export const DarkMode: Story = {
    parameters: { layout: 'padded' },
    decorators: [
        Story => (
            <div className="dark rounded-lg bg-background p-6 text-foreground">
                <Story />
            </div>
        ),
    ],
    render: args => <VariantMatrix {...args} />,
};

// Loading stories are deferred until the `loading` prop returns (tracked in DECISIONS.md).
