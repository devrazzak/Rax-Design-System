import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '@/components/button/button';
import { Field, FieldLabel } from '@/components/field/field';
import { Input } from '@/components/input/input';

import type { DialogContentProps } from './dialog';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './dialog';
import { DIALOG_SIZES } from './dialog.variants';

type DialogDemoProps = Pick<DialogContentProps, 'size' | 'showCloseButton'> & {
    triggerLabel?: string;
    withFooter?: boolean;
};

/** Dialog is a set of parts, so the stories use one small demo to show its props together. */
function DialogDemo({ size, showCloseButton, triggerLabel = 'Open dialog', withFooter = false }: DialogDemoProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">{triggerLabel}</Button>
            </DialogTrigger>
            <DialogContent size={size} showCloseButton={showCloseButton}>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you are done.
                    </DialogDescription>
                </DialogHeader>
                {withFooter && (
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}

/** Keeps the open state in the parent, so the story can show what the parent knows. */
function ControlledDialog() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col gap-3">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Open dialog</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Controlled dialog</DialogTitle>
                        <DialogDescription>The parent decides when this dialog is open.</DialogDescription>
                    </DialogHeader>
                    <Button onClick={() => setOpen(false)}>Close from the parent</Button>
                </DialogContent>
            </Dialog>
            <p className="text-sm text-muted-foreground">Open: {String(open)}</p>
        </div>
    );
}

/** Twenty short paragraphs, enough to be taller than the screen. */
function LongText() {
    return Array.from({ length: 20 }, (_, index) => (
        <p key={index} className="text-sm text-muted-foreground">
            Paragraph {index + 1}. Terms and conditions text that is long enough to need scrolling inside the dialog.
        </p>
    ));
}

const meta = {
    title: 'Components/Dialog',
    component: DialogDemo,
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'inline-radio', options: DIALOG_SIZES },
        showCloseButton: { control: 'boolean' },
        withFooter: { control: 'boolean' },
    },
} satisfies Meta<typeof DialogDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {};

export const Sizes: Story = {
    render: args => (
        <div className="flex flex-wrap gap-3">
            {DIALOG_SIZES.map(size => (
                <DialogDemo key={size} {...args} size={size} triggerLabel={`Open ${size}`} />
            ))}
        </div>
    ),
};

export const WithFooter: Story = {
    args: { withFooter: true },
};

export const WithoutCloseButton: Story = {
    args: { showCloseButton: false },
};

export const Controlled: Story = {
    render: () => <ControlledDialog />,
};

/** Header and footer stay in view, only the middle part scrolls. */
export const ScrollableBody: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Open dialog</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] grid-rows-[auto_minmax(0,1fr)_auto]">
                <DialogHeader>
                    <DialogTitle>Terms and conditions</DialogTitle>
                    <DialogDescription>Scroll to the end to read everything.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3 overflow-y-auto">
                    <LongText />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Decline</Button>
                    </DialogClose>
                    <Button>Accept</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
};

/** The whole dialog scrolls, including the header and the footer. */
export const ScrollableContent: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Open dialog</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Release notes</DialogTitle>
                    <DialogDescription>Everything that changed in this version.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <LongText />
                </div>
            </DialogContent>
        </Dialog>
    ),
};

export const WithForm: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add user</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add user</DialogTitle>
                    <DialogDescription>Fill in the details to create a new user.</DialogDescription>
                </DialogHeader>
                {/* The footer sits inside the form, so the submit button submits it */}
                <form className="grid gap-4" onSubmit={event => event.preventDefault()}>
                    <Field>
                        <FieldLabel htmlFor="dialog-story-name">Name</FieldLabel>
                        <Input id="dialog-story-name" autoComplete="off" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="dialog-story-email">Email</FieldLabel>
                        <Input id="dialog-story-email" type="email" autoComplete="off" />
                    </Field>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    ),
};

export const Confirmation: Story = {
    render: () => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete user</Button>
            </DialogTrigger>
            <DialogContent size="sm" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Delete this user?</DialogTitle>
                    <DialogDescription>This cannot be undone. The user loses access right away.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="destructive">Delete</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    ),
};
