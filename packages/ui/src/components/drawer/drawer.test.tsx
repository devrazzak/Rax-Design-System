import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Button } from '@/components/button/button';

import type { DrawerContentProps } from './drawer';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from './drawer';
import { defaultSide, defaultSize, DRAWER_SIDES, DRAWER_SIZES, sideClasses, sizeClasses } from './drawer.variants';

type TestDrawerProps = Pick<
    DrawerContentProps,
    'side' | 'size' | 'showCloseButton' | 'closeOnOutsideClick' | 'onInteractOutside' | 'className'
> & {
    onOpenChange?: (open: boolean) => void;
};

/** One drawer with every part, so each test starts from the same markup. */
function TestDrawer({ onOpenChange, ...contentProps }: TestDrawerProps) {
    return (
        <Drawer onOpenChange={onOpenChange}>
            <DrawerTrigger asChild>
                <Button>Open drawer</Button>
            </DrawerTrigger>
            <DrawerContent {...contentProps}>
                <DrawerHeader>
                    <DrawerTitle>Edit profile</DrawerTitle>
                    <DrawerDescription>Make changes to your profile here.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

/** The overlay has no role, so it is found by its data-slot. */
function getOverlay() {
    const overlay = document.querySelector<HTMLElement>('[data-slot="drawer-overlay"]');
    if (!overlay) {
        throw new Error('Drawer overlay not found');
    }
    return overlay;
}

describe('Drawer', () => {
    describe('behavior', () => {
        it('is closed by default', () => {
            render(<TestDrawer />);

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Open drawer' })).toHaveAttribute('aria-expanded', 'false');
        });

        it('opens when the trigger is clicked', async () => {
            const user = userEvent.setup();
            render(<TestDrawer />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));

            expect(screen.getByRole('dialog')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Open drawer', hidden: true })).toHaveAttribute(
                'aria-expanded',
                'true',
            );
        });

        it('closes with the close button', async () => {
            const user = userEvent.setup();
            render(<TestDrawer />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));
            await user.click(screen.getByRole('button', { name: 'Close' }));

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('closes with a DrawerClose button', async () => {
            const user = userEvent.setup();
            render(<TestDrawer />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));
            await user.click(screen.getByRole('button', { name: 'Cancel' }));

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('closes with the Escape key', async () => {
            const user = userEvent.setup();
            render(<TestDrawer />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));
            await user.keyboard('{Escape}');

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('calls onOpenChange when it opens and closes', async () => {
            const user = userEvent.setup();
            const onOpenChange = jest.fn();
            render(<TestDrawer onOpenChange={onOpenChange} />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));
            expect(onOpenChange).toHaveBeenLastCalledWith(true);

            await user.keyboard('{Escape}');
            expect(onOpenChange).toHaveBeenLastCalledWith(false);
        });

        it('shows the close button by default and can hide it', () => {
            const { unmount } = render(
                <Drawer open>
                    <DrawerContent>
                        <DrawerTitle>Title</DrawerTitle>
                        <DrawerDescription>Description</DrawerDescription>
                    </DrawerContent>
                </Drawer>,
            );
            expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
            unmount();

            render(
                <Drawer open>
                    <DrawerContent showCloseButton={false}>
                        <DrawerTitle>Title</DrawerTitle>
                        <DrawerDescription>Description</DrawerDescription>
                    </DrawerContent>
                </Drawer>,
            );
            expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
        });
    });

    describe('outside click', () => {
        it('closes when the overlay is clicked by default', async () => {
            const user = userEvent.setup();
            render(<TestDrawer />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));
            await user.click(getOverlay());

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('stays open when the overlay is clicked and closeOnOutsideClick is false', async () => {
            const user = userEvent.setup();
            render(<TestDrawer closeOnOutsideClick={false} />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));
            await user.click(getOverlay());

            expect(screen.getByRole('dialog')).toBeInTheDocument();
        });

        it('still closes with Escape and the close button when closeOnOutsideClick is false', async () => {
            const user = userEvent.setup();
            render(<TestDrawer closeOnOutsideClick={false} />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));
            await user.keyboard('{Escape}');
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));
            await user.click(screen.getByRole('button', { name: 'Close' }));
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('calls a custom onInteractOutside', async () => {
            const user = userEvent.setup();
            const onInteractOutside = jest.fn();
            render(<TestDrawer onInteractOutside={onInteractOutside} />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));
            await user.click(getOverlay());

            expect(onInteractOutside).toHaveBeenCalled();
        });

        it('lets a custom onInteractOutside keep the drawer open', async () => {
            const user = userEvent.setup();
            render(<TestDrawer onInteractOutside={event => event.preventDefault()} />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));
            await user.click(getOverlay());

            expect(screen.getByRole('dialog')).toBeInTheDocument();
        });

        it('calls a custom onInteractOutside when closeOnOutsideClick is false', async () => {
            const user = userEvent.setup();
            const onInteractOutside = jest.fn();
            render(<TestDrawer closeOnOutsideClick={false} onInteractOutside={onInteractOutside} />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));
            await user.click(getOverlay());

            expect(onInteractOutside).toHaveBeenCalled();
            expect(screen.getByRole('dialog')).toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('names the drawer with its title and describes it with its description', async () => {
            const user = userEvent.setup();
            render(<TestDrawer />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));
            const drawer = screen.getByRole('dialog', { name: 'Edit profile' });

            expect(drawer).toHaveAccessibleDescription('Make changes to your profile here.');
        });

        it('moves focus into the drawer when it opens', async () => {
            const user = userEvent.setup();
            render(<TestDrawer />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));

            await waitFor(() => {
                expect(screen.getByRole('dialog')).toContainElement(document.activeElement as HTMLElement);
            });
        });

        it('returns focus to the trigger when it closes', async () => {
            const user = userEvent.setup();
            render(<TestDrawer />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));
            await user.keyboard('{Escape}');

            await waitFor(() => {
                expect(screen.getByRole('button', { name: 'Open drawer' })).toHaveFocus();
            });
        });

        it('has no axe violations', async () => {
            const user = userEvent.setup();
            render(<TestDrawer />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));

            // Only the drawer is checked: while it is open Radix hides the rest of the page with aria-hidden on purpose
            expect(await axe(screen.getByRole('dialog'))).toHaveNoViolations();
        });
    });

    describe('side', () => {
        it('opens from the right by default', async () => {
            const user = userEvent.setup();
            render(<TestDrawer />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));

            expect(defaultSide).toBe('right');
            expect(screen.getByRole('dialog')).toHaveAttribute('data-side', 'right');
            expect(screen.getByRole('dialog')).toHaveClass('right-0');
        });

        it.each(DRAWER_SIDES)('applies side "%s"', async side => {
            const user = userEvent.setup();
            render(<TestDrawer side={side} />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));

            expect(screen.getByRole('dialog')).toHaveAttribute('data-side', side);
            expect(screen.getByRole('dialog')).toHaveClass(sideClasses[side]);
        });
    });

    describe('size', () => {
        it('uses the md size by default', async () => {
            const user = userEvent.setup();
            render(<TestDrawer />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));

            expect(defaultSize).toBe('md');
            expect(screen.getByRole('dialog')).toHaveClass('data-[side=right]:sm:max-w-md');
        });

        it.each(DRAWER_SIZES)('applies size "%s"', async size => {
            const user = userEvent.setup();
            render(<TestDrawer size={size} />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));

            expect(screen.getByRole('dialog')).toHaveClass(sizeClasses[size]);
        });
    });

    describe('customization', () => {
        it('sets a data-slot on every part', async () => {
            const user = userEvent.setup();
            render(<TestDrawer />);

            expect(screen.getByRole('button', { name: 'Open drawer' })).toHaveAttribute('data-slot', 'drawer-trigger');

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));

            expect(screen.getByRole('dialog')).toHaveAttribute('data-slot', 'drawer-content');
            expect(document.querySelector('[data-slot="drawer-overlay"]')).toBeInTheDocument();
            expect(document.querySelector('[data-slot="drawer-header"]')).toBeInTheDocument();
            expect(document.querySelector('[data-slot="drawer-footer"]')).toBeInTheDocument();
            expect(screen.getByText('Edit profile')).toHaveAttribute('data-slot', 'drawer-title');
            expect(screen.getByText('Make changes to your profile here.')).toHaveAttribute(
                'data-slot',
                'drawer-description',
            );
        });

        it('lets className override the background', async () => {
            const user = userEvent.setup();
            render(<TestDrawer className="bg-card" />);

            await user.click(screen.getByRole('button', { name: 'Open drawer' }));

            expect(screen.getByRole('dialog')).toHaveClass('bg-card');
            expect(screen.getByRole('dialog')).not.toHaveClass('bg-popover');
        });
    });
});
