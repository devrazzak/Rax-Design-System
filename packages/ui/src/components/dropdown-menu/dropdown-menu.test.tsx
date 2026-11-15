import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import type { DropdownMenuContentProps, DropdownMenuItemProps } from './dropdown-menu';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './dropdown-menu';
import { defaultSize, DROPDOWN_MENU_SIZES, DROPDOWN_MENU_VARIANTS, sizeClasses } from './dropdown-menu.variants';

type TestMenuProps = Pick<DropdownMenuContentProps, 'size' | 'className'> &
    Pick<DropdownMenuItemProps, 'variant'> & {
        onSelect?: () => void;
        onOpenChange?: (open: boolean) => void;
    };

/** One menu with the common parts, so each test starts from the same markup. */
function TestMenu({ size, className, variant, onSelect, onOpenChange }: TestMenuProps) {
    return (
        <DropdownMenu onOpenChange={onOpenChange}>
            <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
            <DropdownMenuContent size={size} className={className}>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={onSelect}>Edit</DropdownMenuItem>
                    <DropdownMenuItem disabled>Archive</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant={variant}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function TestCheckboxMenu({ onCheckedChange }: { onCheckedChange?: (checked: boolean) => void }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>Columns</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuCheckboxItem checked onCheckedChange={onCheckedChange}>
                    Name
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={false}>Email</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function TestRadioMenu({ onValueChange }: { onValueChange?: (value: string) => void }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>Sort</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuRadioGroup value="newest" onValueChange={onValueChange}>
                    <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

describe('DropdownMenu', () => {
    describe('behavior', () => {
        it('is closed by default', () => {
            render(<TestMenu />);

            expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        });

        it('opens when the trigger is clicked', async () => {
            const user = userEvent.setup();
            render(<TestMenu />);

            await user.click(screen.getByRole('button', { name: 'Open menu' }));

            expect(screen.getByRole('menu')).toBeInTheDocument();
        });

        it('opens with the keyboard', async () => {
            const user = userEvent.setup();
            render(<TestMenu />);

            screen.getByRole('button', { name: 'Open menu' }).focus();
            await user.keyboard('{Enter}');

            expect(screen.getByRole('menu')).toBeInTheDocument();
        });

        it('calls onOpenChange when it opens and closes', async () => {
            const user = userEvent.setup();
            const onOpenChange = jest.fn();
            render(<TestMenu onOpenChange={onOpenChange} />);

            await user.click(screen.getByRole('button', { name: 'Open menu' }));
            expect(onOpenChange).toHaveBeenLastCalledWith(true);

            await user.keyboard('{Escape}');
            expect(onOpenChange).toHaveBeenLastCalledWith(false);
        });

        it('closes on Escape', async () => {
            const user = userEvent.setup();
            render(<TestMenu />);

            await user.click(screen.getByRole('button', { name: 'Open menu' }));
            await user.keyboard('{Escape}');

            await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
        });

        it('calls onSelect and closes when an item is chosen', async () => {
            const user = userEvent.setup();
            const onSelect = jest.fn();
            render(<TestMenu onSelect={onSelect} />);

            await user.click(screen.getByRole('button', { name: 'Open menu' }));
            await user.click(screen.getByRole('menuitem', { name: 'Edit' }));

            expect(onSelect).toHaveBeenCalledTimes(1);
            await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument());
        });

        it('chooses the focused item with the keyboard', async () => {
            const user = userEvent.setup();
            const onSelect = jest.fn();
            render(<TestMenu onSelect={onSelect} />);

            screen.getByRole('button', { name: 'Open menu' }).focus();
            await user.keyboard('{Enter}');
            await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus());
            await user.keyboard('{Enter}');

            expect(onSelect).toHaveBeenCalledTimes(1);
        });

        it('does not select a disabled item', async () => {
            const user = userEvent.setup();
            const onSelect = jest.fn();
            render(
                <DropdownMenu>
                    <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem disabled onSelect={onSelect}>
                            Archive
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>,
            );

            await user.click(screen.getByRole('button', { name: 'Open menu' }));
            await user.click(screen.getByRole('menuitem', { name: 'Archive' }));

            expect(onSelect).not.toHaveBeenCalled();
            expect(screen.getByRole('menu')).toBeInTheDocument();
        });

        it('shows the checked state of checkbox items', async () => {
            const user = userEvent.setup();
            render(<TestCheckboxMenu />);

            await user.click(screen.getByRole('button', { name: 'Columns' }));

            expect(screen.getByRole('menuitemcheckbox', { name: 'Name' })).toHaveAttribute('aria-checked', 'true');
            expect(screen.getByRole('menuitemcheckbox', { name: 'Email' })).toHaveAttribute('aria-checked', 'false');
        });

        it('calls onCheckedChange when a checkbox item is chosen', async () => {
            const user = userEvent.setup();
            const onCheckedChange = jest.fn();
            render(<TestCheckboxMenu onCheckedChange={onCheckedChange} />);

            await user.click(screen.getByRole('button', { name: 'Columns' }));
            await user.click(screen.getByRole('menuitemcheckbox', { name: 'Name' }));

            expect(onCheckedChange).toHaveBeenCalledWith(false);
        });

        it('marks the selected radio item', async () => {
            const user = userEvent.setup();
            render(<TestRadioMenu />);

            await user.click(screen.getByRole('button', { name: 'Sort' }));

            expect(screen.getByRole('menuitemradio', { name: 'Newest' })).toHaveAttribute('aria-checked', 'true');
            expect(screen.getByRole('menuitemradio', { name: 'Oldest' })).toHaveAttribute('aria-checked', 'false');
        });

        it('calls onValueChange when another radio item is chosen', async () => {
            const user = userEvent.setup();
            const onValueChange = jest.fn();
            render(<TestRadioMenu onValueChange={onValueChange} />);

            await user.click(screen.getByRole('button', { name: 'Sort' }));
            await user.click(screen.getByRole('menuitemradio', { name: 'Oldest' }));

            expect(onValueChange).toHaveBeenCalledWith('oldest');
        });
    });

    describe('accessibility', () => {
        it('uses the menu roles', async () => {
            const user = userEvent.setup();
            render(<TestMenu />);

            await user.click(screen.getByRole('button', { name: 'Open menu' }));

            expect(screen.getByRole('menu')).toBeInTheDocument();
            expect(screen.getAllByRole('menuitem')).toHaveLength(3);
            expect(screen.getByRole('separator')).toBeInTheDocument();
        });

        it('marks a disabled item as disabled', async () => {
            const user = userEvent.setup();
            render(<TestMenu />);

            await user.click(screen.getByRole('button', { name: 'Open menu' }));

            expect(screen.getByRole('menuitem', { name: 'Archive' })).toHaveAttribute('aria-disabled', 'true');
        });

        it('reports the open state on the trigger', async () => {
            const user = userEvent.setup();
            render(<TestMenu />);
            const trigger = screen.getByRole('button', { name: 'Open menu' });

            expect(trigger).toHaveAttribute('aria-expanded', 'false');

            await user.click(trigger);

            expect(trigger).toHaveAttribute('aria-expanded', 'true');
        });

        it('has no accessibility violations when open', async () => {
            const user = userEvent.setup();
            render(<TestMenu />);

            await user.click(screen.getByRole('button', { name: 'Open menu' }));

            // Scan only the menu: Radix hides the rest of the page with aria-hidden while it is open
            expect(await axe(screen.getByRole('menu'))).toHaveNoViolations();
        });
    });

    describe('variant', () => {
        it('uses the default variant', async () => {
            const user = userEvent.setup();
            render(<TestMenu />);

            await user.click(screen.getByRole('button', { name: 'Open menu' }));

            expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveAttribute('data-variant', 'default');
        });

        it.each(DROPDOWN_MENU_VARIANTS)('sets data-variant for the %s variant', async variant => {
            const user = userEvent.setup();
            render(<TestMenu variant={variant} />);

            await user.click(screen.getByRole('button', { name: 'Open menu' }));

            expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveAttribute('data-variant', variant);
        });
    });

    describe('size', () => {
        it('uses the md size by default', async () => {
            const user = userEvent.setup();
            render(<TestMenu />);

            await user.click(screen.getByRole('button', { name: 'Open menu' }));

            expect(defaultSize).toBe('md');
            expect(screen.getByRole('menu')).toHaveClass(
                '[&_[data-slot$=-item]]:py-1',
                '[&_[data-slot$=-item]]:text-base',
            );
        });

        it.each(DROPDOWN_MENU_SIZES)('applies the %s size classes', async size => {
            const user = userEvent.setup();
            render(<TestMenu size={size} />);

            await user.click(screen.getByRole('button', { name: 'Open menu' }));

            expect(screen.getByRole('menu')).toHaveClass(sizeClasses[size]);
        });
    });

    describe('customization', () => {
        it('sets a data-slot on every part', async () => {
            const user = userEvent.setup();
            render(<TestMenu />);
            // Radix hides the trigger from the accessibility tree while the menu is open, so find it first
            const trigger = screen.getByRole('button', { name: 'Open menu' });

            await user.click(trigger);

            expect(trigger).toHaveAttribute('data-slot', 'dropdown-menu-trigger');
            expect(screen.getByRole('menu')).toHaveAttribute('data-slot', 'dropdown-menu-content');
            expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveAttribute('data-slot', 'dropdown-menu-item');
            expect(screen.getByRole('group')).toHaveAttribute('data-slot', 'dropdown-menu-group');
            expect(screen.getByRole('separator')).toHaveAttribute('data-slot', 'dropdown-menu-separator');
            expect(screen.getByText('Actions')).toHaveAttribute('data-slot', 'dropdown-menu-label');
        });

        it('sets a data-slot on checkbox and radio items', async () => {
            const user = userEvent.setup();
            const { unmount } = render(<TestCheckboxMenu />);

            await user.click(screen.getByRole('button', { name: 'Columns' }));
            expect(screen.getByRole('menuitemcheckbox', { name: 'Name' })).toHaveAttribute(
                'data-slot',
                'dropdown-menu-checkbox-item',
            );
            unmount();

            render(<TestRadioMenu />);
            await user.click(screen.getByRole('button', { name: 'Sort' }));
            expect(screen.getByRole('menuitemradio', { name: 'Newest' })).toHaveAttribute(
                'data-slot',
                'dropdown-menu-radio-item',
            );
            expect(screen.getByRole('group')).toHaveAttribute('data-slot', 'dropdown-menu-radio-group');
        });

        it('merges a custom className on the content', async () => {
            const user = userEvent.setup();
            render(<TestMenu className="custom-class" />);

            await user.click(screen.getByRole('button', { name: 'Open menu' }));

            expect(screen.getByRole('menu')).toHaveClass('custom-class');
        });

        it('lets a custom className override the content radius', async () => {
            const user = userEvent.setup();
            render(<TestMenu className="rounded-none" />);

            await user.click(screen.getByRole('button', { name: 'Open menu' }));

            const menu = screen.getByRole('menu');
            expect(menu).toHaveClass('rounded-none');
            expect(menu).not.toHaveClass('rounded-md');
        });
    });
});
