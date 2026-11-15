import { useState } from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Button } from '@/components/button/button';

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
import { defaultSize, DIALOG_SIZES, sizeClasses } from './dialog.variants';

type TestDialogProps = Pick<DialogContentProps, 'size' | 'showCloseButton' | 'className'> & {
    onOpenChange?: (open: boolean) => void;
};

/** One dialog with every part, so each test starts from the same markup. */
function TestDialog({ size, showCloseButton, className, onOpenChange }: TestDialogProps) {
    return (
        <Dialog onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button>Open dialog</Button>
            </DialogTrigger>
            <DialogContent size={size} showCloseButton={showCloseButton} className={className}>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>Make changes to your profile here.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

/** The open state lives in the parent and the opening button is outside the dialog. */
function ControlledDialog() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button type="button" onClick={() => setOpen(true)}>
                Open from outside
            </button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogTitle>Controlled</DialogTitle>
                    <DialogDescription>The parent owns the state.</DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    );
}

/** The overlay has no role, so it is found by its data-slot. */
function getOverlay() {
    const overlay = document.querySelector<HTMLElement>('[data-slot="dialog-overlay"]');
    if (!overlay) {
        throw new Error('Dialog overlay not found');
    }
    return overlay;
}

describe('Dialog', () => {
    describe('behavior', () => {
        it('is closed by default', () => {
            render(<TestDialog />);

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Open dialog' })).toHaveAttribute('aria-expanded', 'false');
        });

        it('opens when the trigger is clicked', async () => {
            const user = userEvent.setup();
            render(<TestDialog />);

            await user.click(screen.getByRole('button', { name: 'Open dialog' }));

            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Open dialog', hidden: true })).toHaveAttribute(
                'aria-expanded',
                'true',
            );
        });

        it('closes with the close button', async () => {
            const user = userEvent.setup();
            render(<TestDialog />);

            await user.click(screen.getByRole('button', { name: 'Open dialog' }));
            await user.click(screen.getByRole('button', { name: 'Close' }));

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('closes with a DialogClose button', async () => {
            const user = userEvent.setup();
            render(<TestDialog />);

            await user.click(screen.getByRole('button', { name: 'Open dialog' }));
            await user.click(screen.getByRole('button', { name: 'Cancel' }));

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('closes with the Escape key', async () => {
            const user = userEvent.setup();
            render(<TestDialog />);

            await user.click(screen.getByRole('button', { name: 'Open dialog' }));
            await user.keyboard('{Escape}');

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('closes when the overlay is clicked', async () => {
            const user = userEvent.setup();
            render(<TestDialog />);

            await user.click(screen.getByRole('button', { name: 'Open dialog' }));
            await user.click(getOverlay());

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('calls onOpenChange when it opens and closes', async () => {
            const user = userEvent.setup();
            const onOpenChange = jest.fn();
            render(<TestDialog onOpenChange={onOpenChange} />);

            await user.click(screen.getByRole('button', { name: 'Open dialog' }));
            expect(onOpenChange).toHaveBeenLastCalledWith(true);

            await user.keyboard('{Escape}');
            expect(onOpenChange).toHaveBeenLastCalledWith(false);
        });

        it('opens from a button outside the dialog in controlled mode', async () => {
            const user = userEvent.setup();
            render(<ControlledDialog />);

            await user.click(screen.getByRole('button', { name: 'Open from outside' }));

            expect(screen.getByRole('dialog', { name: 'Controlled' })).toBeInTheDocument();
        });

        it('shows the close button by default and can hide it', () => {
            const { unmount } = render(
                <Dialog open>
                    <DialogContent>
                        <DialogTitle>Title</DialogTitle>
                        <DialogDescription>Description</DialogDescription>
                    </DialogContent>
                </Dialog>,
            );
            expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
            unmount();

            render(
                <Dialog open>
                    <DialogContent showCloseButton={false}>
                        <DialogTitle>Title</DialogTitle>
                        <DialogDescription>Description</DialogDescription>
                    </DialogContent>
                </Dialog>,
            );
            expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('names the dialog with its title and describes it with its description', async () => {
            const user = userEvent.setup();
            render(<TestDialog />);

            await user.click(screen.getByRole('button', { name: 'Open dialog' }));
            const dialog = screen.getByRole('dialog', { name: 'Edit profile' });

            expect(dialog).toHaveAccessibleDescription('Make changes to your profile here.');
        });

        it('moves focus into the dialog when it opens', async () => {
            const user = userEvent.setup();
            render(<TestDialog />);

            await user.click(screen.getByRole('button', { name: 'Open dialog' }));

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toContainElement(document.activeElement as HTMLElement);
            });
        });

        it('returns focus to the trigger when it closes', async () => {
            const user = userEvent.setup();
            render(<TestDialog />);

            await user.click(screen.getByRole('button', { name: 'Open dialog' }));
            await user.keyboard('{Escape}');

            await waitFor(() => {
                expect(screen.getByRole('button', { name: 'Open dialog' })).toHaveFocus();
            });
        });

        it('has no axe violations', async () => {
            const user = userEvent.setup();
            render(<TestDialog />);

            await user.click(screen.getByRole('button', { name: 'Open dialog' }));

            // Only the dialog is checked: while it is open Radix hides the rest of the page with aria-hidden on purpose
            expect(await axe(screen.getByRole('dialog'))).toHaveNoViolations();
        });
    });

    describe('size', () => {
        it('uses the md size by default', () => {
            render(<TestDialog />);

            expect(defaultSize).toBe('md');
        });

        it('applies the md width when no size is passed', async () => {
            const user = userEvent.setup();
            render(<TestDialog />);

            await user.click(screen.getByRole('button', { name: 'Open dialog' }));

            expect(screen.getByRole('dialog')).toHaveClass('sm:max-w-md');
        });

        it.each(DIALOG_SIZES)('applies size "%s"', async size => {
            const user = userEvent.setup();
            render(<TestDialog size={size} />);

            await user.click(screen.getByRole('button', { name: 'Open dialog' }));

            expect(screen.getByRole('dialog')).toHaveClass(sizeClasses[size]);
        });
    });

    describe('customization', () => {
        it('sets a data-slot on every part', async () => {
            const user = userEvent.setup();
            render(<TestDialog />);

            expect(screen.getByRole('button', { name: 'Open dialog' })).toHaveAttribute('data-slot', 'dialog-trigger');

            await user.click(screen.getByRole('button', { name: 'Open dialog' }));

            expect(screen.getByRole('dialog')).toHaveAttribute('data-slot', 'dialog-content');
            expect(document.querySelector('[data-slot="dialog-overlay"]')).toBeInTheDocument();
            expect(document.querySelector('[data-slot="dialog-header"]')).toBeInTheDocument();
            expect(document.querySelector('[data-slot="dialog-footer"]')).toBeInTheDocument();
            expect(screen.getByText('Edit profile')).toHaveAttribute('data-slot', 'dialog-title');
            expect(screen.getByText('Make changes to your profile here.')).toHaveAttribute(
                'data-slot',
                'dialog-description',
            );
        });

        it('lets className override the padding', async () => {
            const user = userEvent.setup();
            render(<TestDialog className="p-8" />);

            await user.click(screen.getByRole('button', { name: 'Open dialog' }));

            expect(screen.getByRole('dialog')).toHaveClass('p-8');
            expect(screen.getByRole('dialog')).not.toHaveClass('p-6');
        });
    });
});
