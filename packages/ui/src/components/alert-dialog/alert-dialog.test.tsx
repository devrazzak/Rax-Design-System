import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Button } from '@/components/button/button';

import type { AlertDialogContentProps } from './alert-dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './alert-dialog';
import { ALERT_DIALOG_SIZES, defaultSize, sizeClasses } from './alert-dialog.variants';

type TestAlertDialogProps = Pick<AlertDialogContentProps, 'size' | 'className'> & {
    actionVariant?: 'primary' | 'destructive';
    onAction?: () => void;
    onOpenChange?: (open: boolean) => void;
};

/** One alert dialog with every part, so each test starts from the same markup. */
function TestAlertDialog({ size, className, actionVariant, onAction, onOpenChange }: TestAlertDialogProps) {
    return (
        <AlertDialog onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild>
                <Button>Delete user</Button>
            </AlertDialogTrigger>
            <AlertDialogContent size={size} className={className}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete this user?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant={actionVariant} onClick={onAction}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

/** The overlay has no role, so it is found by its data-slot. */
function getOverlay() {
    const overlay = document.querySelector<HTMLElement>('[data-slot="alert-dialog-overlay"]');
    if (!overlay) {
        throw new Error('Alert dialog overlay not found');
    }
    return overlay;
}

describe('AlertDialog', () => {
    describe('behavior', () => {
        it('is closed by default', () => {
            render(<TestAlertDialog />);

            expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
        });

        it('opens when the trigger is clicked', async () => {
            const user = userEvent.setup();
            render(<TestAlertDialog />);

            await user.click(screen.getByRole('button', { name: 'Delete user' }));

            expect(screen.getByRole('alertdialog')).toBeInTheDocument();
        });

        it('calls the action and closes when the action is clicked', async () => {
            const user = userEvent.setup();
            const onAction = jest.fn();
            render(<TestAlertDialog onAction={onAction} />);

            await user.click(screen.getByRole('button', { name: 'Delete user' }));
            await user.click(screen.getByRole('button', { name: 'Delete' }));

            expect(onAction).toHaveBeenCalledTimes(1);
            expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
        });

        it('closes without running the action when cancel is clicked', async () => {
            const user = userEvent.setup();
            const onAction = jest.fn();
            render(<TestAlertDialog onAction={onAction} />);

            await user.click(screen.getByRole('button', { name: 'Delete user' }));
            await user.click(screen.getByRole('button', { name: 'Cancel' }));

            expect(onAction).not.toHaveBeenCalled();
            expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
        });

        it('closes with the Escape key', async () => {
            const user = userEvent.setup();
            render(<TestAlertDialog />);

            await user.click(screen.getByRole('button', { name: 'Delete user' }));
            await user.keyboard('{Escape}');

            expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
        });

        it('stays open when the overlay is clicked', async () => {
            const user = userEvent.setup();
            render(<TestAlertDialog />);

            await user.click(screen.getByRole('button', { name: 'Delete user' }));
            await user.click(getOverlay());

            expect(screen.getByRole('alertdialog')).toBeInTheDocument();
        });

        it('has no close button', async () => {
            const user = userEvent.setup();
            render(<TestAlertDialog />);

            await user.click(screen.getByRole('button', { name: 'Delete user' }));

            expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
        });

        it('calls onOpenChange when it opens and closes', async () => {
            const user = userEvent.setup();
            const onOpenChange = jest.fn();
            render(<TestAlertDialog onOpenChange={onOpenChange} />);

            await user.click(screen.getByRole('button', { name: 'Delete user' }));
            expect(onOpenChange).toHaveBeenLastCalledWith(true);

            await user.click(screen.getByRole('button', { name: 'Cancel' }));
            expect(onOpenChange).toHaveBeenLastCalledWith(false);
        });
    });

    describe('accessibility', () => {
        it('uses the alertdialog role named by its title and described by its description', async () => {
            const user = userEvent.setup();
            render(<TestAlertDialog />);

            await user.click(screen.getByRole('button', { name: 'Delete user' }));
            const alertDialog = screen.getByRole('alertdialog', { name: 'Delete this user?' });

            expect(alertDialog).toHaveAccessibleDescription('This action cannot be undone.');
        });

        it('moves focus to the cancel button when it opens', async () => {
            const user = userEvent.setup();
            render(<TestAlertDialog />);

            await user.click(screen.getByRole('button', { name: 'Delete user' }));

            await waitFor(() => {
                expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
            });
        });

        it('returns focus to the trigger when it closes', async () => {
            const user = userEvent.setup();
            render(<TestAlertDialog />);

            await user.click(screen.getByRole('button', { name: 'Delete user' }));
            await user.keyboard('{Escape}');

            await waitFor(() => {
                expect(screen.getByRole('button', { name: 'Delete user' })).toHaveFocus();
            });
        });

        it('has no axe violations', async () => {
            const user = userEvent.setup();
            render(<TestAlertDialog />);

            await user.click(screen.getByRole('button', { name: 'Delete user' }));

            // Only the alert dialog is checked: while it is open Radix hides the rest of the page with aria-hidden on purpose
            expect(await axe(screen.getByRole('alertdialog'))).toHaveNoViolations();
        });
    });

    describe('buttons', () => {
        it('uses the primary variant for the action and outline for cancel by default', async () => {
            const user = userEvent.setup();
            render(<TestAlertDialog />);

            await user.click(screen.getByRole('button', { name: 'Delete user' }));

            expect(screen.getByRole('button', { name: 'Delete' })).toHaveAttribute('data-variant', 'primary');
            expect(screen.getByRole('button', { name: 'Cancel' })).toHaveAttribute('data-variant', 'outline');
        });

        it('accepts a destructive variant on the action', async () => {
            const user = userEvent.setup();
            render(<TestAlertDialog actionVariant="destructive" />);

            await user.click(screen.getByRole('button', { name: 'Delete user' }));

            expect(screen.getByRole('button', { name: 'Delete' })).toHaveAttribute('data-variant', 'destructive');
        });
    });

    describe('size', () => {
        it('uses the md size by default', async () => {
            const user = userEvent.setup();
            render(<TestAlertDialog />);

            await user.click(screen.getByRole('button', { name: 'Delete user' }));

            expect(defaultSize).toBe('md');
            expect(screen.getByRole('alertdialog')).toHaveClass('sm:max-w-md');
        });

        it.each(ALERT_DIALOG_SIZES)('applies size "%s"', async size => {
            const user = userEvent.setup();
            render(<TestAlertDialog size={size} />);

            await user.click(screen.getByRole('button', { name: 'Delete user' }));

            expect(screen.getByRole('alertdialog')).toHaveClass(sizeClasses[size]);
        });
    });

    describe('customization', () => {
        it('sets a data-slot on every part', async () => {
            const user = userEvent.setup();
            render(<TestAlertDialog />);

            expect(screen.getByRole('button', { name: 'Delete user' })).toHaveAttribute(
                'data-slot',
                'alert-dialog-trigger',
            );

            await user.click(screen.getByRole('button', { name: 'Delete user' }));

            expect(screen.getByRole('alertdialog')).toHaveAttribute('data-slot', 'alert-dialog-content');
            expect(document.querySelector('[data-slot="alert-dialog-overlay"]')).toBeInTheDocument();
            expect(document.querySelector('[data-slot="alert-dialog-header"]')).toBeInTheDocument();
            expect(document.querySelector('[data-slot="alert-dialog-footer"]')).toBeInTheDocument();
            expect(screen.getByText('Delete this user?')).toHaveAttribute('data-slot', 'alert-dialog-title');
            expect(screen.getByText('This action cannot be undone.')).toHaveAttribute(
                'data-slot',
                'alert-dialog-description',
            );
            expect(screen.getByRole('button', { name: 'Cancel' })).toHaveAttribute('data-slot', 'alert-dialog-cancel');
            expect(screen.getByRole('button', { name: 'Delete' })).toHaveAttribute('data-slot', 'alert-dialog-action');
        });

        it('lets className override the padding', async () => {
            const user = userEvent.setup();
            render(<TestAlertDialog className="p-8" />);

            await user.click(screen.getByRole('button', { name: 'Delete user' }));

            expect(screen.getByRole('alertdialog')).toHaveClass('p-8');
            expect(screen.getByRole('alertdialog')).not.toHaveClass('p-6');
        });
    });
});
